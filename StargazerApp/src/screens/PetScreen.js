/**
 * PetScreen — the Tamagotchi pet screen.
 *
 * The pet gains XP each time the user discovers a new star, planet,
 * or constellation. It evolves through stages as XP milestones are reached.
 *
 * Pet stats (all stored in Redux petSlice):
 * - xp            : total experience points earned from discoveries
 * - stage         : current evolution stage (1–4, unlocked by XP thresholds)
 * - hunger        : decreases over real time; feed by watching stars
 * - happiness     : increases with new discoveries; decreases over time
 * - lastFed       : timestamp used to calculate hunger decay
 *
 * Displayed on this screen:
 * - Animated pet sprite (driven by PetEvolutionStage + PetAnimations).
 * - Hunger and happiness bars.
 * - Total discoveries count and XP progress bar to next evolution.
 * - Feed / play interaction buttons.
 * - Evolution milestone history.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PetScreen() {
  // TODO: Read pet state from Redux petSlice.
  // TODO: Calculate hunger decay based on (Date.now() - lastFed).
  // TODO: Render TamagotchiPet, stat bars, and interaction buttons.
  return (
    <View style={styles.container}>
      <Text>PetScreen — TODO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
});
