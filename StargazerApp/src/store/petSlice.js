/**
 * petSlice — Redux slice managing the Tamagotchi pet's state.
 *
 * State shape:
 * {
 *   xp         : number  — total XP earned from discoveries
 *   stage      : number  — current evolution stage (1–4)
 *   curiosity  : number  — 0–100, rises with discoveries, drains slowly over time
 *   happiness  : number  — 0–100, increases with discoveries (100 = ecstatic)
 *   lastFed    : number  — Unix timestamp of last encourage interaction
 *   lastPetted : number  — Unix timestamp of last interaction
 *   totalDiscoveries : number — total number of objects ever discovered
 * }
 *
 * Actions:
 * - addXP(amount)        : adds XP and updates stage if threshold is crossed
 * - encouragePet()       : gives a small curiosity boost, updates lastFed
 * - petThePet()          : adds 10 happiness, updates lastPetted
 * - decayStats()         : called periodically to reduce curiosity and happiness over time
 */

import { createSlice } from '@reduxjs/toolkit';
import { getStageFromXP } from '../components/pet/PetEvolutionStage';

const initialState = {
  xp: 0,
  stage: 1,
  curiosity: 40,
  happiness: 50,
  lastFed: Date.now(),
  lastPetted: Date.now(),
  lastDecayed: Date.now(),
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

      // Each discovery fills curiosity and happiness — the pet loves exploring.
      state.curiosity  = Math.min(100, (state.curiosity  ?? 40) + 20);
      state.happiness  = Math.min(100, (state.happiness  ?? 50) + 15);

      state.totalDiscoveries = (state.totalDiscoveries ?? 0) + 1;
    },

    encouragePet(state) {
      // Tapping Encourage gives a small curiosity nudge.
      state.curiosity = Math.min(100, (state.curiosity ?? 40) + 15);
      state.lastFed   = Date.now();
    },

    petThePet(state) {
      state.happiness  = Math.min(100, state.happiness + 10);
      state.lastPetted = Date.now();
    },

    decayStats(state) {
      const now = Date.now();
      const hoursSinceLastDecay = (now - (state.lastDecayed ?? now)) / (1000 * 60 * 60);

      // Curiosity drains slowly — the pet is always ready to explore again.
      // Takes ~20 hrs to drop from 100 to 0 (5 pts/hr).
      state.curiosity = Math.max(0, Math.round((state.curiosity ?? 40) - hoursSinceLastDecay * 5));

      // Happiness drains at 3 points per hour (~33 hrs to drop from 100 to 0).
      state.happiness = Math.max(0, Math.round((state.happiness ?? 50) - hoursSinceLastDecay * 3));

      state.lastDecayed = now;
    },
  },
});

export const { addXP, encouragePet, petThePet, decayStats } = petSlice.actions;
export default petSlice.reducer;
