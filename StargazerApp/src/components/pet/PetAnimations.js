/**
 * PetAnimations — provides reanimated animation styles for each pet mood.
 *
 * Exported functions each return an animated style object to be applied
 * to the pet sprite Image component.
 *
 * Animations:
 * - idleAnimation()    : gentle floating bob up and down, loops forever
 * - happyAnimation()   : quick bounce / jump when a discovery is made
 * - hungryAnimation()  : slow drooping / droopy shake
 * - sleepingAnimation(): subtle breathing rise and fall
 * - excitedAnimation() : fast spin or star burst when evolving
 *
 * All animations use react-native-reanimated useSharedValue + withRepeat.
 */

import { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

export function useIdleAnimation() {
  // TODO: Create a shared value that oscillates between -5 and 5 (vertical offset).
  // TODO: Return an animated style with transform translateY.
}

export function useHappyAnimation() {
  // TODO: Create a bounce animation triggered externally.
}

export function useHungryAnimation() {
  // TODO: Create a slow shake animation.
}

export function useSleepingAnimation() {
  // TODO: Create a gentle scale breathe animation.
}

export function useExcitedAnimation() {
  // TODO: Create a fast spin or pulse for evolution moments.
}
