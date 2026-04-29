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

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Maps a star's apparent magnitude to a dot diameter in pixels.
 *
 * Magnitude scale: lower number = brighter star.
 *   Sirius:   -1.46  → biggest dot  (~16px)
 *   Polaris:   1.97  → medium dot   (~10px)
 *   Faint:     5.0   → smallest dot (~5px)
 *
 * Clamp between 5 and 16px so even faint stars are tappable.
 */
function magnitudeToDotSize(magnitude) {
  // Linear mapping: mag -2 → 16px, mag 6 → 5px.
  const size = 16 - ((magnitude + 2) / 8) * 11;
  return Math.round(Math.max(5, Math.min(16, size)));
}

/**
 * Maps magnitude to a glow radius.
 * Bright stars (low magnitude) get a larger, more visible glow.
 */
function magnitudeToGlow(magnitude) {
  const glow = 10 - ((magnitude + 2) / 8) * 8;
  return Math.max(2, Math.min(10, glow));
}

export default function StarMarker({ star, screenX, screenY, onPress }) {
  const dotSize   = useMemo(() => magnitudeToDotSize(star?.magnitude ?? 3), [star?.magnitude]);
  const glowSize  = useMemo(() => magnitudeToGlow(star?.magnitude ?? 3),    [star?.magnitude]);
  const borderRadius = dotSize / 2;

  // Offset so the dot centre sits on (screenX, screenY) rather than the top-left corner.
  const left = screenX - dotSize / 2;
  const top  = screenY - dotSize / 2;

  return (
    <TouchableOpacity
      style={[styles.marker, { left, top }]}
      onPress={() => onPress(star)}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      {/* Outer glow ring — semi-transparent, slightly larger than the dot. */}
      <View
        style={[
          styles.glow,
          {
            width:        dotSize + glowSize * 2,
            height:       dotSize + glowSize * 2,
            borderRadius: (dotSize + glowSize * 2) / 2,
            // Position glow so it's centred on the dot.
            top:  -glowSize,
            left: -glowSize,
          },
        ]}
      />

      {/* Star dot */}
      <View
        style={[
          styles.dot,
          {
            width:        dotSize,
            height:       dotSize,
            borderRadius,
            // iOS shadow for glow effect.
            shadowRadius: glowSize,
          },
        ]}
      />

      {/* Only show name label for brighter stars to avoid clutter. */}
      {(star?.magnitude ?? 3) < 3 && (
        <Text style={styles.label}>{star?.name}</Text>
      )}
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
    backgroundColor: 'rgba(200, 220, 255, 0.12)',
  },
  dot: {
    backgroundColor: '#ffffff',
    // iOS glow.
    shadowColor: '#aaccff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    // Android elevation gives a subtle lift but not a true glow.
    elevation: 3,
  },
  label: {
    color: '#cce0ff',
    fontSize: 9,
    marginTop: 3,
    textShadowColor: 'rgba(0,0,30,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.3,
  },
});
