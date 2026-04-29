/**
 * CompassService — provides device heading (compass) and tilt (pitch/roll).
 *
 * These values tell the app which direction the phone is pointing, so
 * CelestialService knows what part of the sky to show overlays for.
 *
 * Uses react-native-sensors for the magnetometer and accelerometer.
 *
 * Why I need BOTH sensors:
 * - The magnetometer gives us compass direction, but only correctly when the
 *   phone is held flat. If the phone is tilted (e.g. pointing at the sky),
 *   the raw magnetometer heading drifts badly.
 * - The accelerometer tells us how the phone is tilted (pitch and roll).
 * - By combining them with tilt compensation maths, I get an accurate
 *   heading regardless of how the phone is angled.
 */

import { magnetometer, accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

// How often to read the sensors, in milliseconds.
// 100ms (10 times per second) is smooth enough for AR overlays without draining battery.
const SENSOR_INTERVAL_MS = 100;

/**
 * Converts radians to degrees.
 */
function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

/**
 * Computes a tilt-compensated compass heading from raw magnetometer
 * and accelerometer readings.
 *
 * Without tilt compensation, pointing the phone upward at the sky causes
 * the magnetometer x/y values to become unreliable — heading can be off
 * by 90° or more. This function corrects for that.
 *
 * @param {object} mag - Magnetometer reading: { x, y, z } in microteslas.
 * @param {object} acc - Accelerometer reading: { x, y, z } in m/s².
 * @returns {number} heading - Compass bearing in degrees (0 = North, clockwise).
 */
function computeHeading(mag, acc) {
  // --- Step 1: Calculate pitch and roll from the accelerometer ---
  // The accelerometer measures gravity (9.8 m/s² pulling down).
  // When the phone is tilted, gravity is split across all three axes.
  // I use the ratio of those components to work out the tilt angles.
  const accMagnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);

  // Normalise to unit vector so we're working with angles, not raw forces.
  const ax = acc.x / accMagnitude;
  const ay = acc.y / accMagnitude;
  const az = acc.z / accMagnitude;

  // Pitch: rotation around the x-axis (phone tilting forward/backward).
  // 0 = flat, positive = top of phone tilting away from you.
  const pitch = Math.asin(-ax);

  // Roll: rotation around the y-axis (phone tilting left/right).
  const roll = Math.atan2(ay, az);

  // --- Step 2: Tilt-compensate the magnetometer readings ---
  // Rotate the magnetic field vector to account for the phone's tilt,
  // projecting it onto the horizontal plane.
  const mx = mag.x * Math.cos(pitch) +
             mag.z * Math.sin(pitch);

  const my = mag.x * Math.sin(roll) * Math.sin(pitch) +
             mag.y * Math.cos(roll) -
             mag.z * Math.sin(roll) * Math.cos(pitch);

  // --- Step 3: Calculate heading from the compensated x/y magnetic components ---
  // atan2 gives us the angle of the magnetic field in the horizontal plane.
  let heading = toDegrees(Math.atan2(-my, mx));

  // atan2 returns -180 to +180. Convert to 0–360 compass bearing.
  if (heading < 0) {
    heading += 360;
  }

  // --- Step 4: Correct for phones tilted past vertical ---
  // When az > 0 the screen is facing partially downward, meaning the phone has
  // tilted past the zenith. The tilt compensation above assumes the screen faces
  // upward, so the heading is 180° wrong in this position — flip it to correct.
  if (az > 0) {
    heading = (heading + 180) % 360;
  }

  return heading;
}

/**
 * Calculates pitch (up/down tilt) and roll (left/right tilt) in degrees
 * from raw accelerometer data.
 *
 * @param {object} acc - Accelerometer reading: { x, y, z } in m/s².
 * @returns {{ pitch: number, roll: number }}
 *   pitch: degrees the top of the phone is tilted upward (0 = flat, 90 = pointing at sky).
 *   roll:  degrees the phone is tilted sideways (0 = upright, 90 = lying on its side).
 */
function computePitchAndRoll(acc) {
  const pitch = toDegrees(Math.atan2(-acc.x, Math.sqrt(acc.y ** 2 + acc.z ** 2)));
  const roll  = toDegrees(Math.atan2(acc.y, acc.z));
  return { pitch, roll };
}

/**
 * Starts reading the compass and tilt sensors and calls your callback
 * with updated values several times per second.
 *
 * @param {function} callback - Called with { heading, pitch, roll } on each update.
 *   - heading : 0–360 degrees, 0 = North, 90 = East (where the phone is pointing horizontally).
 *   - pitch   : degrees the phone is tilted up from horizontal (90 = pointing straight at the sky).
 *   - roll    : degrees the phone is tilted sideways.
 * @param {function} onError  - Called if a sensor fails to start (e.g. not available on device).
 * @returns {function} - Call this to stop the sensors (use in useEffect cleanup).
 *
 * Usage in a React component:
 *   useEffect(() => {
 *     const stop = startSensors(({ heading, pitch }) => {
 *       setHeading(heading);
 *       setPitch(pitch);
 *     });
 *     return stop;
 *   }, []);
 */
export function startSensors(callback, onError = () => {}) {
  // Tell react-native-sensors how often to fire updates.
  setUpdateIntervalForType(SensorTypes.magnetometer,  SENSOR_INTERVAL_MS);
  setUpdateIntervalForType(SensorTypes.accelerometer, SENSOR_INTERVAL_MS);

  // combineLatest fires whenever either sensor updates, always pairing the
  // latest magnetometer reading with the latest accelerometer reading.
  const subscription = combineLatest([magnetometer, accelerometer])
    .pipe(
      map(([mag, acc]) => {
        const heading          = computeHeading(mag, acc);
        const { pitch, roll }  = computePitchAndRoll(acc);
        return { heading, pitch, roll };
      })
    )
    .subscribe({
      next:  orientation => callback(orientation),
      error: err => onError(new Error(`Sensor error: ${err.message}`)),
    });

  // Return a cleanup function that stops both sensors.
  return () => subscription.unsubscribe();
}
