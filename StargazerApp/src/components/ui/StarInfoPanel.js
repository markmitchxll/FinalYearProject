/**
 * StarInfoPanel — a slide-up panel showing details of the selected star/planet/constellation.
 *
 * Appears at the bottom of the ARSkyScreen when the user taps a marker.
 * Does NOT cover the full screen — allows the user to still see the sky.
 *
 * Props:
 * - object     : the selected star, planet, or constellation object
 * - onClose    : callback to dismiss the panel
 * - onReadMore : callback to open the full MythDetailModal
 *
 * Shows:
 * - Object name and type badge (Star / Planet / Constellation).
 * - Key facts: magnitude/brightness, distance (light years), best viewing months.
 * - Short myth teaser (2–3 sentences).
 * - "Read full story" button → triggers onReadMore.
 * - If object is a new discovery, shows the DiscoveryAlert automatically.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function StarInfoPanel({ object, onClose, onReadMore }) {
  // TODO: Slide up from bottom using react-native-reanimated.
  // TODO: Display object facts from the relevant data file.
  // TODO: Render "Read full story" button linked to onReadMore.
  return (
    <View style={styles.panel}>
      <Text style={styles.name}>{object?.name}</Text>
      <TouchableOpacity onPress={onReadMore}>
        <Text style={styles.readMore}>Read full story →</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 200,
  },
  name: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  readMore: {
    color: '#7777ff',
    fontSize: 15,
    marginTop: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
