/**
 * PlanetMarker — renders a floating label on the AR view for a planet.
 *
 * Similar to StarMarker but planets are visually distinct:
 * - Coloured circle (Mars = red, Jupiter = orange, Saturn = yellow, etc.)
 * - Planet symbol rendered inside the dot.
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

// Unicode astronomical symbols for each planet.
const PLANET_SYMBOLS = {
  mercury: '☿',
  venus:   '♀',
  mars:    '♂',
  jupiter: '♃',
  saturn:  '♄',
  uranus:  '⛢',
  neptune: '♆',
};

// Fallback colours in case the data file ever omits the colour field.
const PLANET_COLOURS = {
  mercury: '#b5b5b5',
  venus:   '#ffeeaa',
  mars:    '#cc4422',
  jupiter: '#c88b3a',
  saturn:  '#e4d191',
  uranus:  '#7de8e8',
  neptune: '#5b7fde',
};

const DOT_SIZE = 18;

export default function PlanetMarker({ planet, screenX, screenY, onPress }) {
  const colour = planet?.colour ?? PLANET_COLOURS[planet?.id] ?? '#ffdd88';
  const symbol = PLANET_SYMBOLS[planet?.id] ?? '●';

  // Centre the dot on the screen position.
  const left = screenX - DOT_SIZE / 2;
  const top  = screenY - DOT_SIZE / 2;

  return (
    <TouchableOpacity
      style={[styles.marker, { left, top }]}
      onPress={() => onPress(planet)}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      {/* Outer glow ring using the planet's own colour. */}
      <View
        style={[
          styles.glow,
          { borderColor: colour },
        ]}
      />

      {/* Coloured planet disc with symbol inside. */}
      <View style={[styles.dot, { backgroundColor: colour }]}>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>

      <Text style={[styles.label, { color: colour }]}>{planet?.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width:        DOT_SIZE + 10,
    height:       DOT_SIZE + 10,
    borderRadius: (DOT_SIZE + 10) / 2,
    borderWidth:  1,
    borderColor:  '#ffdd88',
    top:  -5,
    left: -5,
    opacity: 0.5,
  },
  dot: {
    width:        DOT_SIZE,
    height:       DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    justifyContent: 'center',
    alignItems:     'center',
    // iOS shadow.
    shadowColor:   '#ffffff',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius:  6,
    elevation:     4,
  },
  symbol: {
    fontSize:  10,
    color:     'rgba(0,0,0,0.7)',
    lineHeight: 12,
  },
  label: {
    fontSize:   10,
    marginTop:  4,
    fontWeight: '600',
    textShadowColor:  'rgba(0,0,30,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.4,
  },
});
