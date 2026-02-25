/**
 * MythologyScreen — a browsable library of all myths and stories in the app.
 *
 * Unlike DiscoveriesScreen (which shows only what the user has found),
 * this screen shows ALL mythology entries, but locks the ones not yet
 * discovered with a blurred/silhouette preview to encourage exploration.
 *
 * Sections:
 * - Greek / Roman myths (most constellations)
 * - Mesopotamian myths (older star lore)
 * - Chinese star myths (different constellation groupings)
 * - Indigenous / other cultural stories
 *
 * Tapping an unlocked entry opens MythDetailModal.
 * Tapping a locked entry shows "Discover [Name] in the AR view to unlock."
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MythologyScreen({ navigation }) {
  // TODO: Load all entries from data/mythology.js.
  // TODO: Cross-reference with Redux discoveriesSlice to mark locked/unlocked.
  // TODO: Render sectioned list grouped by culture.
  return (
    <View style={styles.container}>
      <Text>MythologyScreen — TODO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
});
