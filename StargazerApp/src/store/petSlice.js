/**
 * petSlice — Redux slice managing the Tamagotchi pet's state.
 *
 * State shape:
 * {
 *   xp         : number  — total XP earned from discoveries
 *   stage      : number  — current evolution stage (1–4)
 *   hunger     : number  — 0–100, decreases over real time (100 = full)
 *   happiness  : number  — 0–100, increases with discoveries (100 = ecstatic)
 *   lastFed    : number  — Unix timestamp of last feeding
 *   lastPetted : number  — Unix timestamp of last interaction
 *   totalDiscoveries : number — total number of objects ever discovered
 * }
 *
 * Actions:
 * - addXP(amount)        : adds XP and updates stage if threshold is crossed
 * - feedPet()            : resets hunger to 100, updates lastFed
 * - petThePet()          : adds 10 happiness, updates lastPetted
 * - decayStats()         : called periodically to reduce hunger and happiness over time
 */

import { createSlice } from '@reduxjs/toolkit';
import { getStageFromXP } from '../components/pet/PetEvolutionStage';

const initialState = {
  xp: 0,
  stage: 1,
  hunger: 100,
  happiness: 50,
  lastFed: Date.now(),
  lastPetted: Date.now(),
  lastDecayed: Date.now(), // Timestamp of the last decayStats call — used to calculate happiness decay.
  totalDiscoveries: 0,
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    addXP(state, action) {
      state.xp += action.payload;

      // Recalculate stage — the pet may have just evolved.
      state.stage = getStageFromXP(state.xp);

      // Each discovery makes the pet happy, capped at 100.
      state.happiness = Math.min(100, state.happiness + 15);

      state.totalDiscoveries += 1;
    },

    feedPet(state) {
      state.hunger  = 100;
      state.lastFed = Date.now();
    },

    petThePet(state) {
      state.happiness  = Math.min(100, state.happiness + 10);
      state.lastPetted = Date.now();
    },

    decayStats(state) {
      const now = Date.now();

      // --- Hunger ---
      // Recalculated absolutely from lastFed so it's always accurate no matter
      // how long the app was closed. The pet goes hungry in 8 hours (12.5 pts/hr).
      const hoursSinceLastFed = (now - state.lastFed) / (1000 * 60 * 60);
      state.hunger = Math.max(0, Math.round(100 - hoursSinceLastFed * 12.5));

      // --- Happiness ---
      // Applied incrementally based on elapsed time since the last decay call.
      // This prevents double-penalising if decayStats is called multiple times quickly.
      // Happiness drains at 3 points per hour (takes ~33 hrs to drop from 100 to 0).
      const hoursSinceLastDecay = (now - state.lastDecayed) / (1000 * 60 * 60);
      state.happiness = Math.max(0, Math.round(state.happiness - hoursSinceLastDecay * 3));

      state.lastDecayed = now;
    },
  },
});

export const { addXP, feedPet, petThePet, decayStats } = petSlice.actions;
export default petSlice.reducer;
