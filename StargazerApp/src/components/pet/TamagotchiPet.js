/**
 * TamagotchiPet — the main animated pet display component.
 *
 * Renders the correct sprite for the pet's current evolution stage
 * and plays animations based on pet state (idle, happy, hungry, sleeping).
 *
 * Props:
 * - stage     : number 1–4, determines which sprite set to use
 * - mood      : 'idle' | 'happy' | 'hungry' | 'sleeping' | 'excited'
 * - onPress   : callback when the user taps the pet (triggers a reaction)
 *
 * Animation is handled by PetAnimations.js using react-native-reanimated.
 * Sprites are loaded from assets/images/pet/.
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function TamagotchiPet({ stage, mood, onPress }) {
  // TODO: Import sprite images for each stage from assets/images/pet/.
  // TODO: Use PetAnimations to get the animated style for the current mood.
  // TODO: Render an animated Image inside a TouchableOpacity.
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.petPlaceholder} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  petPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#334',
    borderRadius: 60,
  },
});
