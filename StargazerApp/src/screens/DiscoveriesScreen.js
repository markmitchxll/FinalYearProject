/**
 * DiscoveriesScreen — the user's personal star catalogue.
 *
 * Shows everything the user has discovered so far, organised into tabs:
 * - Stars
 * - Planets
 * - Constellations
 *
 * Each entry shows:
 * - Name of the object.
 * - Date/time it was first discovered.
 * - A short teaser of its associated myth.
 * - Tapping an entry navigates to the full MythDetailModal.
 *
 * Data source: Redux discoveriesSlice.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DiscoveriesScreen({ navigation }) {
  // TODO: Read discoveries from Redux discoveriesSlice.
  // TODO: Split discoveries into stars, planets, constellations tabs.
  // TODO: Render a FlatList for each tab.
  // TODO: On item tap, open MythDetailModal.
  return (
    <View style={styles.container}>
      <Text>DiscoveriesScreen — TODO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
});
