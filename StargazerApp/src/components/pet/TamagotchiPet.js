/**
 * TamagotchiPet — the main animated pet display component.
 *
 * Renders the correct sprite for the pet's current evolution stage
 * and plays animations based on pet state (idle, happy, hungry, sleeping).
 *
 * Props:
 * - stage   : number 1–4, determines which sprite / emoji to use
 * - mood    : 'idle' | 'happy' | 'hungry' | 'sleeping' | 'excited'
 * - onPress : callback when the user taps the pet (triggers a reaction)
 *
 * Sprites: When PNG assets are added to assets/images/pet/ the Image
 * source map below can be switched from emoji to require() calls.
 * Animation is handled by PetAnimations.js using react-native-reanimated.
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  useIdleAnimation,
  useHappyAnimation,
  useHungryAnimation,
  useSleepingAnimation,
  useExcitedAnimation,
} from './PetAnimations';

// ─── Stage definitions ────────────────────────────────────────────────────────

// Emoji stand-ins for each stage until real fox sprite PNGs are added.
// To switch to images, replace `emoji` with require('../../../assets/images/pet/stage1_idle.png') etc.
// Planned sprites:
//   Stage 1 — Kit:           tiny fox kit in a nebula cloud
//   Stage 2 — Star Fox:      young fox with star-dusted fur
//   Stage 3 — Comet Fox:     sleek fox with a blazing comet tail
//   Stage 4 — Celestial Fox: nine-tailed kitsune with galaxy tails
const STAGE_SPRITES = {
  1: { emoji: '🦊', colour: '#ff8844', name: 'Kit'           },
  2: { emoji: '🦊', colour: '#ffdd44', name: 'Star Fox'      },
  3: { emoji: '🦊', colour: '#44aaff', name: 'Comet Fox'     },
  4: { emoji: '🦊', colour: '#ff88ff', name: 'Celestial Fox' },
};

// Mood-specific emoji overlays shown beneath the pet.
const MOOD_INDICATORS = {
  idle:     '',
  happy:    '✨',
  hungry:   '💫',
  sleeping: '💤',
  excited:  '🌟',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TamagotchiPet({ stage = 1, mood = 'idle', onPress }) {
  const sprite = STAGE_SPRITES[stage] ?? STAGE_SPRITES[1];

  // All animation hooks must be called unconditionally (Rules of Hooks).
  // Each is activated only when its mood matches.
  const idleStyle     = useIdleAnimation    (mood === 'idle');
  const happyStyle    = useHappyAnimation   (mood === 'happy');
  const hungryStyle   = useHungryAnimation  (mood === 'hungry');
  const sleepingStyle = useSleepingAnimation(mood === 'sleeping');
  const excitedStyle  = useExcitedAnimation (mood === 'excited');

  // Pick the active animation style based on current mood.
  const animatedStyle =
    mood === 'happy'    ? happyStyle    :
    mood === 'hungry'   ? hungryStyle   :
    mood === 'sleeping' ? sleepingStyle :
    mood === 'excited'  ? excitedStyle  :
    idleStyle; // default: idle float

  const moodIndicator = MOOD_INDICATORS[mood] ?? '';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Animated.View style={[styles.petWrapper, animatedStyle]}>
        {/* Glow ring behind the pet — colour matches the evolution stage */}
        <Animated.View
          style={[styles.glowRing, { borderColor: sprite.colour, shadowColor: sprite.colour }]}
        />

        {/* Pet sprite — emoji until image assets are provided */}
        <Text style={styles.sprite}>{sprite.emoji}</Text>

        {/* Mood indicator floats above the pet */}
        {moodIndicator !== '' && (
          <Text style={styles.moodIndicator}>{moodIndicator}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const SPRITE_SIZE = 110;

const styles = StyleSheet.create({
  container: {
    alignItems:     'center',
    justifyContent: 'center',
    padding:        16,
  },
  petWrapper: {
    alignItems:     'center',
    justifyContent: 'center',
    width:          SPRITE_SIZE,
    height:         SPRITE_SIZE,
  },
  glowRing: {
    position:     'absolute',
    width:        SPRITE_SIZE + 20,
    height:       SPRITE_SIZE + 20,
    borderRadius: (SPRITE_SIZE + 20) / 2,
    borderWidth:  1.5,
    opacity:      0.4,
    // iOS glow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius:  12,
  },
  sprite: {
    fontSize:   72,
    lineHeight: SPRITE_SIZE,
    textAlign:  'center',
  },
  moodIndicator: {
    position: 'absolute',
    top:      -10,
    right:    -10,
    fontSize: 22,
  },
});
