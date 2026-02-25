/**
 * celestialMath.js — low-level astronomy formula implementations.
 *
 * These functions are used by CelestialService to convert between
 * different coordinate systems used in astronomy.
 *
 * Note: For production use, prefer the astronomy-engine library for accuracy.
 * These manual implementations are useful for understanding the concepts.
 *
 * Functions:
 *
 * toRadians(degrees) / toDegrees(radians)
 *   Basic unit conversion helpers.
 *
 * raDecToAltAz(ra, dec, latitude, longitude, dateTime)
 *   Converts a star's fixed position (Right Ascension, Declination) to
 *   its current position in the observer's sky (Altitude, Azimuth).
 *   - ra        : Right Ascension in decimal hours
 *   - dec       : Declination in decimal degrees
 *   - latitude  : observer's latitude in decimal degrees
 *   - longitude : observer's longitude in decimal degrees
 *   - dateTime  : JavaScript Date object
 *   Returns: { altitude, azimuth } in degrees
 *
 * getLocalSiderealTime(longitude, dateTime)
 *   Returns the Local Sidereal Time for the given location and time.
 *   This is used as an intermediate step in raDecToAltAz.
 *
 * getHourAngle(ra, localSiderealTime)
 *   Returns the Hour Angle — how far a star has moved from the meridian.
 */

export function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

export function getLocalSiderealTime(longitude, dateTime) {
  // TODO: Calculate Julian Date from dateTime.
  // TODO: Calculate Greenwich Mean Sidereal Time (GMST).
  // TODO: Add longitude offset to get Local Sidereal Time (LST).
  // TODO: Return LST in decimal hours (0–24).
}

export function getHourAngle(ra, localSiderealTime) {
  // TODO: Return (localSiderealTime - ra + 24) % 24.
}

export function raDecToAltAz(ra, dec, latitude, longitude, dateTime) {
  // TODO: Compute LST using getLocalSiderealTime.
  // TODO: Compute Hour Angle using getHourAngle.
  // TODO: Apply spherical trigonometry formulae to get altitude and azimuth.
  // TODO: Return { altitude, azimuth }.
}
