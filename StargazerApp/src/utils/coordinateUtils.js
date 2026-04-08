/**
 * coordinateUtils.js — converts sky coordinates to screen pixel positions.
 *
 * After CelestialService gives us each object's altitude and azimuth,
 * I need to map those sky angles to x/y pixel positions on the phone screen.
 *
 * Functions:
 *
 * altAzToScreenXY(altitude, azimuth, deviceHeading, devicePitch, screenWidth, screenHeight, fovDegrees)
 *   Converts an object's sky position to screen coordinates.
 *   - altitude     : object's altitude above horizon in degrees
 *   - azimuth      : object's compass bearing in degrees (0 = North)
 *   - deviceHeading: which compass direction the phone is pointing (degrees)
 *   - devicePitch  : phone's tilt angle (0 = flat, 90 = pointing straight up)
 *   - fovDegrees   : camera field of view (typically 60 degrees)
 *   Returns: { x, y } in pixels, or null if the object is outside the frame.
 *
 * isInFrame(altitude, azimuth, deviceHeading, devicePitch, fovDegrees)
 *   Quick check — returns true if the object is within the camera's field of view.
 */

/**
 * Returns the signed angular difference between two compass bearings,
 * in the range -180 to +180.
 * Handles the 0°/360° wraparound (e.g. gap between 5° and 355° is 10°, not 350°).
 */
function angularDiff(a, b) {
  return ((a - b + 540) % 360) - 180;
}

/**
 * Converts an object's sky position (altitude + azimuth) to screen pixel
 * coordinates given the current device orientation and camera FOV.
 *
 * The screen centre corresponds to the direction the device is pointing.
 * Angular offsets from that centre are scaled linearly to pixels.
 *
 * @returns {{ x: number, y: number }} — pixel position, or null if off-screen.
 */
export function altAzToScreenXY(
  altitude,
  azimuth,
  deviceHeading,
  devicePitch,
  screenWidth,
  screenHeight,
  fovDegrees = 60
) {
  const halfFov = fovDegrees / 2;

  // Signed angular offsets from the centre of the frame.
  const azimuthOffset  = angularDiff(azimuth, deviceHeading);
  const altitudeOffset = altitude - devicePitch;

  // Reject anything outside the field of view.
  if (Math.abs(azimuthOffset) > halfFov || Math.abs(altitudeOffset) > halfFov) {
    return null;
  }

  // Scale angular offset → pixels.
  // Azimuth increases clockwise → x increases rightward.
  // Altitude increases upward  → y decreases (screen y is inverted).
  const x = screenWidth  / 2 + (azimuthOffset  / fovDegrees) * screenWidth;
  const y = screenHeight / 2 - (altitudeOffset / fovDegrees) * screenHeight;

  return { x: Math.round(x), y: Math.round(y) };
}

/**
 * Returns true if the object at (altitude, azimuth) falls within the
 * camera's current field of view.
 */
export function isInFrame(altitude, azimuth, deviceHeading, devicePitch, fovDegrees = 60) {
  const halfFov = fovDegrees / 2;
  const azimuthOffset  = Math.abs(angularDiff(azimuth, deviceHeading));
  const altitudeOffset = Math.abs(altitude - devicePitch);
  return azimuthOffset <= halfFov && altitudeOffset <= halfFov;
}
