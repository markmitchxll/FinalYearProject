/**
 * ConstellationLines — draws the dot-to-dot lines of a constellation on the AR view.
 *
 * Uses React Native's SVG library (react-native-svg) to draw lines between
 * the screen positions of each star in a constellation.
 *
 * Props:
 * - constellation : object from data/constellations.js, including the ordered
 *                   list of star pairs that form the stick figure lines.
 * - starScreenPositions : Map of starId → { x, y } screen coordinates,
 *                         pre-computed by ARSkyScreen from CelestialService output.
 * - onPress       : callback with the constellation object when the user taps the lines.
 *
 * Visual:
 * - Thin semi-transparent blue/white lines connecting the stars.
 * - Constellation name label at the centroid of all its stars.
 */

import React from 'react';
import { View } from 'react-native';

export default function ConstellationLines({ constellation, starScreenPositions, onPress }) {
  // TODO: Import Svg and Line from react-native-svg.
  // TODO: For each pair in constellation.linePairs, draw a Line between the two star positions.
  // TODO: Calculate centroid and render constellation name label.
  return <View />;
}
