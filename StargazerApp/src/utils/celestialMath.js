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

/**
 * Calculates the Local Sidereal Time (LST) for a given location and time.
 *
 * Steps:
 *   1. Convert the JS Date to a Julian Date (JD).
 *   2. Calculate days since the J2000 epoch (Jan 1.5, 2000 = JD 2451545.0).
 *   3. Use those days to compute Greenwich Mean Sidereal Time (GMST) in degrees.
 *   4. Add the observer's longitude to shift GMST to LST.
 *   5. Normalise to 0–24 hours.
 *
 * Reference: Jean Meeus, "Astronomical Algorithms", Chapter 12.
 */
export function getLocalSiderealTime(longitude, dateTime) {
  // Step 1: Julian Date.
  // The Unix epoch (1970-01-01 00:00:00 UTC) corresponds to JD 2440587.5.
  const jd = dateTime.getTime() / 86400000 + 2440587.5;

  // Step 2: Days since J2000.0 (JD 2451545.0).
  const d = jd - 2451545.0;

  // Julian centuries since J2000.0 — used in the higher-order correction terms.
  const T = d / 36525;

  // Step 3: GMST in degrees at 0h UT for this date (Meeus eq. 12.4).
  // The constant 280.46061837 is GMST at J2000.0.
  // 360.98564736629 is how many degrees Earth rotates per solar day relative to the stars.
  let gmstDegrees =
    280.46061837 +
    360.98564736629 * d +
    0.000387933 * T * T -
    (T * T * T) / 38710000;

  // Step 4: Add longitude (east positive) to convert GMST → LST in degrees.
  const lstDegrees = gmstDegrees + longitude;

  // Step 5: Normalise to 0–360°, then convert to hours (15° = 1 hour).
  const lstHours = ((lstDegrees % 360) + 360) % 360 / 15;

  return lstHours; // decimal hours, 0–24
}

/**
 * Calculates the Hour Angle of a celestial object.
 *
 * The Hour Angle (HA) tells us how far the object has moved west of the
 * observer's meridian. HA = 0 means the object is due south (transiting),
 * HA > 0 means it has already passed, HA < 0 means it hasn't yet.
 *
 * Both ra and localSiderealTime are in decimal hours (0–24).
 */
export function getHourAngle(ra, localSiderealTime) {
  return ((localSiderealTime - ra + 24) % 24);
}

/**
 * Converts equatorial coordinates (RA, Dec) to horizontal coordinates (Alt, Az)
 * for an observer at a given location and time.
 *
 * Spherical trigonometry formulae (Meeus, Chapter 13):
 *
 *   sin(alt) = sin(dec)·sin(lat) + cos(dec)·cos(lat)·cos(HA)
 *
 *   cos(A)   = [sin(dec) - sin(alt)·sin(lat)] / [cos(alt)·cos(lat)]
 *
 * Azimuth is measured from North clockwise (astronomical convention).
 * If sin(HA) > 0 the object is west of the meridian, so Az > 180°.
 *
 * @param {number} ra        - Right Ascension in decimal hours (0–24)
 * @param {number} dec       - Declination in decimal degrees (-90 to +90)
 * @param {number} latitude  - Observer latitude in decimal degrees
 * @param {number} longitude - Observer longitude in decimal degrees
 * @param {Date}   dateTime  - Observation time
 * @returns {{ altitude: number, azimuth: number }} - Both in degrees
 */
export function raDecToAltAz(ra, dec, latitude, longitude, dateTime) {
  const lst = getLocalSiderealTime(longitude, dateTime);
  const ha  = getHourAngle(ra, lst);

  // Convert to radians for trig.
  const haDeg  = ha * 15; // hours → degrees
  const haRad  = toRadians(haDeg);
  const decRad = toRadians(dec);
  const latRad = toRadians(latitude);

  // Altitude.
  const sinAlt =
    Math.sin(decRad) * Math.sin(latRad) +
    Math.cos(decRad) * Math.cos(latRad) * Math.cos(haRad);
  const altitude = toDegrees(Math.asin(sinAlt));

  // Azimuth — intermediate cosine value.
  const cosAlt = Math.cos(toRadians(altitude));
  const cosA =
    (Math.sin(decRad) - Math.sin(latRad) * sinAlt) /
    (cosAlt * Math.cos(latRad));

  // Clamp to [-1, 1] to avoid floating-point errors in acos.
  const clampedCosA = Math.max(-1, Math.min(1, cosA));
  let azimuth = toDegrees(Math.acos(clampedCosA));

  // If the hour angle is positive (object west of meridian), Az = 360 - Az.
  if (Math.sin(haRad) > 0) {
    azimuth = 360 - azimuth;
  }

  return { altitude, azimuth };
}
