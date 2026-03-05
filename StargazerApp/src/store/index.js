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

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import petReducer from './petSlice';
import discoveriesReducer from './discoveriesSlice';
import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // All three slices are persisted so the pet, discoveries, and settings
  // are all restored exactly as the user left them when they reopen the app.
};

const rootReducer = combineReducers({
  pet:         petReducer,
  discoveries: discoveriesReducer,
  user:        userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // redux-persist dispatches some non-serialisable actions internally.
      // These lines tell Redux Toolkit to ignore them so it doesn't log warnings.
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistor is used by PersistGate in App.js to hold the UI until
// the saved state has been loaded from AsyncStorage.
export const persistor = persistStore(store);
