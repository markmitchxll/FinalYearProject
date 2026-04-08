/**
 * CompassOverlay — shows cardinal directions (N, S, E, W) on the AR view.
 *
 * Helps the user orient themselves when scanning the sky.
 * The labels scroll horizontally as the device heading changes so they
 * always appear at the correct position relative to the camera direction.
 *
 * Props:
 * - heading : number, device compass heading in degrees (0 = North, 90 = East)
 *
 * Visual:
 * - Thin horizontal line across the middle of the screen.
 * - N / NE / E / SE / S / SW / W / NW labels spaced along the line.
 * - Labels scroll horizontally as the user rotates the phone.
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// The compass is divided into 8 directions, each 45° apart.
const DIRECTIONS = [
  { label: 'N',  bearing: 0   },
  { label: 'NE', bearing: 45  },
  { label: 'E',  bearing: 90  },
  { label: 'SE', bearing: 135 },
  { label: 'S',  bearing: 180 },
  { label: 'SW', bearing: 225 },
  { label: 'W',  bearing: 270 },
  { label: 'NW', bearing: 315 },
];

// How many degrees of compass the screen represents (matches AR camera FOV).
const FOV_DEGREES = 60;

/**
 * Returns the signed angular difference between two bearings, -180 to +180.
 */
function angularDiff(a, b) {
  return ((a - b + 540) % 360) - 180;
}

export default function CompassOverlay({ heading }) {
  // For each direction label, calculate its horizontal screen position.
  // Labels within ±FOV/2 degrees of the current heading are visible.
  const visibleLabels = useMemo(() => {
    const halfFov = FOV_DEGREES / 2;
    return DIRECTIONS
      .map(dir => {
        const diff = angularDiff(dir.bearing, heading);
        if (Math.abs(diff) > halfFov) return null;
        // Scale angular offset → pixel x position.
        const x = SCREEN_WIDTH / 2 + (diff / FOV_DEGREES) * SCREEN_WIDTH;
        return { ...dir, x };
      })
      .filter(Boolean);
  }, [heading]);

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Horizon line */}
      <View style={styles.horizon} />

      {/* Direction labels along the horizon */}
      {visibleLabels.map(dir => (
        <View
          key={dir.label}
          style={[styles.labelContainer, { left: dir.x - 12 }]}
        >
          {/* Tick mark */}
          <View style={[styles.tick, dir.label.length === 1 && styles.tickPrimary]} />
          <Text style={[styles.label, dir.label === 'N' && styles.labelNorth]}>
            {dir.label}
          </Text>
        </View>
      ))}

      {/* Crosshair at screen centre to show exactly where the camera is pointing. */}
      <View style={styles.crosshairH} />
      <View style={styles.crosshairV} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  horizon: {
    position:        'absolute',
    top:             '50%',
    left:            0,
    right:           0,
    height:          1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  labelContainer: {
    position:   'absolute',
    top:        '50%',
    width:      24,
    alignItems: 'center',
    marginTop:  -24,  // sit just above the horizon line
  },
  tick: {
    width:           1,
    height:          6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom:    3,
  },
  tickPrimary: {
    height:          10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  label: {
    color:        'rgba(200, 220, 255, 0.75)',
    fontSize:     10,
    fontWeight:   '300',
    letterSpacing: 0.5,
  },
  labelNorth: {
    color:      '#ffdd44',
    fontWeight: '600',
    fontSize:   11,
  },
  crosshairH: {
    position:        'absolute',
    top:             '50%',
    left:            '50%',
    marginLeft:      -12,
    marginTop:       -0.5,
    width:           24,
    height:          1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  crosshairV: {
    position:        'absolute',
    top:             '50%',
    left:            '50%',
    marginLeft:      -0.5,
    marginTop:       -12,
    width:           1,
    height:          24,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
