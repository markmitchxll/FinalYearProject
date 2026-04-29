/**
 * PetEvolutionStage — maps XP values to evolution stages and milestone thresholds.
 *
 * Evolution stages:
 *  Stage 1 (Kit)           : 0 – 99 XP      — tiny fox kit, just opening its eyes to the sky
 *  Stage 2 (Star Fox)      : 100 – 499 XP   — young fox with star-dusted fur
 *  Stage 3 (Comet Fox)     : 500 – 1999 XP  — sleek fox with a blazing comet tail
 *  Stage 4 (Celestial Fox) : 2000+ XP       — nine-tailed kitsune, fully evolved
 *
 * XP awards (defined here as constants, used by discoveriesSlice):
 *  - New star discovered          : +10 XP
 *  - New planet discovered        : +25 XP
 *  - New constellation completed  : +50 XP  (all stars in it found)
 *  - First discovery of the night : +5 XP bonus
 *
 * Exports:
 * - XP_THRESHOLDS : array of XP values at which each stage unlocks
 * - XP_AWARDS     : object of discovery-type → XP value
 * - getStageFromXP(xp) : returns the stage number (1–4) for a given XP total
 */

export const XP_THRESHOLDS = [0, 100, 500, 2000];

export const XP_AWARDS = {
  star: 10,
  planet: 25,
  constellation: 50,
  firstOfNight: 5,
};

export function getStageFromXP(xp) {
  // Walk backwards through the thresholds — the first one the XP meets or
  // exceeds is the current stage. e.g. 600 XP → skips 2000, meets 500 → stage 3.
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) {
      return i + 1; // Stages are 1-indexed (stage 1, 2, 3, 4).
    }
  }
  return 1; // Fallback — should never be reached since XP_THRESHOLDS[0] is 0.
}
