/**
 * PetAnimations — provides reanimated animation styles for each pet mood.
 *
 * Exported functions each return an animated style object to be applied
 * to the pet sprite component.
 *
 * Animations:
 * - useIdleAnimation()    : gentle floating bob up and down, loops forever
 * - useHappyAnimation()   : quick bounce / jump when a discovery is made
 * - useHungryAnimation()  : slow drooping side-to-side shake
 * - useSleepingAnimation(): subtle breathing scale rise and fall
 * - useExcitedAnimation() : fast pulse scale burst for evolution moments
 *
 * Each hook accepts an `active` boolean. When active switches to true the
 * animation starts; when it switches to false the pet returns to rest.
 */

import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';

// ─── Idle — gentle float ──────────────────────────────────────────────────────

export function useIdleAnimation(active = true) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (active) {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: 1200, easing: Easing.inOut(Easing.sin) }),
          withTiming( 6, { duration: 1200, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,   // loop forever
        false // don't reverse (the sequence handles the back-and-forth)
      );
    } else {
      cancelAnimation(translateY);
      translateY.value = withTiming(0, { duration: 300 });
    }
  }, [active]);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
}

// ─── Happy — bounce up then spring back ──────────────────────────────────────

export function useHappyAnimation(active = false) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (active) {
      // Jump up quickly, then spring back to rest, repeat 3 times.
      translateY.value = withRepeat(
        withSequence(
          withTiming(-20, { duration: 180, easing: Easing.out(Easing.quad) }),
          withSpring(0,   { damping: 6, stiffness: 200 }),
        ),
        3,    // 3 bounces
        false
      );
    } else {
      cancelAnimation(translateY);
      translateY.value = withTiming(0, { duration: 200 });
    }
  }, [active]);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
}

// ─── Hungry — slow droopy left-right sway ────────────────────────────────────

export function useHungryAnimation(active = false) {
  const rotate = useSharedValue(0);

  useEffect(() => {
    if (active) {
      rotate.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 800, easing: Easing.inOut(Easing.sin) }),
          withTiming( 8, { duration: 800, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false
      );
    } else {
      cancelAnimation(rotate);
      rotate.value = withTiming(0, { duration: 300 });
    }
  }, [active]);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));
}

// ─── Sleeping — gentle scale breathe ─────────────────────────────────────────

export function useSleepingAnimation(active = false) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (active) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.06, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.96, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false
      );
    } else {
      cancelAnimation(scale);
      scale.value = withTiming(1, { duration: 400 });
    }
  }, [active]);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
}

// ─── Excited — rapid pulse burst for evolution ───────────────────────────────

export function useExcitedAnimation(active = false) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (active) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: 120, easing: Easing.out(Easing.quad) }),
          withTiming(0.9, { duration: 120, easing: Easing.in(Easing.quad)  }),
        ),
        6,    // 6 rapid pulses
        false
      );
    } else {
      cancelAnimation(scale);
      scale.value = withTiming(1, { duration: 300 });
    }
  }, [active]);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
}
