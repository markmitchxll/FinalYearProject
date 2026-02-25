/**
 * Redux store — central state management for the app.
 *
 * Combines three slices:
 * - petSlice        : Tamagotchi pet stats and evolution state
 * - discoveriesSlice: which stars/planets/constellations the user has found
 * - userSlice       : user preferences and settings
 *
 * State is persisted to device storage using redux-persist with AsyncStorage,
 * so the pet and discoveries survive app restarts.
 */

import { configureStore } from '@reduxjs/toolkit';
import petReducer from './petSlice';
import discoveriesReducer from './discoveriesSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    pet: petReducer,
    discoveries: discoveriesReducer,
    user: userReducer,
  },
  // TODO: Add redux-persist middleware for AsyncStorage persistence.
});
