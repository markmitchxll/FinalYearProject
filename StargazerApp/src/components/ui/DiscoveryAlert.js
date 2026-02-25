/**
 * DiscoveryAlert — an animated pop-up shown when the user finds something new.
 *
 * Triggered from ARSkyScreen when a tapped object is not yet in the
 * user's discoveries list.
 *
 * Props:
 * - discovery  : object { name, type, xpAwarded, mythTeaser }
 * - visible    : boolean
 * - onDismiss  : callback when the alert is dismissed or times out
 *
 * Behaviour:
 * - Slides in from the top with a star-burst animation.
 * - Shows the object name, type, XP awarded, and a one-line myth teaser.
 * - Automatically dismisses after 4 seconds, or on tap.
 * - Plays the discovery sound from assets/sounds/discovery.mp3.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DiscoveryAlert({ discovery, visible, onDismiss }) {
  // TODO: Use react-native-reanimated to slide in from top.
  // TODO: Auto-dismiss with setTimeout after 4 seconds (clear on unmount).
  // TODO: Play discovery sound using a sound library.
  if (!visible) return null;
  return (
    <TouchableOpacity style={styles.container} onPress={onDismiss}>
      <Text style={styles.title}>New Discovery!</Text>
      <Text style={styles.name}>{discovery?.name}</Text>
      <Text style={styles.xp}>+{discovery?.xpAwarded} XP</Text>
      <Text style={styles.teaser}>{discovery?.mythTeaser}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: '#1a1a3e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#5555ff',
  },
  title: {
    color: '#ffdd88',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  name: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  xp: {
    color: '#88ff88',
    fontSize: 14,
  },
  teaser: {
    color: '#aaaacc',
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
});
