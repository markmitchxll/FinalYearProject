/**
 * ConstellationLines — draws the dot-to-dot lines of a constellation on the AR view.
 *
 * Draws lines between pairs of stars using a pure React Native technique:
 * each line is a thin View rotated to connect two screen positions.
 * This avoids needing react-native-svg.
 *
 * Props:
 * - constellation      : object from data/constellations.js, including linePairs.
 * - starScreenPositions: Map of starId → { x, y } screen coordinates,
 *                        pre-computed by ARSkyScreen from CelestialService output.
 * - onPress            : callback with the constellation object when the user taps.
 *
 * Visual:
 * - Thin semi-transparent blue/white lines connecting the stars.
 * - Constellation name label at the centroid of all visible star positions.
 */

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Renders a single line segment between two screen points using a rotated View.
 *
 * Steps:
 *  1. Calculate the pixel distance (length of the line).
 *  2. Calculate the angle using atan2.
 *  3. Position the View at the midpoint of the two points.
 *  4. Rotate it so it spans from (x1,y1) to (x2,y2).
 */
function LineBetween({ x1, y1, x2, y2 }) {
  const dx     = x2 - x1;
  const dy     = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle  = Math.atan2(dy, dx) * (180 / Math.PI);

  // Centre the line View at the midpoint.
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <View
      style={[
        styles.line,
        {
          width:  length,
          left:   midX - length / 2,
          top:    midY - 0.5, // half the line height (1px)
          transform: [{ rotate: `${angle}deg` }],
        },
      ]}
    />
  );
}

export default function ConstellationLines({ constellation, starScreenPositions, onPress }) {
  // Build the list of line segments from linePairs where both endpoints are on screen.
  const lines = useMemo(() => {
    if (!constellation?.linePairs || !starScreenPositions) return [];

    return constellation.linePairs.reduce((acc, [idA, idB]) => {
      const posA = starScreenPositions.get(idA);
      const posB = starScreenPositions.get(idB);
      // Skip this pair if either star is off-screen.
      if (!posA || !posB) return acc;
      acc.push({ key: `${idA}-${idB}`, x1: posA.x, y1: posA.y, x2: posB.x, y2: posB.y });
      return acc;
    }, []);
  }, [constellation, starScreenPositions]);

  // Calculate the centroid of all visible star positions for the name label.
  const centroid = useMemo(() => {
    if (!starScreenPositions || starScreenPositions.size === 0) return null;
    const positions = Array.from(starScreenPositions.values());
    const x = positions.reduce((sum, p) => sum + p.x, 0) / positions.length;
    const y = positions.reduce((sum, p) => sum + p.y, 0) / positions.length;
    return { x, y };
  }, [starScreenPositions]);

  if (lines.length === 0) return null;

  return (
    <>
      {/* Line segments */}
      {lines.map(seg => (
        <LineBetween key={seg.key} x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2} />
      ))}

      {/* Constellation name label at the centroid */}
      {centroid && (
        <TouchableOpacity
          style={[styles.labelContainer, { left: centroid.x, top: centroid.y }]}
          onPress={() => onPress(constellation)}
          hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
        >
          <Text style={styles.label}>{constellation.name}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  line: {
    position:        'absolute',
    height:          1,
    backgroundColor: 'rgba(150, 180, 255, 0.45)',
  },
  labelContainer: {
    position:  'absolute',
    transform: [{ translateX: -30 }, { translateY: -8 }],
  },
  label: {
    color:       'rgba(180, 200, 255, 0.8)',
    fontSize:    10,
    fontWeight:  '300',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textShadowColor:  'rgba(0,0,40,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
