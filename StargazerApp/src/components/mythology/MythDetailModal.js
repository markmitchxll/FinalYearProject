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
 * - Hero banner with object name and culture origin.
 * - Full myth story (scrollable).
 * - Fun facts section at the bottom.
 * - Share button using the React Native Share API.
 */

import React, { useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Culture → hero banner colour (matches MythCard).
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

export default function MythDetailModal({ myth, visible, onClose }) {
  const cultureColour = getCultureColour(myth?.culture);

  // ── Share ──────────────────────────────────────────────────────────────────
  const handleShare = useCallback(async () => {
    if (!myth) return;
    try {
      await Share.share({
        title:   myth.objectName,
        message: `${myth.objectName} — ${myth.culture} mythology\n\n${myth.shortSummary}\n\nDiscover more in the StargazerApp!`,
      });
    } catch {
      // Share dialog dismissed — nothing to do.
    }
  }, [myth]);

  // ── Guard ──────────────────────────────────────────────────────────────────
  if (!myth) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>

        {/* ── Header bar ── */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.shareIcon}>↑</Text>
            <Text style={styles.shareLabel}>Share</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* ── Hero banner ── */}
          <View style={[styles.heroBanner, { backgroundColor: cultureColour }]}>
            <View style={[styles.cultureBadge, { borderColor: 'rgba(255,255,255,0.4)' }]}>
              <Text style={styles.cultureText}>{myth.culture}</Text>
            </View>
            <Text style={styles.heroTitle}>{myth.objectName}</Text>
          </View>

          {/* ── Full story ── */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>THE MYTH</Text>
            <Text style={styles.storyText}>{myth.fullStory}</Text>
          </View>

          {/* ── Fun facts ── */}
          {myth.funFacts && myth.funFacts.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>DID YOU KNOW</Text>
              {myth.funFacts.map((fact, index) => (
                <View key={index} style={styles.factRow}>
                  <Text style={[styles.factBullet, { color: cultureColour }]}>✦</Text>
                  <Text style={styles.factText}>{fact}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Bottom padding so last content isn't hidden behind safe area */}
          <View style={{ height: 32 }} />
        </ScrollView>

      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex:            1,
    backgroundColor: '#0a0a1a',
  },

  // ── Header bar ──
  headerBar: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    paddingHorizontal: 16,
    paddingVertical:    12,
    borderBottomWidth:  1,
    borderBottomColor:  '#1a1a30',
  },
  closeButton: {
    padding: 6,
  },
  closeIcon: {
    color:    '#8888aa',
    fontSize: 18,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:            6,
    paddingHorizontal: 12,
    paddingVertical:    6,
    borderRadius:       20,
    borderWidth:        1,
    borderColor:        '#333355',
  },
  shareIcon: {
    color:      '#7777ff',
    fontSize:   14,
    fontWeight: '700',
  },
  shareLabel: {
    color:    '#7777ff',
    fontSize: 13,
  },

  // ── Scroll ──
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // ── Hero ──
  heroBanner: {
    paddingHorizontal: 20,
    paddingTop:        28,
    paddingBottom:     24,
    gap:               10,
  },
  cultureBadge: {
    alignSelf:         'flex-start',
    paddingHorizontal: 10,
    paddingVertical:    4,
    borderRadius:      20,
    borderWidth:        1,
  },
  cultureText: {
    color:         'rgba(255,255,255,0.85)',
    fontSize:      10,
    fontWeight:    '600',
    letterSpacing:  1,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color:      '#ffffff',
    fontSize:   28,
    fontWeight: '700',
    lineHeight: 34,
    textShadowColor:  'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius:  6,
  },

  // ── Sections ──
  section: {
    paddingHorizontal: 20,
    paddingTop:        24,
    gap:               12,
  },
  sectionLabel: {
    color:         '#444466',
    fontSize:       10,
    fontWeight:    '700',
    letterSpacing:  2,
    textTransform: 'uppercase',
  },
  storyText: {
    color:      '#ccccee',
    fontSize:   15,
    lineHeight: 26,
  },

  // ── Fun facts ──
  factRow: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    gap:            10,
  },
  factBullet: {
    fontSize:   12,
    marginTop:   4,
  },
  factText: {
    flex:       1,
    color:      '#9999bb',
    fontSize:   14,
    lineHeight: 22,
  },
});
