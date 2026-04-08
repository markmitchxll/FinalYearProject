/**
 * StarryBackground — reusable black space background.
 *
 * Renders a pure-black sky filled with yellow/white star dots and a glowing
 * moon in the top-right corner. Wrap any screen in this component to give it
 * the space theme.
 *
 * Star positions are computed once at module load using the golden-angle
 * spiral (137.5°) so they are evenly distributed and never change between
 * renders.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

// ─── Star field ───────────────────────────────────────────────────────────────

// Golden angle in degrees — produces an evenly spaced, non-repeating spiral.
const GOLDEN_ANGLE = 137.508;

// Build the star catalogue once. Each star has a fixed position, size, and
// opacity so the background stays stable across re-renders.
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id:      i,
  left:    (i * GOLDEN_ANGLE)  % 100,   // percentage of screen width
  top:     (i * 61.8)          % 100,   // percentage of screen height
  size:    [1.5, 2, 1.5, 2.5, 1.5, 2, 3, 1.5][i % 8],
  opacity: 0.30 + (i % 10) * 0.05,
  // Alternate between warm yellow and cool white for variety.
  color:   i % 3 === 0 ? '#ffffff' : '#ffe066',
}));

// ─── Component ────────────────────────────────────────────────────────────────

export default function StarryBackground({ children }) {
  return (
    <View style={styles.container}>

      {/* Star + moon layer — sits behind everything, passes all touches through */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">

        {STARS.map(star => (
          <View
            key={star.id}
            style={{
              position:     'absolute',
              left:         `${star.left}%`,
              top:          `${star.top}%`,
              width:        star.size,
              height:       star.size,
              borderRadius: star.size,
              backgroundColor: star.color,
              opacity:      star.opacity,
            }}
          />
        ))}

        {/* Moon glow — a larger, faint circle to simulate light scatter */}
        <View style={styles.moonGlow} />

        {/* Moon — crisp white circle */}
        <View style={styles.moon} />

      </View>

      {/* Screen content on top of the background */}
      {children}

    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  moon: {
    position:        'absolute',
    top:             '6%',
    right:           '8%',
    width:           52,
    height:          52,
    borderRadius:    26,
    backgroundColor: '#fffef0',
  },
  moonGlow: {
    position:        'absolute',
    top:             '4.8%',
    right:           '5.5%',
    width:           76,
    height:          76,
    borderRadius:    38,
    backgroundColor: '#fffbe0',
    opacity:         0.15,
  },
});
