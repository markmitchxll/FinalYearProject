/**
 * MythCard — a compact card component showing the summary of a myth.
 *
 * Used in DiscoveriesScreen and MythologyScreen lists.
 *
 * Props:
 * - myth      : object { id, objectName, culture, shortSummary, fullStory, imageUrl }
 * - locked    : boolean — if true, renders blurred/placeholder state
 * - onPress   : callback, receives the myth object
 *
 * Visual:
 * - Coloured header band (culture-coded colour) acting as a hero area.
 * - Object name and culture badge.
 * - One-sentence summary preview.
 * - Lock icon overlay if locked === true.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Colour palette for each mythology culture — used as the card header tint.
const CULTURE_COLOURS = {
  Greek:     '#4455aa',
  Roman:     '#885522',
  Norse:     '#226655',
  Egyptian:  '#aa8822',
  Chinese:   '#aa2222',
  Japanese:  '#aa3366',
  Hindu:     '#7722aa',
  Aztec:     '#226622',
  Polynesian:'#225588',
};

function getCultureColour(culture) {
  return CULTURE_COLOURS[culture] ?? '#333355';
}

export default function MythCard({ myth, locked, onPress }) {
  const cultureColour = getCultureColour(myth?.culture);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => !locked && onPress(myth)}
      activeOpacity={locked ? 1 : 0.8}
    >
      {/* ── Hero header ── */}
      <View style={[styles.header, { backgroundColor: cultureColour }]}>
        {locked ? (
          // Locked state — show placeholder pattern
          <View style={styles.lockedHeader}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={styles.lockedTitle}>???</Text>
          </View>
        ) : (
          // Unlocked — object name as large hero text
          <Text style={styles.heroText} numberOfLines={2}>
            {myth?.objectName}
          </Text>
        )}
      </View>

      {/* ── Card body ── */}
      <View style={styles.body}>
        {/* Culture badge + object name row */}
        <View style={styles.metaRow}>
          {!locked && (
            <View style={[styles.cultureBadge, { backgroundColor: cultureColour }]}>
              <Text style={styles.cultureText}>{myth?.culture}</Text>
            </View>
          )}
        </View>

        {/* Summary text */}
        <Text style={[styles.summary, locked && styles.summaryLocked]} numberOfLines={2}>
          {locked
            ? 'Discover this object to unlock its myth and story.'
            : myth?.shortSummary}
        </Text>
      </View>

      {/* ── Lock overlay (full-card dim when locked) ── */}
      {locked && <View style={styles.lockOverlay} pointerEvents="none" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#12122a',
    borderRadius:    14,
    marginBottom:    14,
    overflow:        'hidden',
    borderWidth:     1,
    borderColor:     '#1e1e3a',
  },

  // ── Header ──
  header: {
    height:  80,
    padding: 14,
    justifyContent: 'flex-end',
  },
  heroText: {
    color:      '#ffffff',
    fontSize:   18,
    fontWeight: '700',
    textShadowColor:  'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  lockedHeader: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    flexDirection:  'row',
    gap:            8,
  },
  lockIcon: {
    fontSize: 20,
    opacity:  0.6,
  },
  lockedTitle: {
    color:      'rgba(255,255,255,0.4)',
    fontSize:   20,
    fontWeight: '700',
    letterSpacing: 4,
  },

  // ── Body ──
  body: {
    padding: 12,
    gap:     6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
  },
  cultureBadge: {
    paddingHorizontal: 8,
    paddingVertical:   3,
    borderRadius:      20,
  },
  cultureText: {
    color:        '#ffffff',
    fontSize:     10,
    fontWeight:   '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  summary: {
    color:      '#9999bb',
    fontSize:   13,
    lineHeight: 19,
  },
  summaryLocked: {
    color:      '#444466',
    fontStyle:  'italic',
  },

  // ── Lock overlay ──
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 20, 0.45)',
  },
});
