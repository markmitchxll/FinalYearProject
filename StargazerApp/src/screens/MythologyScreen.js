/**
 * MythologyScreen — a browsable library of all myths in the app.
 *
 * Shows every mythology entry from data/mythology.js.
 * Entries whose objects have been discovered are shown in full.
 * Entries not yet discovered are shown as locked, with a hint to
 * find them in the AR sky view.
 *
 * Organised by culture, with a search bar to filter by name.
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import StarryBackground  from '../components/ui/StarryBackground';
import MythDetailModal  from '../components/mythology/MythDetailModal';
import { mythology }     from '../data/mythology';
import { stars }         from '../data/stars';
import { planets }       from '../data/planets';
import { constellations } from '../data/constellations';

// ─── Build lookup maps ────────────────────────────────────────────────────────

const starMap          = Object.fromEntries(stars.map(s => [s.id, s]));
const planetMap        = Object.fromEntries(planets.map(p => [p.id, p]));
const constellationMap = Object.fromEntries(constellations.map(c => [c.id, c]));

// ─── Culture colours ──────────────────────────────────────────────────────────

const CULTURE_COLOUR = {
  Greek:       '#ffdd44',
  Roman:       '#ff9944',
  Egyptian:    '#44ffaa',
  Norse:       '#44aaff',
  Chinese:     '#ff4466',
  Indigenous:  '#88ff44',
};

function cultureColour(culture) {
  return CULTURE_COLOUR[culture] ?? '#aaaacc';
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MythologyScreen() {
  const [search, setSearch]         = useState('');
  const [selectedMyth, setSelectedMyth] = useState(null);
  const discoveries = useSelector(state => state.discoveries);

  const handleMythPress = useCallback((myth) => setSelectedMyth(myth), []);
  const handleModalClose = useCallback(() => setSelectedMyth(null), []);

  // Build the set of mythologyIds that the user has already unlocked.
  const unlockedIds = useMemo(() => {
    const ids = new Set();
    Object.keys(discoveries.stars).forEach(id => {
      const m = starMap[id]?.mythologyId;
      if (m) ids.add(m);
    });
    Object.keys(discoveries.planets).forEach(id => {
      const m = planetMap[id]?.mythologyId;
      if (m) ids.add(m);
    });
    Object.keys(discoveries.constellations).forEach(id => {
      const m = constellationMap[id]?.mythologyId;
      if (m) ids.add(m);
    });
    return ids;
  }, [discoveries]);

  // Filter and group mythology entries by culture.
  const allEntries = Object.values(mythology);

  const filtered = search.trim()
    ? allEntries.filter(m =>
        m.objectName.toLowerCase().includes(search.toLowerCase()) ||
        m.culture.toLowerCase().includes(search.toLowerCase())
      )
    : allEntries;

  // Group by culture.
  const byCulture = filtered.reduce((acc, myth) => {
    if (!acc[myth.culture]) acc[myth.culture] = [];
    acc[myth.culture].push(myth);
    return acc;
  }, {});

  const cultures = Object.keys(byCulture).sort();
  const total    = allEntries.length;
  const unlocked = allEntries.filter(m => unlockedIds.has(m.id)).length;

  return (
    <StarryBackground>
      <MythDetailModal
        myth={selectedMyth}
        visible={selectedMyth !== null}
        onClose={handleModalClose}
      />
      <View style={styles.container}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title}>MYTHOLOGY</Text>
          <Text style={styles.subtitle}>Ancient stories of the stars</Text>
          <Text style={styles.progress}>
            {unlocked} / {total} stories unlocked
          </Text>
        </View>

        {/* ── Unlock progress bar ── */}
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${total > 0 ? (unlocked / total) * 100 : 0}%` }]} />
        </View>

        {/* ── Search ── */}
        <View style={styles.searchRow}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search myths or cultures…"
            placeholderTextColor="#333355"
            value={search}
            onChangeText={setSearch}
            clearButtonMode="while-editing"
          />
        </View>

        {/* ── Myth list grouped by culture ── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {cultures.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📜</Text>
              <Text style={styles.emptyText}>No results for "{search}"</Text>
            </View>
          ) : (
            cultures.map(culture => (
              <View key={culture} style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={[styles.sectionDot, { backgroundColor: cultureColour(culture) }]} />
                  <Text style={[styles.sectionTitle, { color: cultureColour(culture) }]}>
                    {culture} Mythology
                  </Text>
                  <Text style={styles.sectionCount}>
                    {byCulture[culture].filter(m => unlockedIds.has(m.id)).length}/{byCulture[culture].length}
                  </Text>
                </View>

                {byCulture[culture].map(myth => {
                  const isUnlocked = unlockedIds.has(myth.id);
                  return (
                    <TouchableOpacity
                      key={myth.id}
                      style={[styles.mythCard, !isUnlocked && styles.mythCardLocked]}
                      onPress={() => isUnlocked && handleMythPress(myth)}
                      activeOpacity={isUnlocked ? 0.8 : 1}
                    >
                      <View style={styles.mythCardHeader}>
                        <Text style={[styles.mythName, !isUnlocked && styles.lockedText]}>
                          {isUnlocked ? myth.objectName : '???'}
                        </Text>
                        <View style={[styles.cultureBadge, { backgroundColor: cultureColour(culture) }]}>
                          <Text style={styles.cultureBadgeText}>{culture}</Text>
                        </View>
                      </View>

                      {isUnlocked ? (
                        <>
                          <Text style={styles.mythSummary} numberOfLines={3}>
                            {myth.shortSummary}
                          </Text>
                          {myth.funFacts?.length > 0 && (
                            <Text style={styles.funFact}>
                              ★  {myth.funFacts[0]}
                            </Text>
                          )}
                        </>
                      ) : (
                        <Text style={styles.lockedHint}>
                          🔒  Discover this object in the Sky view to unlock its story.
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>

      </View>
    </StarryBackground>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // ── Header ──
  header: {
    paddingHorizontal: 20,
    paddingTop:        60,
    paddingBottom:     12,
  },
  title: {
    color:         '#ffffff',
    fontSize:      22,
    fontWeight:    'bold',
    letterSpacing:  2,
  },
  subtitle: {
    color:     '#8888aa',
    fontSize:  13,
    marginTop:  4,
  },
  progress: {
    color:     '#ffdd44',
    fontSize:  12,
    marginTop:  6,
  },

  // ── Progress bar ──
  progressBarTrack: {
    height:          4,
    backgroundColor: '#111130',
    marginHorizontal: 20,
    borderRadius:    2,
    marginBottom:    12,
    overflow:        'hidden',
  },
  progressBarFill: {
    height:          4,
    backgroundColor: '#ffdd44',
    borderRadius:    2,
  },

  // ── Search ──
  searchRow: {
    flexDirection:   'row',
    alignItems:      'center',
    backgroundColor: '#080818',
    borderRadius:    12,
    borderWidth:     1,
    borderColor:     '#14143a',
    marginHorizontal: 20,
    marginBottom:    12,
    paddingHorizontal: 12,
    paddingVertical:  8,
  },
  searchIcon: {
    fontSize:    14,
    marginRight: 8,
  },
  searchInput: {
    flex:      1,
    color:     '#ffffff',
    fontSize:  14,
    padding:   0,
  },

  // ── Scroll ──
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom:     40,
  },

  // ── Sections ──
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection:  'row',
    alignItems:     'center',
    marginBottom:   10,
    gap:            8,
  },
  sectionDot: {
    width:        8,
    height:       8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize:      13,
    fontWeight:    'bold',
    letterSpacing:  0.8,
    textTransform: 'uppercase',
    flex:           1,
  },
  sectionCount: {
    color:    '#555577',
    fontSize: 12,
  },

  // ── Myth cards ──
  mythCard: {
    backgroundColor: '#080818',
    borderRadius:    14,
    borderWidth:     1,
    borderColor:     '#14143a',
    padding:         14,
    marginBottom:    8,
  },
  mythCardLocked: {
    opacity: 0.5,
  },
  mythCardHeader: {
    flexDirection:  'row',
    alignItems:     'flex-start',
    justifyContent: 'space-between',
    marginBottom:   8,
    gap:            8,
  },
  mythName: {
    color:      '#ffffff',
    fontSize:   15,
    fontWeight: 'bold',
    flex:        1,
  },
  lockedText: {
    color: '#444466',
  },
  cultureBadge: {
    borderRadius:    6,
    paddingHorizontal: 7,
    paddingVertical:  2,
    alignSelf:       'flex-start',
  },
  cultureBadgeText: {
    color:      '#000000',
    fontSize:   9,
    fontWeight: 'bold',
  },
  mythSummary: {
    color:      '#9999bb',
    fontSize:   13,
    lineHeight: 19,
    marginBottom: 8,
  },
  funFact: {
    color:      '#ffdd44',
    fontSize:   11,
    fontStyle:  'italic',
    lineHeight: 16,
  },
  lockedHint: {
    color:    '#444466',
    fontSize: 12,
    fontStyle: 'italic',
  },

  // ── Empty state ──
  emptyContainer: {
    alignItems:   'center',
    paddingTop:   60,
  },
  emptyIcon: {
    fontSize:     40,
    marginBottom: 12,
  },
  emptyText: {
    color:    '#555577',
    fontSize: 14,
  },

  bottomSpacer: {
    height: 20,
  },
});
