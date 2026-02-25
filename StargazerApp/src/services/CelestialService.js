/**
 * CelestialService — the astronomical calculation engine.
 *
 * Determines which stars, planets, and constellations are currently
 * visible from the user's location, and where they appear in the sky.
 *
 * Key concepts:
 * - RA / Dec (Right Ascension / Declination): a star's fixed position in space.
 * - Alt / Az (Altitude / Azimuth): where the star actually appears in the sky
 *   from a given location at a given time. This changes every second.
 * - The `astronomy-engine` npm library handles the heavy maths.
 */

import * as Astronomy from 'astronomy-engine';
import { stars } from '../data/stars';
import { planets } from '../data/planets';
import { constellations } from '../data/constellations';

// Maps our planet IDs (from planets.js) to astronomy-engine Body names.
const PLANET_BODY_MAP = {
  mercury: 'Mercury',
  venus:   'Venus',
  mars:    'Mars',
  jupiter: 'Jupiter',
  saturn:  'Saturn',
  uranus:  'Uranus',
  neptune: 'Neptune',
};

/**
 * Creates an astronomy-engine Observer from GPS coordinates.
 * The third argument is elevation above sea level in metres — 0 is fine for our purposes.
 */
function createObserver(latitude, longitude) {
  return new Astronomy.Observer(latitude, longitude, 0);
}

/**
 * Returns the angular difference between two compass bearings, in the range -180 to +180.
 * Handles the 0°/360° wraparound (e.g. the gap between 5° and 355° is 10°, not 350°).
 */
function angularDifference(bearingA, bearingB) {
  return ((bearingA - bearingB + 540) % 360) - 180;
}

/**
 * Computes the altitude and azimuth of a fixed star (from our catalogue)
 * for a given observer and time.
 *
 * astronomy-engine's Horizon() function accepts the star's RA/Dec directly
 * and internally works out where it sits in the sky using sidereal time.
 */
function getStarAltAz(star, observer, date) {
  const hor = Astronomy.Horizon(date, observer, star.ra, star.dec, 'normal');
  return { altitude: hor.altitude, azimuth: hor.azimuth };
}

/**
 * Computes the altitude and azimuth of a planet for a given observer and time.
 *
 * Planets move, so we first ask astronomy-engine where the planet currently
 * is in equatorial coordinates (RA/Dec), then convert that to horizontal
 * coordinates (altitude/azimuth) for our observer.
 */
function getPlanetAltAz(planet, observer, date) {
  const bodyName = PLANET_BODY_MAP[planet.id];
  if (!bodyName) return null;

  const body = Astronomy.Body[bodyName];
  // ofdate=true applies precession/nutation corrections; aberration=true corrects for Earth's motion.
  const equ = Astronomy.Equator(body, date, observer, true, true);
  const hor = Astronomy.Horizon(date, observer, equ.ra, equ.dec, 'normal');
  return { altitude: hor.altitude, azimuth: hor.azimuth };
}

/**
 * Returns all stars, planets, and constellations currently above the horizon
 * for the given location and time.
 *
 * @param {number} latitude   - Observer's latitude in decimal degrees.
 * @param {number} longitude  - Observer's longitude in decimal degrees.
 * @param {Date}   dateTime   - The date/time to calculate for (defaults to now).
 * @returns {{ stars, planets, constellations }} - Three arrays of visible objects,
 *   each extended with { altitude, azimuth } properties.
 */
export function getVisibleObjects(latitude, longitude, dateTime = new Date()) {
  const observer = createObserver(latitude, longitude);

  // --- Stars ---
  const visibleStars = stars
    .map(star => {
      try {
        const { altitude, azimuth } = getStarAltAz(star, observer, dateTime);
        return { ...star, type: 'star', altitude, azimuth };
      } catch {
        return null; // Skip any star that causes a calculation error.
      }
    })
    .filter(s => s !== null && s.altitude > 0);

  // --- Planets ---
  const visiblePlanets = planets
    .map(planet => {
      try {
        const result = getPlanetAltAz(planet, observer, dateTime);
        if (!result) return null;
        return { ...planet, type: 'planet', altitude: result.altitude, azimuth: result.azimuth };
      } catch {
        return null;
      }
    })
    .filter(p => p !== null && p.altitude > 0);

  // --- Constellations ---
  // A constellation is "visible" if at least one of its stars is above the horizon.
  // We place the constellation label at the average position of its visible stars.
  const visibleStarIds = new Set(visibleStars.map(s => s.id));

  const visibleConstellations = constellations
    .map(con => {
      const conVisibleStars = visibleStars.filter(s => con.starIds.includes(s.id));
      if (conVisibleStars.length === 0) return null;

      const avgAltitude = conVisibleStars.reduce((sum, s) => sum + s.altitude, 0) / conVisibleStars.length;
      const avgAzimuth  = conVisibleStars.reduce((sum, s) => sum + s.azimuth,  0) / conVisibleStars.length;

      return {
        ...con,
        type: 'constellation',
        altitude: avgAltitude,
        azimuth: avgAzimuth,
        visibleStarCount: conVisibleStars.length,
        totalStarCount: con.starIds.length,
        // isComplete is true when every star in the constellation is above the horizon.
        isComplete: conVisibleStars.length === con.starIds.length,
      };
    })
    .filter(Boolean);

  return { stars: visibleStars, planets: visiblePlanets, constellations: visibleConstellations };
}

/**
 * Returns only the objects that fall within the camera's current field of view.
 *
 * Call this every time the device heading or pitch changes (i.e. several times
 * per second) to keep the AR overlays up to date.
 *
 * @param {number} latitude   - Observer GPS latitude.
 * @param {number} longitude  - Observer GPS longitude.
 * @param {number} heading    - Compass bearing the phone is pointing (0–360, 0 = North).
 * @param {number} tilt       - Phone pitch in degrees (0 = flat on table, 90 = pointing straight up).
 * @param {number} fovDegrees - Camera field of view in degrees (default 60).
 * @param {Date}   dateTime   - Defaults to now.
 * @returns {{ stars, planets, constellations }}
 */
export function getObjectsInDirection(
  latitude,
  longitude,
  heading,
  tilt,
  fovDegrees = 60,
  dateTime = new Date()
) {
  const halfFov = fovDegrees / 2;
  const { stars: visibleStars, planets: visiblePlanets, constellations: visibleConstellations } =
    getVisibleObjects(latitude, longitude, dateTime);

  function isInFrame(obj) {
    const azimuthOffset  = Math.abs(angularDifference(obj.azimuth, heading));
    const altitudeOffset = Math.abs(obj.altitude - tilt);
    return azimuthOffset <= halfFov && altitudeOffset <= halfFov;
  }

  return {
    stars:          visibleStars.filter(isInFrame),
    planets:        visiblePlanets.filter(isInFrame),
    constellations: visibleConstellations.filter(isInFrame),
  };
}

/**
 * Converts a sky object's altitude/azimuth into x/y pixel coordinates
 * for rendering on the phone screen.
 *
 * Objects near the centre of the screen get positions near the centre.
 * Objects towards the edge of the field of view appear near the screen edges.
 *
 * @param {number} altitude      - Object's altitude in degrees.
 * @param {number} azimuth       - Object's azimuth (compass bearing) in degrees.
 * @param {number} deviceHeading - Compass direction the phone is pointing (degrees).
 * @param {number} deviceTilt    - Phone pitch angle (degrees).
 * @param {number} screenWidth   - Device screen width in pixels.
 * @param {number} screenHeight  - Device screen height in pixels.
 * @param {number} fovDegrees    - Camera field of view (default 60).
 * @returns {{ x: number, y: number }}
 */
export function altAzToScreenPosition(
  altitude,
  azimuth,
  deviceHeading,
  deviceTilt,
  screenWidth,
  screenHeight,
  fovDegrees = 60
) {
  // How far (in degrees) is this object from the centre of the camera frame?
  const azimuthOffset  = angularDifference(azimuth, deviceHeading);
  const altitudeOffset = altitude - deviceTilt;

  // Scale degrees → pixels.
  // Moving fovDegrees/2 degrees to the right = moving to the right edge of the screen.
  const x = screenWidth  / 2 + (azimuthOffset  / fovDegrees) * screenWidth;
  // Altitude increases upward in the sky, but y increases downward on screen, so we negate.
  const y = screenHeight / 2 - (altitudeOffset / fovDegrees) * screenHeight;

  return { x: Math.round(x), y: Math.round(y) };
}

/**
 * Returns a summary of what will be visible tonight, starting one hour after sunset.
 * Used by HomeScreen to show the user what to look for before they go outside.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @returns {{ sunsetTime: Date, planets: [], constellations: [], brightestStars: [] }}
 */
export function getVisibleObjectsTonight(latitude, longitude) {
  const observer = createObserver(latitude, longitude);
  const now = new Date();

  // Find tonight's sunset. SearchRiseSet returns null if the Sun doesn't set
  // (e.g. midnight sun in Arctic summer), so we fall back to 9 PM local time.
  let sunsetTime;
  try {
    const sunsetEvent = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, now, 1);
    sunsetTime = sunsetEvent ? sunsetEvent.date : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0);
  } catch {
    sunsetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0);
  }

  // Calculate what's visible one hour after sunset — the sky is fully dark by then.
  const observationTime = new Date(sunsetTime.getTime() + 60 * 60 * 1000);
  const { stars: visibleStars, planets: visiblePlanets, constellations: visibleConstellations } =
    getVisibleObjects(latitude, longitude, observationTime);

  // Return the 5 brightest visible stars (sorted by magnitude — lower = brighter).
  const brightestStars = [...visibleStars]
    .sort((a, b) => a.magnitude - b.magnitude)
    .slice(0, 5);

  return {
    sunsetTime,
    planets:        visiblePlanets,
    constellations: visibleConstellations,
    brightestStars,
  };
}
