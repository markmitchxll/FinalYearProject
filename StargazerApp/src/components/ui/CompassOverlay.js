/**
 * CompassOverlay — shows cardinal directions (N, S, E, W) on the AR view.
 *
 * Helps the user orient themselves when scanning the sky.
 * The labels rotate in the opposite direction to the device heading so they
 * always appear in the correct physical direction.
 *
 * Props:
 * - heading : number, device compass heading in degrees (0 = North, 90 = East)
 *
 * Visual:
 * - Thin horizontal line across the middle of the screen.
 * - N / NE / E / SE / S / SW / W / NW labels spaced along the line.
 * - Labels scroll horizontally as the user rotates the phone.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CompassOverlay({ heading }) {
  // TODO: Calculate x positions for each direction label based on heading.
  // TODO: Render labels with absolute positioning along the midline.
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.horizon} />
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
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
