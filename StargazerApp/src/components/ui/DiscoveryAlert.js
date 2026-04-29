/**
 * DiscoveryAlert — animated banner shown when the user finds something new.
 *
 * Triggered from ARSkyScreen when a tapped object is not yet in the
 * user's discoveries list.
 *
 * Props:
 * - discovery  : { name, type, xpAwarded, mythTeaser }
 * - visible    : boolean — controls whether the banner is shown
 * - onDismiss  : called when the user taps the banner or the 4-second timer fires
 *
 * Behaviour:
 * - Slides down from above the screen with a spring animation.
 * - Scales from 0.85 to 1 as it arrives, giving a "pop" feel.
 * - Auto-dismisses after 4 seconds, or immediately on tap.
 * - Slides back up when dismissed.
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// ─── Constants ────────────────────────────────────────────────────────────────

// How long the banner stays visible before auto-dismissing (milliseconds).
const AUTO_DISMISS_MS = 4000;

// Badge colour and label for each object type.
const TYPE_BADGE = {
  star:          { label: 'STAR',          colour: '#ffdd44' },
  planet:        { label: 'PLANET',        colour: '#44aaff' },
  constellation: { label: 'CONSTELLATION', colour: '#aa55ff' },
};

// Icon character shown next to the object name.
const TYPE_ICON = {
  star:          '★',
  planet:        '◉',
  constellation: '✦',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function DiscoveryAlert({ discovery, visible, onDismiss }) {
  const translateY = useSharedValue(-250);
  const scale      = useSharedValue(0.85);

  // Stores the auto-dismiss timer so it can be cleared if the user taps early
  // or if the component unmounts before the timer fires.
  const timerRef = useRef(null);

  useEffect(() => {
    // Always clear any previous timer when visibility changes.
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (visible) {
      // Spring into view from above.
      translateY.value = withSpring(0,    { damping: 18, stiffness: 200 });
      scale.value      = withSpring(1,    { damping: 18, stiffness: 200 });

      // Start the auto-dismiss countdown.
      timerRef.current = setTimeout(onDismiss, AUTO_DISMISS_MS);
    } else {
      // Slide back up off-screen.
      translateY.value = withTiming(-250, { duration: 300 });
      scale.value      = withTiming(0.85, { duration: 300 });
    }

    // Clean up the timer when the component unmounts or visible changes.
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Render nothing if there is no discovery data yet — this avoids a flash
  // of empty content on the very first render before the first discovery.
  if (!discovery) return null;

  const badge = TYPE_BADGE[discovery.type] ?? { label: discovery.type?.toUpperCase() ?? '', colour: '#aaaaaa' };
  const icon  = TYPE_ICON[discovery.type]  ?? '✦';

  return (
    // pointerEvents="none" when not visible so taps pass through the hidden banner.
    <Animated.View
      style={[styles.container, animatedStyle]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <TouchableOpacity onPress={onDismiss} activeOpacity={0.85} style={styles.inner}>

        {/* ── Top row: "NEW DISCOVERY" label + type badge ── */}
        <View style={styles.topRow}>
          <Text style={styles.newLabel}>✦  NEW DISCOVERY</Text>
          <View style={[styles.badge, { backgroundColor: badge.colour }]}>
            <Text style={styles.badgeText}>{badge.label}</Text>
          </View>
        </View>

        {/* ── Object name with icon ── */}
        <View style={styles.nameRow}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.name} numberOfLines={1}>{discovery.name}</Text>
        </View>

        {/* ── XP awarded ── */}
        <Text style={styles.xp}>+{discovery.xpAwarded} XP earned</Text>

        {/* ── One-line myth teaser ── */}
        {discovery.mythTeaser ? (
          <Text style={styles.teaser} numberOfLines={2}>
            {discovery.mythTeaser}
          </Text>
        ) : null}

        {/* ── Pet comment ── */}
        {discovery.petComment ? (
          <View style={styles.petComment}>
            <Text style={styles.petCommentText}>🦊  {discovery.petComment}</Text>
          </View>
        ) : null}

        {/* ── Dismiss hint ── */}
        <Text style={styles.hint}>Tap to dismiss</Text>

      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 52,
    left: 16,
    right: 16,
    // Shadow on Android.
    elevation: 12,
    // Shadow on iOS.
    shadowColor: '#5555ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderRadius: 18,
  },

  inner: {
    backgroundColor: '#12122e',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#4444cc',
    padding: 16,
  },

  // ── Top row ──
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  newLabel: {
    color: '#ffdd88',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#000000',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  // ── Name row ──
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    color: '#ffdd88',
    fontSize: 20,
    marginRight: 8,
  },
  name: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },

  // ── XP ──
  xp: {
    color: '#66ff88',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },

  // ── Myth teaser ──
  teaser: {
    color: '#9999bb',
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 17,
    marginBottom: 8,
  },

  // ── Pet comment ──
  petComment: {
    backgroundColor: '#0a0a22',
    borderRadius:    8,
    borderWidth:     1,
    borderColor:     '#222244',
    paddingHorizontal: 10,
    paddingVertical:   7,
    marginBottom:    10,
  },
  petCommentText: {
    color:      '#ccccff',
    fontSize:   12,
    lineHeight: 17,
    fontStyle:  'italic',
  },

  // ── Dismiss hint ──
  hint: {
    color: '#555577',
    fontSize: 11,
    textAlign: 'right',
  },
});
