/**
 * StarInfoPanel — slide-up panel showing details of a tapped sky object.
 *
 * Slides up from the bottom of ARSkyScreen when the user taps a marker.
 * Covers roughly the bottom half of the screen so the sky is still visible.
 *
 * What it shows:
 * - Object name, optional designation (stars), and a coloured type badge.
 * - Key facts relevant to the object type (magnitude/distance for stars,
 *   AU distance for planets, star count/best months for constellations).
 * - A short mythology teaser with a "Read full story →" button.
 *
 * Props:
 * - object     : sky object returned by CelestialService (must have .type, .name, .mythologyId)
 * - onClose    : called when the user taps the ✕ button
 * - onReadMore : called when the user taps "Read full story →"
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { mythology } from '../../data/mythology';

// ─── Constants ───────────────────────────────────────────────────────────────

// Badge label and background colour for each celestial object type.
const TYPE_BADGE = {
  star:          { label: 'STAR',          colour: '#ffdd44' },
  planet:        { label: 'PLANET',        colour: '#44aaff' },
  constellation: { label: 'CONSTELLATION', colour: '#aa55ff' },
};

// Short month names for converting bestMonths arrays (1-indexed).
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// ─── Helper: build the facts list ────────────────────────────────────────────

/**
 * Returns an array of { label, value } pairs for the facts section.
 * Different facts are shown depending on whether the object is a star,
 * planet, or constellation.
 */
function getFactItems(obj) {
  if (obj.type === 'star') {
    return [
      { label: 'Designation', value: obj.designation ?? '—' },
      { label: 'Magnitude',   value: `${obj.magnitude} (lower = brighter)` },
      { label: 'Distance',    value: `${obj.distanceLy} light-years` },
    ];
  }

  if (obj.type === 'planet') {
    const facts = [
      { label: 'Distance from Sun', value: `${obj.distanceAU} AU` },
    ];
    // Show one fun fact if the data file includes them.
    if (obj.funFacts?.length) {
      facts.push({ label: 'Did you know?', value: obj.funFacts[0] });
    }
    return facts;
  }

  if (obj.type === 'constellation') {
    const facts = [];

    if (obj.abbreviation) {
      facts.push({ label: 'Abbreviation', value: obj.abbreviation });
    }

    // visibleStarCount / totalStarCount are added by CelestialService at runtime.
    if (obj.visibleStarCount !== undefined) {
      facts.push({
        label: 'Stars visible now',
        value: `${obj.visibleStarCount} of ${obj.totalStarCount}`,
      });
    }

    if (obj.bestMonths?.length) {
      facts.push({
        label: 'Best months',
        value: obj.bestMonths.map(m => MONTH_NAMES[m - 1]).join(' · '),
      });
    }

    if (obj.hemisphere) {
      const HEMI_LABELS = {
        northern: 'Northern hemisphere',
        southern: 'Southern hemisphere',
        both:     'Visible worldwide',
      };
      facts.push({ label: 'Visibility', value: HEMI_LABELS[obj.hemisphere] ?? obj.hemisphere });
    }

    return facts;
  }

  return [];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StarInfoPanel({ object, onClose, onReadMore }) {
  // The panel starts off-screen below (translateY = 350) and springs into view.
  // Because ARSkyScreen mounts a new StarInfoPanel each time an object is tapped,
  // this animation runs automatically on every open.
  const translateY = useSharedValue(350);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 20, stiffness: 180 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const badge = TYPE_BADGE[object.type] ?? { label: object.type?.toUpperCase() ?? '', colour: '#aaaaaa' };
  const myth  = mythology[object.mythologyId];
  const facts = getFactItems(object);

  return (
    <Animated.View style={[styles.panel, animatedStyle]}>

      {/* ✕ Close button — positioned top-right, outside the scroll area */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
        hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
      >
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Scrollable body so long teasers don't overflow on small screens */}
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

        {/* ── Header: name + type badge ── */}
        <View style={styles.header}>
          <View style={styles.titleBlock}>
            <Text style={styles.name}>{object.name}</Text>
            {/* Show the Bayer designation for stars only */}
            {object.type === 'star' && object.designation ? (
              <Text style={styles.designation}>{object.designation}</Text>
            ) : null}
          </View>
          <View style={[styles.badge, { backgroundColor: badge.colour }]}>
            <Text style={styles.badgeText}>{badge.label}</Text>
          </View>
        </View>

        {/* ── Facts table ── */}
        {facts.map(fact => (
          <View key={fact.label} style={styles.factRow}>
            <Text style={styles.factLabel}>{fact.label}</Text>
            <Text style={styles.factValue}  numberOfLines={2}>{fact.value}</Text>
          </View>
        ))}

        {/* ── Mythology teaser ── */}
        {myth ? (
          <View style={styles.mythSection}>
            <Text style={styles.mythCulture}>{myth.culture} mythology</Text>
            <Text style={styles.mythTeaser}>{myth.shortSummary}</Text>
            <TouchableOpacity style={styles.readMoreButton} onPress={onReadMore}>
              <Text style={styles.readMoreText}>Read full story →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noMyth}>No mythology data available yet.</Text>
        )}

      </ScrollView>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#12122a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: '#2a2a5a',
    padding: 24,
    paddingBottom: 36,
    maxHeight: '55%',
  },

  // ── Close button ──
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#8888aa',
    fontSize: 18,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingRight: 36, // leave room for the close button
  },
  titleBlock: {
    flex: 1,
  },
  name: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  designation: {
    color: '#8888bb',
    fontSize: 13,
    marginTop: 3,
    fontStyle: 'italic',
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  badgeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  // ── Facts table ──
  factRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e40',
  },
  factLabel: {
    color: '#7777aa',
    fontSize: 13,
    flex: 1,
  },
  factValue: {
    color: '#ccccee',
    fontSize: 13,
    flex: 2,
    textAlign: 'right',
  },

  // ── Mythology teaser ──
  mythSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#0d0d26',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#7777ff',
  },
  mythCulture: {
    color: '#7777ff',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  mythTeaser: {
    color: '#bbbbdd',
    fontSize: 14,
    lineHeight: 21,
  },
  readMoreButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  readMoreText: {
    color: '#9999ff',
    fontSize: 14,
    fontWeight: '600',
  },
  noMyth: {
    color: '#555577',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 16,
    textAlign: 'center',
  },
});
