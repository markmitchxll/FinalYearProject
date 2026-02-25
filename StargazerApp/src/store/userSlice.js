/**
 * userSlice — Redux slice for user preferences and settings.
 *
 * State shape:
 * {
 *   locationPermissionGranted  : boolean
 *   cameraPermissionGranted    : boolean
 *   notificationsEnabled       : boolean
 *   eveningReminderTime        : { hour: 21, minute: 0 }
 *   stargazingStreak           : number — consecutive days with at least one discovery
 *   lastActiveDate             : string (ISO date)
 *   constellationLinesVisible  : boolean — toggle lines on/off in AR view
 *   mythologyRegion            : 'greek' | 'chinese' | 'all' — filter for myth display
 * }
 *
 * Actions:
 * - setPermissions({ location, camera })
 * - setNotificationsEnabled(boolean)
 * - setEveningReminderTime({ hour, minute })
 * - incrementStreak()
 * - resetStreak()
 * - toggleConstellationLines()
 * - setMythologyRegion(region)
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationPermissionGranted: false,
  cameraPermissionGranted: false,
  notificationsEnabled: false,
  eveningReminderTime: { hour: 21, minute: 0 },
  stargazingStreak: 0,
  lastActiveDate: null,
  constellationLinesVisible: true,
  mythologyRegion: 'all',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPermissions(state, action) {
      // TODO: Update locationPermissionGranted and cameraPermissionGranted.
    },
    setNotificationsEnabled(state, action) {
      // TODO: Set state.notificationsEnabled = action.payload.
    },
    setEveningReminderTime(state, action) {
      // TODO: Update state.eveningReminderTime.
    },
    incrementStreak(state) {
      // TODO: Increment stargazingStreak if lastActiveDate was yesterday.
      // TODO: Update lastActiveDate to today.
    },
    resetStreak(state) {
      // TODO: Set stargazingStreak to 0.
    },
    toggleConstellationLines(state) {
      state.constellationLinesVisible = !state.constellationLinesVisible;
    },
    setMythologyRegion(state, action) {
      state.mythologyRegion = action.payload;
    },
  },
});

export const {
  setPermissions,
  setNotificationsEnabled,
  setEveningReminderTime,
  incrementStreak,
  resetStreak,
  toggleConstellationLines,
  setMythologyRegion,
} = userSlice.actions;

export default userSlice.reducer;
