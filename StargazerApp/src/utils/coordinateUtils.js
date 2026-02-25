/**
 * coordinateUtils.js — converts sky coordinates to screen pixel positions.
 *
 * After CelestialService gives us each object's altitude and azimuth,
 * we need to map those sky angles to x/y pixel positions on the phone screen.
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

export function altAzToScreenXY(
  altitude,
  azimuth,
  deviceHeading,
  devicePitch,
  screenWidth,
  screenHeight,
  fovDegrees = 60
) {
  // TODO: Calculate angular offset between object and device centre.
  //       azimuthOffset = (azimuth - deviceHeading + 360) % 360 — normalise to -180..+180
  //       altitudeOffset = altitude - devicePitch
  // TODO: Scale offsets to pixel positions:
  //       x = screenWidth/2 + (azimuthOffset / fovDegrees) * screenWidth
  //       y = screenHeight/2 - (altitudeOffset / fovDegrees) * screenHeight
  // TODO: Return null if |azimuthOffset| or |altitudeOffset| > fovDegrees/2.
}

export function isInFrame(altitude, azimuth, deviceHeading, devicePitch, fovDegrees = 60) {
  // TODO: Check azimuth and altitude offsets against fovDegrees/2.
}
