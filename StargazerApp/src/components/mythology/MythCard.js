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
 * - Background star-field thumbnail image.
 * - Object name and culture badge (e.g. "Greek", "Chinese").
 * - One-sentence summary preview.
 * - Lock icon overlay if locked === true.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MythCard({ myth, locked, onPress }) {
  // TODO: Render background image from myth.imageUrl (or a fallback star-field image).
  // TODO: If locked, render a semi-transparent overlay with a lock icon.
  // TODO: Show myth.objectName, culture badge, and myth.shortSummary.
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => !locked && onPress(myth)}
      activeOpacity={locked ? 1 : 0.8}
    >
      <Text style={styles.name}>{locked ? '???' : myth?.objectName}</Text>
      <Text style={styles.summary}>{locked ? 'Discover this to unlock its story.' : myth?.shortSummary}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summary: {
    color: '#aaaacc',
    fontSize: 13,
  },
});
