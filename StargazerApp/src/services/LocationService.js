/**
 * LocationService — handles GPS location for the app.
 *
 * The user's coordinates are essential for CelestialService calculations,
 * since the visible sky changes depending on where on Earth you are.
 */

import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

// GPS options used for all location calls.
// - enableHighAccuracy: uses GPS chip rather than cell towers (more accurate, more battery)
// - timeout: give up after 15 seconds if no fix is found
// - maximumAge: accept a cached position up to 60 seconds old for getCurrentLocation
const GPS_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 60000,
};

// Watch options are slightly more relaxed on maximumAge since positions update continuously.
const WATCH_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
  distanceFilter: 10, // Only fire the callback if the user moves more than 10 metres.
};

/**
 * Requests location permission from the operating system.
 *
 * On Android, we must explicitly ask the user at runtime.
 * On iOS, the permission prompt is triggered automatically by the first
 * Geolocation call, so we just return true immediately.
 *
 * @returns {Promise<boolean>} - true if permission was granted, false if denied.
 */
export async function requestPermission() {
  if (Platform.OS === 'ios') {
    // iOS handles the permission prompt automatically on the first Geolocation call.
    return true;
  }

  // Android requires an explicit runtime permission request.
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Stargazer needs your location',
      message:
        'Your GPS coordinates are used to calculate which stars and planets ' +
        'are above you right now. Your location is never sent anywhere.',
      buttonPositive: 'Allow',
      buttonNegative: 'Deny',
    }
  );

  return result === PermissionsAndroid.RESULTS.GRANTED;
}

/**
 * Gets the device's current GPS position as a one-off reading.
 *
 * Wraps the callback-based Geolocation API in a Promise so it can
 * be used with async/await.
 *
 * @returns {Promise<{ latitude: number, longitude: number, accuracy: number }>}
 * @throws {Error} if the location could not be retrieved (e.g. permission denied,
 *                 GPS timeout, or the device is indoors with no signal).
 */
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve({ latitude, longitude, accuracy });
      },
      error => {
        // error.code values: 1 = permission denied, 2 = position unavailable, 3 = timeout
        reject(new Error(`Could not get location (code ${error.code}): ${error.message}`));
      },
      GPS_OPTIONS
    );
  });
}

/**
 * Subscribes to continuous GPS updates.
 *
 * The callback fires whenever the device moves more than 10 metres (see WATCH_OPTIONS).
 * For stargazing this is rarely needed since users stand still, but it keeps the
 * calculations correct if someone walks around.
 *
 * @param {function} callback - Called with { latitude, longitude, accuracy } on each update.
 * @param {function} onError  - Called with an Error if the watch fails.
 * @returns {function} - Call this function to stop watching (e.g. in a useEffect cleanup).
 *
 * Usage in a React component:
 *   useEffect(() => {
 *     const stopWatching = watchLocation(coords => setLocation(coords));
 *     return stopWatching; // cleans up when the component unmounts
 *   }, []);
 */
export function watchLocation(callback, onError = () => {}) {
  const watchId = Geolocation.watchPosition(
    position => {
      const { latitude, longitude, accuracy } = position.coords;
      callback({ latitude, longitude, accuracy });
    },
    error => {
      onError(new Error(`Location watch error (code ${error.code}): ${error.message}`));
    },
    WATCH_OPTIONS
  );

  // Return a cleanup function so the caller can stop the watcher.
  return () => Geolocation.clearWatch(watchId);
}
