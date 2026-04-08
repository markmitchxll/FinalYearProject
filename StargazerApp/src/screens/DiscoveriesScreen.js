/**
 * DiscoveriesScreen — the user's personal star catalogue.
 *
 * Shows everything discovered so far, split across three tabs:
 * Stars, Planets, and Constellations.
 *
 * Each entry shows the object name, discovery date, and myth teaser.
 * Data comes from Redux discoveriesSlice, with names looked up from the
 * local data files.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import StarryBackground  from '../components/ui/StarryBackground';
import { stars }         from '../data/stars';
import { planets }       from '../data/planets';
import { constellations } from '../data/constellations';
import { mythology }     from '../data/mythology';

// ─── Data lookup maps ─────────────────────────────────────────────────────────

const starMap         = Object.fromEntries(stars.map(s => [s.id, s]));
const planetMap       = Object.fromEntries(planets.map(p => [p.id, p]));
const constellationMap = Object.fromEntries(constellations.map(c => [c.id, c]));

// Formats a Unix timestamp into a readable string, e.g. "23 Mar 2025".
function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

// Converts a snake_case id to Title Case if no name is found in data.
function idToTitle(id) {
  return id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS = [
  { key: 'stars',          label: 'Stars',          icon: '★', colour: '#ffdd44' },
  { key: 'planets',        label: 'Planets',        icon: '◉', colour: '#44aaff' },
  { key: 'constellations', label: 'Constellations', icon: '✦', colour: '#aa55ff' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DiscoveriesScreen() {
  const [activeTab, setActiveTab] = useState('stars');
  const discoveries = useSelector(state => state.discoveries);

  // Build the list items for the active tab.
  const items = Object.entries(discoveries[activeTab] ?? {}).map(([id, data]) => {
    let obj;
    if (activeTab === 'stars')          obj = starMap[id];
    if (activeTab === 'planets')        obj = planetMap[id];
    if (activeTab === 'constellations') obj = constellationMap[id];

    const name      = obj?.name ?? idToTitle(id);
    const mythId    = obj?.mythologyId;
    const myth      = mythId ? mythology[mythId] : null;
    const tab       = TABS.find(t => t.key === activeTab);

    return {
      id,
      name,
      discoveredAt: data.discoveredAt,
      mythTeaser:   myth?.shortSummary ?? null,
      culture:      myth?.culture      ?? null,
      icon:         tab?.icon          ?? '✦',
      colour:       tab?.colour        ?? '#ffffff',
    };
  }).sort((a, b) => b.discoveredAt - a.discoveredAt); // newest first

  const totalFound =
    Object.keys(discoveries.stars).length +
    Object.keys(discoveries.planets).length +
    Object.keys(discoveries.constellations).length;

  const activeTabData = TABS.find(t => t.key === activeTab);

  return (
    <StarryBackground>
      <View style={styles.container}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title}>DISCOVERIES</Text>
          <Text style={styles.subtitle}>
            {totalFound === 0
              ? 'Nothing found yet — point your phone at the sky!'
              : `${totalFound} object${totalFound !== 1 ? 's' : ''} discovered`}
          </Text>
        </View>

        {/* ── Tabs ── */}
        <View style={styles.tabs}>
          {TABS.map(tab => {
            const count    = Object.keys(discoveries[tab.key] ?? {}).length;
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, isActive && { borderBottomColor: tab.colour, borderBottomWidth: 2 }]}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabIcon, isActive && { color: tab.colour }]}>
                  {tab.icon}
                </Text>
                <Text style={[styles.tabLabel, isActive && { color: '#ffffff' }]}>
                  {tab.label}
                </Text>
                {count > 0 && (
                  <View style={[styles.tabBadge, { backgroundColor: tab.colour }]}>
                    <Text style={styles.tabBadgeText}>{count}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── List ── */}
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>{activeTabData?.icon}</Text>
            <Text style={styles.emptyTitle}>No {activeTabData?.label.toLowerCase()} found yet</Text>
            <Text style={styles.emptyHint}>
              Open the Sky tab and point your phone upwards to discover {activeTabData?.label.toLowerCase()}.
            </Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={[styles.itemIconCircle, { borderColor: item.colour }]}>
                  <Text style={[styles.itemIcon, { color: item.colour }]}>{item.icon}</Text>
                </View>
                <View style={styles.itemBody}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDate}>Discovered {formatDate(item.discoveredAt)}</Text>
                  {item.culture && (
                    <Text style={styles.itemCulture}>{item.culture} mythology</Text>
                  )}
                  {item.mythTeaser && (
                    <Text style={styles.itemTeaser} numberOfLines={2}>
                      {item.mythTeaser}
                    </Text>
                  )}
                </View>
              </View>
            )}
          />
        )}

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
    paddingBottom:     16,
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

  // ── Tabs ──
  tabs: {
    flexDirection:   'row',
    borderBottomWidth: 1,
    borderBottomColor: '#14143a',
    marginHorizontal: 20,
    marginBottom:    4,
  },
  tab: {
    flex:            1,
    alignItems:      'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    flexDirection:   'row',
    justifyContent:  'center',
    gap:             4,
  },
  tabIcon: {
    color:    '#333355',
    fontSize: 14,
  },
  tabLabel: {
    color:    '#555577',
    fontSize: 12,
  },
  tabBadge: {
    borderRadius:    8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft:      2,
  },
  tabBadgeText: {
    color:      '#000000',
    fontSize:   9,
    fontWeight: 'bold',
  },

  // ── Empty state ──
  emptyContainer: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize:     48,
    color:        '#222244',
    marginBottom: 16,
  },
  emptyTitle: {
    color:      '#555577',
    fontSize:   16,
    fontWeight: 'bold',
    textAlign:  'center',
    marginBottom: 8,
  },
  emptyHint: {
    color:      '#333355',
    fontSize:   13,
    fontStyle:  'italic',
    textAlign:  'center',
    lineHeight: 19,
  },

  // ── List items ──
  list: {
    paddingHorizontal: 20,
    paddingTop:        8,
    paddingBottom:     40,
  },
  itemCard: {
    flexDirection:   'row',
    backgroundColor: '#080818',
    borderRadius:    14,
    borderWidth:     1,
    borderColor:     '#14143a',
    padding:         14,
    marginBottom:    10,
    alignItems:      'flex-start',
  },
  itemIconCircle: {
    width:           44,
    height:          44,
    borderRadius:    22,
    backgroundColor: '#0d0d28',
    borderWidth:     1,
    alignItems:      'center',
    justifyContent:  'center',
    marginRight:     12,
    flexShrink:      0,
  },
  itemIcon: {
    fontSize: 20,
  },
  itemBody: {
    flex: 1,
  },
  itemName: {
    color:      '#ffffff',
    fontSize:   16,
    fontWeight: 'bold',
  },
  itemDate: {
    color:     '#555577',
    fontSize:  11,
    marginTop:  2,
  },
  itemCulture: {
    color:      '#7777ff',
    fontSize:   10,
    letterSpacing: 0.8,
    marginTop:  4,
    textTransform: 'uppercase',
  },
  itemTeaser: {
    color:      '#8888aa',
    fontSize:   12,
    fontStyle:  'italic',
    marginTop:   4,
    lineHeight: 17,
  },
});
