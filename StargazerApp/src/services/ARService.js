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

export async function requestCameraPermission() {
  // TODO: Use Camera.requestCameraPermission() from react-native-vision-camera.
}

export function getBackCamera() {
  // TODO: Use useCameraDevice('back') hook from react-native-vision-camera.
  // Note: this must be called within a functional component.
}
