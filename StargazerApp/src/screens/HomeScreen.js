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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import StarryBackground from '../components/ui/StarryBackground';
import { XP_THRESHOLDS } from '../components/pet/PetEvolutionStage';
import { stars }         from '../data/stars';
import { planets }       from '../data/planets';
import { constellations } from '../data/constellations';
import { mythology }     from '../data/mythology';

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

// Stage display names and icons — kept in sync with PetScreen.js STAGES.
const STAGE_INFO = {
  1: { name: 'Kit',           icon: '🦊', colour: '#ff8844' },
  2: { name: 'Star Fox',      icon: '🦊', colour: '#ffdd44' },
  3: { name: 'Comet Fox',     icon: '🦊', colour: '#44aaff' },
  4: { name: 'Celestial Fox', icon: '🦊', colour: '#ff88ff' },
};

// ─── Daily quest ─────────────────────────────────────────────────────────────

// Build a flat list of all discoverable objects with their type.
const ALL_OBJECTS = [
  ...stars.map(s => ({ ...s, type: 'star' })),
  ...planets.map(p => ({ ...p, type: 'planet' })),
  ...constellations.map(c => ({ ...c, type: 'constellation' })),
];

const TYPE_LABEL = { star: 'Star', planet: 'Planet', constellation: 'Constellation' };
const TYPE_COLOUR = { star: '#ffdd44', planet: '#44aaff', constellation: '#aa55ff' };

/**
 * Returns today's quest target — one undiscovered object chosen
 * deterministically from the current date so it stays consistent all day
 * but rotates tomorrow.
 *
 * Returns null if everything has been discovered.
 */
function getDailyQuest(discoveries) {
  const undiscovered = ALL_OBJECTS.filter(obj => {
    if (obj.type === 'star')          return !discoveries.stars[obj.id];
    if (obj.type === 'planet')        return !discoveries.planets[obj.id];
    if (obj.type === 'constellation') return !discoveries.constellations[obj.id];
    return false;
  });

  if (undiscovered.length === 0) return null;

  // Use day-of-year as a stable daily seed.
  const now = new Date();
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return undiscovered[dayOfYear % undiscovered.length];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const insets     = useSafeAreaInsets();
  const navigation = useNavigation();
  const pet        = useSelector(state => state.pet);
  const discoveries = useSelector(state => state.discoveries);

  const stage     = pet.stage ?? 1;
  const stageInfo = STAGE_INFO[stage] ?? STAGE_INFO[1];
  const stageColour = stageInfo.colour;

  // XP progress towards the next evolution.
  const currentThreshold = XP_THRESHOLDS[stage - 1] ?? 0;
  const nextThreshold    = XP_THRESHOLDS[stage]     ?? XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const isMaxStage       = stage >= XP_THRESHOLDS.length;
  const xpProgress       = isMaxStage
    ? 1
    : Math.min(1, (pet.xp - currentThreshold) / (nextThreshold - currentThreshold));

  // Today's quest target.
  const questTarget   = getDailyQuest(discoveries);
  const questComplete = questTarget
    ? (() => {
        if (questTarget.type === 'star')          return !!discoveries.stars[questTarget.id];
        if (questTarget.type === 'planet')        return !!discoveries.planets[questTarget.id];
        if (questTarget.type === 'constellation') return !!discoveries.constellations[questTarget.id];
        return false;
      })()
    : true;

  // Pick a hint for the quest — mythology summary, planet funFact, or distance.
  const questHint = questTarget
    ? (mythology[questTarget.mythologyId]?.shortSummary
        ?? questTarget.funFacts?.[0]
        ?? (questTarget.distanceLy ? `${questTarget.distanceLy} light years away` : ''))
    : '';

  // Total objects discovered.
  const totalFound =
    Object.keys(discoveries.stars).length +
    Object.keys(discoveries.planets).length +
    Object.keys(discoveries.constellations).length;

  return (
    <StarryBackground>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: 90 + insets.bottom }]}
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
            <View style={[styles.petIconCircle, { borderColor: stageColour }]}>
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
              <Text style={styles.statLabel}>Curiosity</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, styles.curiosityBar, { width: `${pet.curiosity ?? 40}%` }]} />
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

        {/* ── Daily quest card ── */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>TONIGHT'S QUEST</Text>

          {questTarget === null ? (
            <View style={styles.questRow}>
              <Text style={styles.questFox}>🦊</Text>
              <Text style={styles.questComplete}>
                Kit is amazed — you've discovered everything! You're a true stargazer.
              </Text>
            </View>
          ) : questComplete ? (
            <View style={styles.questRow}>
              <Text style={styles.questFox}>🦊</Text>
              <View style={styles.questInfo}>
                <Text style={styles.questCompleteText}>✓  You found it! Kit is thrilled!</Text>
                <Text style={styles.questName}>{questTarget.name}</Text>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.questRow}>
                <Text style={styles.questFox}>🦊</Text>
                <View style={styles.questInfo}>
                  <Text style={styles.questPrompt}>Tonight, Kit wants to find…</Text>
                  <View style={styles.questNameRow}>
                    <Text style={styles.questName}>{questTarget.name}</Text>
                    <View style={[styles.questBadge, { backgroundColor: TYPE_COLOUR[questTarget.type] }]}>
                      <Text style={styles.questBadgeText}>{TYPE_LABEL[questTarget.type]}</Text>
                    </View>
                  </View>
                </View>
              </View>
              {questHint ? (
                <Text style={styles.questHint} numberOfLines={2}>{questHint}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.questButton}
                onPress={() => navigation.navigate('Sky')}
                activeOpacity={0.8}
              >
                <Text style={styles.questButtonText}>🔭  Find it in the Sky view</Text>
              </TouchableOpacity>
            </>
          )}
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
    paddingBottom: 90,
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
    fontSize: 28,
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
  curiosityBar: {
    backgroundColor: '#aa66ff',
  },
  happyBar: {
    backgroundColor: '#66ff88',
  },

  // ── Daily quest ──
  questRow: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    marginBottom:  10,
    gap:           10,
  },
  questFox: {
    fontSize: 28,
  },
  questInfo: {
    flex: 1,
  },
  questPrompt: {
    color:     '#8888aa',
    fontSize:  12,
    marginBottom: 4,
  },
  questNameRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
    flexWrap:      'wrap',
  },
  questName: {
    color:      '#ffffff',
    fontSize:   18,
    fontWeight: 'bold',
  },
  questBadge: {
    borderRadius:      6,
    paddingHorizontal: 7,
    paddingVertical:   2,
  },
  questBadgeText: {
    color:      '#000000',
    fontSize:   9,
    fontWeight: 'bold',
  },
  questHint: {
    color:      '#9999bb',
    fontSize:   12,
    fontStyle:  'italic',
    lineHeight: 18,
    marginBottom: 12,
  },
  questButton: {
    backgroundColor: '#0d0d28',
    borderRadius:    10,
    borderWidth:     1,
    borderColor:     '#333366',
    paddingVertical:  10,
    alignItems:      'center',
  },
  questButtonText: {
    color:      '#aaaaff',
    fontSize:   13,
    fontWeight: '600',
  },
  questComplete: {
    color:      '#66ff88',
    fontSize:   13,
    lineHeight: 19,
    flex:       1,
  },
  questCompleteText: {
    color:      '#66ff88',
    fontSize:   13,
    fontWeight: 'bold',
    marginBottom: 4,
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
