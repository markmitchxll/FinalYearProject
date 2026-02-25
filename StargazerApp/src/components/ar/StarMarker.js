/**
 * StarMarker — renders a floating label and dot on the AR view for a star.
 *
 * Position is calculated by converting the star's altitude/azimuth
 * (from CelestialService) into an x/y screen position based on the
 * current device heading and tilt from CompassService.
 *
 * Props:
 * - star        : object { name, magnitude, altitude, azimuth, mythologyId }
 * - screenX     : horizontal screen position in pixels
 * - screenY     : vertical screen position in pixels
 * - onPress     : callback when the user taps this marker
 *
 * Visual:
 * - Small circle whose size reflects the star's magnitude (brightness).
 * - Star name label beneath the circle.
 * - Brighter stars glow more.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function StarMarker({ star, screenX, screenY, onPress }) {
  // TODO: Calculate dot size from star.magnitude (lower magnitude = brighter = bigger dot).
  // TODO: Position using absolute { left: screenX, top: screenY }.
  // TODO: Add a subtle glow effect using shadow styles or a library.
  return (
    <TouchableOpacity
      style={[styles.marker, { left: screenX, top: screenY }]}
      onPress={() => onPress(star)}
    >
      <View style={styles.dot} />
      <Text style={styles.label}>{star?.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  label: {
    color: '#ffffff',
    fontSize: 10,
    marginTop: 2,
  },
});
