/**
 * timeUtils.js — date and time utilities for astronomical calculations.
 *
 * Functions:
 *
 * getJulianDate(dateTime)
 *   Converts a JavaScript Date to a Julian Date (continuous day count
 *   from 1 January 4713 BC). Used as input by many astronomy formulae.
 *
 * getJ2000(dateTime)
 *   Returns days since the J2000.0 epoch (1 January 2000, 12:00 TT).
 *   Most modern astronomy formulas use J2000 as their reference point.
 *
 * getSunsetTime(latitude, longitude, date)
 *   Returns the approximate sunset time for a given location and date.
 *   Used by HomeScreen and CelestialService.getVisibleObjectsTonight().
 *
 * formatDiscoveryDate(timestamp)
 *   Formats a Unix timestamp as a human-readable string for DiscoveriesScreen.
 *   e.g. 1708900000000 → "25 Feb 2026, 21:34"
 */

export function getJulianDate(dateTime) {
  // TODO: Implement Julian Date conversion formula.
  // JD = 367*Y - INT(7*(Y+INT((M+9)/12))/4) + INT(275*M/9) + D + 1721013.5 + UT/24
}

export function getJ2000(dateTime) {
  // TODO: Return getJulianDate(dateTime) - 2451545.0.
}

export function getSunsetTime(latitude, longitude, date) {
  // TODO: Use astronomy-engine Body.Sun and SearchRiseSet to find sunset.
}

export function formatDiscoveryDate(timestamp) {
  // TODO: Use Intl.DateTimeFormat to format the timestamp.
  return new Date(timestamp).toLocaleString();
}
