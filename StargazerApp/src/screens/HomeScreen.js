/**
 * HomeScreen — the landing screen shown when the app opens.
 *
 * Displays:
 * - Starry background with moon.
 * - Time-based greeting and current date.
 * - Quick pet status card (stage name, hunger, happiness).
 * - A large "Launch Sky View" button to jump into the AR screen.
 * - A night-streak counter showing consecutive nights of gazing.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import StarryBackground from '../components/ui/StarryBackground';
import { XP_THRESHOLDS } from '../components/pet/PetEvolutionStage';

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Returns a greeting based on the current hour.
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5)  return 'Still up?';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

// Returns a formatted date string, e.g. "Monday 23 March".
function getDateString() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
  });
}

// Stage display names and icons.
const STAGE_INFO = {
  1: { name: 'Nebula',   icon: '✦' },
  2: { name: 'Stardust', icon: '★' },
  3: { name: 'Comet',    icon: '✸' },
  4: { name: 'Galaxy',   icon: '✺' },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const navigation = useNavigation();
  const pet        = useSelector(state => state.pet);
  const discoveries = useSelector(state => state.discoveries);

  const stage     = pet.stage ?? 1;
  const stageInfo = STAGE_INFO[stage] ?? STAGE_INFO[1];

  // XP progress towards the next evolution.
  const currentThreshold = XP_THRESHOLDS[stage - 1] ?? 0;
  const nextThreshold    = XP_THRESHOLDS[stage]     ?? XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const isMaxStage       = stage >= XP_THRESHOLDS.length;
  const xpProgress       = isMaxStage
    ? 1
    : Math.min(1, (pet.xp - currentThreshold) / (nextThreshold - currentThreshold));

  // Total objects discovered.
  const totalFound =
    Object.keys(discoveries.stars).length +
    Object.keys(discoveries.planets).length +
    Object.keys(discoveries.constellations).length;

  return (
    <StarryBackground>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.date}>{getDateString()}</Text>
          <Text style={styles.appTitle}>✦  STARGAZER</Text>
        </View>

        {/* ── Launch button ── */}
        <TouchableOpacity
          style={styles.launchButton}
          onPress={() => navigation.navigate('Sky')}
          activeOpacity={0.8}
        >
          <Text style={styles.launchIcon}>🔭</Text>
          <View>
            <Text style={styles.launchTitle}>Launch Sky View</Text>
            <Text style={styles.launchSubtitle}>Point your phone at the sky</Text>
          </View>
        </TouchableOpacity>

        {/* ── Pet status card ── */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>YOUR COMPANION</Text>

          <View style={styles.petRow}>
            <View style={styles.petIconCircle}>
              <Text style={styles.petIcon}>{stageInfo.icon}</Text>
            </View>
            <View style={styles.petInfo}>
              <Text style={styles.petStageName}>
                Stage {stage} — {stageInfo.name}
              </Text>
              <Text style={styles.petXP}>
                {pet.xp} XP{isMaxStage ? '  (Max stage!)' : `  → ${nextThreshold} XP`}
              </Text>
            </View>
          </View>

          {/* XP progress bar */}
          <View style={styles.barTrack}>
            <View style={[styles.barFill, styles.xpBar, { width: `${xpProgress * 100}%` }]} />
          </View>

          {/* Hunger + happiness bars */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Hunger</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, styles.hungerBar, { width: `${pet.hunger ?? 100}%` }]} />
              </View>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Happiness</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, styles.happyBar, { width: `${pet.happiness ?? 100}%` }]} />
              </View>
            </View>
          </View>
        </View>

        {/* ── Discoveries summary card ── */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>DISCOVERIES</Text>
          <View style={styles.discRow}>
            <DiscStat icon="★" count={Object.keys(discoveries.stars).length}         label="Stars" />
            <DiscStat icon="◉" count={Object.keys(discoveries.planets).length}       label="Planets" />
            <DiscStat icon="✦" count={Object.keys(discoveries.constellations).length} label="Constellations" />
          </View>
          {totalFound === 0 ? (
            <Text style={styles.emptyHint}>
              Head outside tonight and point your phone at the sky to make your first discovery.
            </Text>
          ) : (
            <Text style={styles.totalFound}>{totalFound} object{totalFound !== 1 ? 's' : ''} found so far</Text>
          )}
        </View>

        {/* ── How to use ── */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>HOW TO USE</Text>
          <Text style={styles.howToLine}>🔭  Open the Sky tab and point your phone upwards</Text>
          <Text style={styles.howToLine}>★   Tap glowing dots to identify stars and planets</Text>
          <Text style={styles.howToLine}>✦   Discover constellations to unlock their myths</Text>
          <Text style={styles.howToLine}>🐾  Every discovery feeds and evolves your companion</Text>
        </View>

      </ScrollView>
    </StarryBackground>
  );
}

// Small stat tile used in the discoveries summary.
function DiscStat({ icon, count, label }) {
  return (
    <View style={styles.discStat}>
      <Text style={styles.discStatIcon}>{icon}</Text>
      <Text style={styles.discStatCount}>{count}</Text>
      <Text style={styles.discStatLabel}>{label}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // ── Header ──
  header: {
    marginBottom: 28,
  },
  greeting: {
    color:        '#8888aa',
    fontSize:     14,
    letterSpacing: 1,
  },
  date: {
    color:     '#ffffff',
    fontSize:  22,
    fontWeight: 'bold',
    marginTop:  4,
  },
  appTitle: {
    color:        '#ffdd44',
    fontSize:     12,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop:     8,
  },

  // ── Launch button ──
  launchButton: {
    backgroundColor: '#ffdd44',
    borderRadius:    16,
    padding:         20,
    flexDirection:   'row',
    alignItems:      'center',
    marginBottom:    20,
    gap:             16,
  },
  launchIcon: {
    fontSize: 32,
  },
  launchTitle: {
    color:      '#000000',
    fontSize:   18,
    fontWeight: 'bold',
  },
  launchSubtitle: {
    color:    '#333333',
    fontSize: 13,
    marginTop: 2,
  },

  // ── Cards ──
  card: {
    backgroundColor: '#080818',
    borderRadius:    16,
    borderWidth:     1,
    borderColor:     '#14143a',
    padding:         18,
    marginBottom:    16,
  },
  cardLabel: {
    color:        '#555577',
    fontSize:     10,
    letterSpacing: 1.5,
    fontWeight:   'bold',
    textTransform: 'uppercase',
    marginBottom:  14,
  },

  // ── Pet card ──
  petRow: {
    flexDirection: 'row',
    alignItems:    'center',
    marginBottom:  12,
  },
  petIconCircle: {
    width:           56,
    height:          56,
    borderRadius:    28,
    backgroundColor: '#0f0f2a',
    borderWidth:     1,
    borderColor:     '#ffdd44',
    alignItems:      'center',
    justifyContent:  'center',
    marginRight:     14,
  },
  petIcon: {
    color:    '#ffdd44',
    fontSize: 24,
  },
  petInfo: {
    flex: 1,
  },
  petStageName: {
    color:      '#ffffff',
    fontSize:   16,
    fontWeight: 'bold',
  },
  petXP: {
    color:     '#8888aa',
    fontSize:  12,
    marginTop:  3,
  },
  statsRow: {
    flexDirection: 'row',
    gap:           12,
    marginTop:     10,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color:        '#8888aa',
    fontSize:     11,
    marginBottom:  4,
  },

  // ── Progress bars ──
  barTrack: {
    height:          6,
    backgroundColor: '#111130',
    borderRadius:    3,
    overflow:        'hidden',
    marginTop:       2,
  },
  barFill: {
    height:       6,
    borderRadius: 3,
  },
  xpBar: {
    backgroundColor: '#ffdd44',
  },
  hungerBar: {
    backgroundColor: '#ff7744',
  },
  happyBar: {
    backgroundColor: '#66ff88',
  },

  // ── Discoveries summary ──
  discRow: {
    flexDirection:  'row',
    justifyContent: 'space-around',
    marginBottom:   12,
  },
  discStat: {
    alignItems: 'center',
  },
  discStatIcon: {
    color:    '#ffdd44',
    fontSize: 22,
  },
  discStatCount: {
    color:      '#ffffff',
    fontSize:   24,
    fontWeight: 'bold',
    marginTop:   4,
  },
  discStatLabel: {
    color:    '#8888aa',
    fontSize: 11,
    marginTop: 2,
  },
  emptyHint: {
    color:      '#555577',
    fontSize:   12,
    fontStyle:  'italic',
    lineHeight: 18,
    textAlign:  'center',
  },
  totalFound: {
    color:     '#8888aa',
    fontSize:  12,
    textAlign: 'center',
  },

  // ── How to use ──
  howToLine: {
    color:      '#aaaacc',
    fontSize:   13,
    lineHeight: 26,
  },
});
