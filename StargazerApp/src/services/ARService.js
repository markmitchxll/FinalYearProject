/**
 * ARService — manages the AR session and camera permission lifecycle.
 *
 * This service acts as the bridge between the device's camera hardware
 * and the overlay rendering in ARSkyScreen.
 *
 * Responsibilities:
 * - Request camera permission at app startup.
 * - Provide a configured camera device object for react-native-vision-camera.
 * - Manage camera session lifecycle (start/stop/pause on app background).
 *
 * Exported functions:
 *
 * requestCameraPermission()
 *   Requests camera permission. Returns 'granted' | 'denied' | 'restricted'.
 *
 * getBackCamera()
 *   Returns the rear-facing camera device object.
 *   Must be called inside a React component (uses a hook internally).
 */

import { Camera } from 'react-native-vision-camera';

/**
 * Requests camera access from the OS permission dialog.
 *
 * On Android this shows the system "Allow StargazerApp to take pictures?"
 * dialog. On iOS it shows the camera access dialog.
 *
 * Returns one of:
 *   'granted'    — user approved, camera is available
 *   'denied'     — user denied (on iOS, can only be changed in Settings)
 *   'restricted' — parental controls / MDM block (iOS only)
 */
export async function requestCameraPermission() {
  const status = await Camera.requestCameraPermission();
  return status; // 'granted' | 'denied' | 'restricted'
}
