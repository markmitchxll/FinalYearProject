/**
 * PlanetMarker — renders a floating label on the AR view for a planet.
 *
 * Similar to StarMarker but planets are visually distinct:
 * - Coloured circle (Mars = red, Jupiter = orange, Saturn = yellow, etc.)
 * - Planet icon / symbol instead of a plain dot.
 * - Larger and more prominent than star markers.
 *
 * Props:
 * - planet      : object { name, colour, altitude, azimuth, mythologyId }
 * - screenX     : horizontal screen position in pixels
 * - screenY     : vertical screen position in pixels
 * - onPress     : callback when the user taps this marker
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PlanetMarker({ planet, screenX, screenY, onPress }) {
  // TODO: Map planet.name to its characteristic colour.
  // TODO: Position using absolute { left: screenX, top: screenY }.
  return (
    <TouchableOpacity
      style={[styles.marker, { left: screenX, top: screenY }]}
      onPress={() => onPress(planet)}
    >
      <View style={[styles.dot, { backgroundColor: planet?.colour || '#ffdd88' }]} />
      <Text style={styles.label}>{planet?.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  label: {
    color: '#ffdd88',
    fontSize: 11,
    marginTop: 2,
    fontWeight: 'bold',
  },
});
