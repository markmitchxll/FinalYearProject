/**
 * MythDetailModal — a full-screen modal showing the complete myth/story.
 *
 * Opened when a user taps a discovered object in DiscoveriesScreen
 * or an unlocked card in MythologyScreen.
 *
 * Props:
 * - myth      : object { id, objectName, culture, fullStory, imageUrl, funFacts[] }
 * - visible   : boolean controlling modal visibility
 * - onClose   : callback to close the modal
 *
 * Content:
 * - Hero image of the constellation/star.
 * - Object name and culture origin.
 * - Full myth story (scrollable).
 * - Fun facts section at the bottom (e.g. "Orion is visible from October to March").
 * - Share button to share the myth with friends.
 */

import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function MythDetailModal({ myth, visible, onClose }) {
  // TODO: Render hero image from myth.imageUrl.
  // TODO: Render scrollable fullStory text.
  // TODO: Render fun facts list.
  // TODO: Add share functionality using the React Native Share API.
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{myth?.objectName}</Text>
          <Text style={styles.story}>{myth?.fullStory}</Text>
        </ScrollView>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    padding: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  story: {
    color: '#ccccee',
    fontSize: 15,
    lineHeight: 24,
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
  },
  closeText: {
    color: '#7777ff',
    fontSize: 16,
  },
});
