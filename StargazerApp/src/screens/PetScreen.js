/**
 * PetScreen — the Tamagotchi companion screen.
 *
 * Shows the pet's current evolution stage, XP progress, hunger, and
 * happiness. The user can feed or cheer the pet using the buttons at the
 * bottom.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import StarryBackground from '../components/ui/StarryBackground';
import TamagotchiPet   from '../components/pet/TamagotchiPet';
import { feedPet, petThePet } from '../store/petSlice';
import { XP_THRESHOLDS } from '../components/pet/PetEvolutionStage';

// ─── Stage definitions ────────────────────────────────────────────────────────

const STAGES = {
  1: {
    name:        'Kit',
    icon:        '🦊',
    colour:      '#ff8844',
    description: 'A tiny fox kit, just opening its eyes to the night sky for the first time.',
  },
  2: {
    name:        'Star Fox',
    icon:        '🦊',
    colour:      '#ffdd44',
    description: 'A young fox with glittering star-dusted fur, learning the constellations.',
  },
  3: {
    name:        'Comet Fox',
    icon:        '🦊',
    colour:      '#44aaff',
    description: 'A sleek fox mid-leap, a blazing comet tail streaming behind it.',
  },
  4: {
    name:        'Celestial Fox',
    icon:        '🦊',
    colour:      '#ff88ff',
    description: 'A majestic nine-tailed kitsune, each tail a different colour of the galaxy.',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function PetScreen() {
  const dispatch    = useDispatch();
  const pet         = useSelector(state => state.pet);
  const discoveries = useSelector(state => state.discoveries);

  const stage     = pet.stage ?? 1;
  const stageData = STAGES[stage] ?? STAGES[1];

  // Derive the pet's current mood from its stats.
  const mood =
    (pet.hunger    ?? 100) < 30 ? 'hungry'  :
    (pet.happiness ?? 100) > 70 ? 'happy'   :
    'idle';

  const handlePetTap = () => dispatch(petThePet());

  // XP progress to next stage.
  const currentThreshold = XP_THRESHOLDS[stage - 1] ?? 0;
  const nextThreshold    = XP_THRESHOLDS[stage]     ?? XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const isMaxStage       = stage >= XP_THRESHOLDS.length;
  const xpProgress       = isMaxStage
    ? 1
    : Math.min(1, (pet.xp - currentThreshold) / (nextThreshold - currentThreshold));

  const totalDiscoveries =
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

        {/* ── Screen title ── */}
        <Text style={styles.screenTitle}>YOUR COMPANION</Text>

        {/* ── Pet display ── */}
        <View style={styles.petDisplay}>
          <TamagotchiPet stage={stage} mood={mood} onPress={handlePetTap} />
          <Text style={[styles.stageName, { color: stageData.colour }]}>
            {stageData.name}
          </Text>
          <Text style={styles.stageNumber}>Stage {stage} of 4</Text>
          <Text style={styles.stageDesc}>{stageData.description}</Text>
        </View>

        {/* ── XP progress card ── */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardLabel}>EXPERIENCE</Text>
            <Text style={styles.xpValue}>{pet.xp} XP</Text>
          </View>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, styles.xpBar, { width: `${xpProgress * 100}%` }]} />
          </View>
          <Text style={styles.xpSubLabel}>
            {isMaxStage
              ? 'Maximum stage reached — fully evolved!'
              : `${nextThreshold - pet.xp} XP until Stage ${stage + 1}`}
          </Text>
        </View>

        {/* ── Stats card ── */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>STATS</Text>

          <StatBar
            label="Hunger"
            value={pet.hunger ?? 100}
            fillColour="#ff7744"
            lowWarning="Your companion is hungry — discover more stars!"
          />
          <StatBar
            label="Happiness"
            value={pet.happiness ?? 100}
            fillColour="#66ff88"
            lowWarning="Your companion misses you — go exploring!"
          />
        </View>

        {/* ── Interaction buttons ── */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.feedButton]}
            onPress={() => dispatch(feedPet())}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>🍖</Text>
            <Text style={styles.buttonLabel}>Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.petButton]}
            onPress={() => dispatch(petThePet())}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>✨</Text>
            <Text style={styles.buttonLabel}>Cheer</Text>
          </TouchableOpacity>
        </View>

        {/* ── Milestone card ── */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>MILESTONES</Text>
          <MilestoneRow stage={1} name="Kit"           xp={0}    current={stage} />
          <MilestoneRow stage={2} name="Star Fox"      xp={100}  current={stage} />
          <MilestoneRow stage={3} name="Comet Fox"     xp={500}  current={stage} />
          <MilestoneRow stage={4} name="Celestial Fox" xp={2000} current={stage} />
          <Text style={styles.discTotal}>
            Total discoveries: {totalDiscoveries}
          </Text>
        </View>

      </ScrollView>
    </StarryBackground>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatBar({ label, value, fillColour, lowWarning }) {
  const pct = Math.min(100, Math.max(0, value));
  const isLow = pct < 30;
  return (
    <View style={styles.statBlock}>
      <View style={styles.statLabelRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={[styles.statValue, isLow && { color: '#ff6644' }]}>
          {Math.round(pct)}%
        </Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: fillColour }]} />
      </View>
      {isLow && <Text style={styles.warningText}>{lowWarning}</Text>}
    </View>
  );
}

function MilestoneRow({ stage, name, xp, current }) {
  const unlocked = current >= stage;
  return (
    <View style={styles.milestoneRow}>
      <Text style={[styles.milestoneIcon, unlocked ? styles.milestoneUnlocked : styles.milestoneLocked]}>
        {unlocked ? STAGES[stage].icon : '○'}
      </Text>
      <View style={styles.milestoneText}>
        <Text style={[styles.milestoneName, !unlocked && styles.milestoneLocked]}>
          Stage {stage} — {name}
        </Text>
        <Text style={styles.milestoneXP}>{xp === 0 ? 'Starting stage' : `Unlocks at ${xp} XP`}</Text>
      </View>
      {unlocked && <Text style={styles.tick}>✓</Text>}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop:        60,
    paddingBottom:     40,
  },

  // ── Title ──
  screenTitle: {
    color:         '#555577',
    fontSize:      11,
    letterSpacing: 2,
    fontWeight:    'bold',
    textTransform: 'uppercase',
    textAlign:     'center',
    marginBottom:  24,
  },

  // ── Pet display ──
  petDisplay: {
    alignItems:    'center',
    marginBottom:  24,
  },
  petOrb: {
    width:           140,
    height:          140,
    borderRadius:    70,
    borderWidth:     2,
    backgroundColor: '#080818',
    alignItems:      'center',
    justifyContent:  'center',
    marginBottom:    16,
    overflow:        'hidden',
  },
  petGlow: {
    position:     'absolute',
    width:         200,
    height:        200,
    borderRadius:  100,
    opacity:       0.08,
  },
  petIcon: {
    fontSize: 64,
  },
  stageName: {
    fontSize:      26,
    fontWeight:    'bold',
    letterSpacing:  1,
  },
  stageNumber: {
    color:     '#555577',
    fontSize:  12,
    marginTop:  4,
  },
  stageDesc: {
    color:      '#8888aa',
    fontSize:   13,
    fontStyle:  'italic',
    textAlign:  'center',
    marginTop:   8,
    paddingHorizontal: 24,
    lineHeight: 19,
  },

  // ── Cards ──
  card: {
    backgroundColor: '#080818',
    borderRadius:    16,
    borderWidth:     1,
    borderColor:     '#14143a',
    padding:         18,
    marginBottom:    14,
  },
  cardHeaderRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    marginBottom:   10,
  },
  cardLabel: {
    color:         '#555577',
    fontSize:      10,
    letterSpacing:  1.5,
    fontWeight:    'bold',
    textTransform: 'uppercase',
    marginBottom:  12,
  },
  xpValue: {
    color:      '#ffdd44',
    fontSize:   14,
    fontWeight: 'bold',
  },
  xpSubLabel: {
    color:     '#8888aa',
    fontSize:  11,
    marginTop:  6,
  },

  // ── Stat bars ──
  statBlock: {
    marginBottom: 12,
  },
  statLabelRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    marginBottom:    4,
  },
  statLabel: {
    color:    '#aaaacc',
    fontSize: 13,
  },
  statValue: {
    color:      '#ffffff',
    fontSize:   13,
    fontWeight: 'bold',
  },
  barTrack: {
    height:          8,
    backgroundColor: '#111130',
    borderRadius:    4,
    overflow:        'hidden',
  },
  barFill: {
    height:       8,
    borderRadius: 4,
  },
  xpBar: {
    backgroundColor: '#ffdd44',
  },
  warningText: {
    color:     '#ff6644',
    fontSize:  11,
    marginTop:  4,
    fontStyle: 'italic',
  },

  // ── Buttons ──
  buttonRow: {
    flexDirection:  'row',
    gap:            12,
    marginBottom:   14,
  },
  actionButton: {
    flex:           1,
    borderRadius:   14,
    paddingVertical: 16,
    alignItems:     'center',
    justifyContent: 'center',
  },
  feedButton: {
    backgroundColor: '#1a0a00',
    borderWidth:     1,
    borderColor:     '#ff7744',
  },
  petButton: {
    backgroundColor: '#0a0a1a',
    borderWidth:     1,
    borderColor:     '#7777ff',
  },
  buttonIcon: {
    fontSize:     28,
    marginBottom:  4,
  },
  buttonLabel: {
    color:      '#ffffff',
    fontSize:   14,
    fontWeight: 'bold',
  },

  // ── Milestones ──
  milestoneRow: {
    flexDirection: 'row',
    alignItems:    'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#0d0d28',
  },
  milestoneIcon: {
    fontSize:     18,
    width:         28,
  },
  milestoneUnlocked: {
    color: '#ffdd44',
  },
  milestoneLocked: {
    color: '#333355',
  },
  milestoneText: {
    flex: 1,
  },
  milestoneName: {
    color:      '#ffffff',
    fontSize:   14,
    fontWeight: 'bold',
  },
  milestoneXP: {
    color:    '#555577',
    fontSize: 11,
    marginTop: 1,
  },
  tick: {
    color:    '#66ff88',
    fontSize: 16,
  },
  discTotal: {
    color:     '#8888aa',
    fontSize:  12,
    marginTop: 12,
    textAlign: 'center',
  },
});
