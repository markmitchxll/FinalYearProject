/**
 * discoveriesSlice — Redux slice tracking everything the user has found.
 *
 * State shape:
 * {
 *   stars         : { [starId]: { discoveredAt: timestamp } }
 *   planets       : { [planetId]: { discoveredAt: timestamp } }
 *   constellations: { [constellationId]: { discoveredAt: timestamp } }
 *   lastDiscoveryDate : string (ISO date) — used to detect first discovery of the night
 * }
 *
 * Actions:
 * - discoverStar(starId)                 : records a star discovery with timestamp
 * - discoverPlanet(planetId)             : records a planet discovery with timestamp
 * - discoverConstellation(constellationId): records a constellation discovery
 *
 * Selectors:
 * - isDiscovered(state, type, id)        : returns true if the object has been found
 * - getDiscoveryCount(state)             : total number of unique objects found
 * - isFirstDiscoveryTonight(state)       : true if no discoveries today yet
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stars: {},
  planets: {},
  constellations: {},
  lastDiscoveryDate: null,
};

const discoveriesSlice = createSlice({
  name: 'discoveries',
  initialState,
  reducers: {
    discoverStar(state, action) {
      state.stars[action.payload]  = { discoveredAt: Date.now() };
      state.lastDiscoveryDate      = new Date().toISOString().split('T')[0];
    },
    discoverPlanet(state, action) {
      state.planets[action.payload] = { discoveredAt: Date.now() };
      state.lastDiscoveryDate       = new Date().toISOString().split('T')[0];
    },
    discoverConstellation(state, action) {
      state.constellations[action.payload] = { discoveredAt: Date.now() };
      state.lastDiscoveryDate              = new Date().toISOString().split('T')[0];
    },
  },
});

export const { discoverStar, discoverPlanet, discoverConstellation } = discoveriesSlice.actions;

// Returns true if the given object has already been discovered.
// Usage: isDiscovered(state, 'stars', 'sirius')
export const isDiscovered = (state, type, id) => !!state.discoveries[type]?.[id];

// Returns the total number of unique objects the user has ever found.
export const getDiscoveryCount = (state) =>
  Object.keys(state.discoveries.stars).length +
  Object.keys(state.discoveries.planets).length +
  Object.keys(state.discoveries.constellations).length;

// Returns true if the user has not yet made any discovery today.
// Used by ARSkyScreen to award the first-discovery-of-the-night XP bonus.
export const isFirstDiscoveryTonight = (state) =>
  state.discoveries.lastDiscoveryDate !== new Date().toISOString().split('T')[0];

export default discoveriesSlice.reducer;
