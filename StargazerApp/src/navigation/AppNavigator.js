/**
 * AppNavigator — defines the full navigation structure of the app.
 *
 * Structure:
 *  Bottom Tab Navigator
 *  ├── Home        — landing page / nightly summary
 *  ├── Sky         — live AR camera view of the sky  ← main feature
 *  ├── Pet         — Tamagotchi pet
 *  ├── Discoveries — catalogue of everything the user has found
 *  └── Mythology   — browse all myths and stories
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen        from '../screens/HomeScreen';
import ARSkyScreen       from '../screens/ARSkyScreen';
import PetScreen         from '../screens/PetScreen';
import DiscoveriesScreen from '../screens/DiscoveriesScreen';
import MythologyScreen   from '../screens/MythologyScreen';

const Tab = createBottomTabNavigator();

// Icon names from MaterialCommunityIcons for each tab.
const TAB_ICONS = {
  Home:        'home-outline',
  Sky:         'telescope',
  Pet:         'star-face',
  Discoveries: 'book-open-variant',
  Mythology:   'scroll-text',
};

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        // Hide the default header bar — each screen manages its own title if needed.
        headerShown: false,

        // Tab bar styling — dark space theme to match the rest of the app.
        tabBarStyle: {
          backgroundColor: '#0a0a1a',
          borderTopColor: '#1a1a3e',
          borderTopWidth: 1,
          paddingBottom: 4,
          height: 60,
        },
        tabBarActiveTintColor:   '#7777ff', // Purple/blue when selected.
        tabBarInactiveTintColor: '#444466', // Dim when not selected.
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 4,
        },

        // Render the correct icon for each tab.
        tabBarIcon: ({ color, size }) => (
          <Icon name={TAB_ICONS[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home"        component={HomeScreen} />
      <Tab.Screen name="Sky"         component={ARSkyScreen} />
      <Tab.Screen name="Pet"         component={PetScreen} />
      <Tab.Screen name="Discoveries" component={DiscoveriesScreen} />
      <Tab.Screen name="Mythology"   component={MythologyScreen} />
    </Tab.Navigator>
  );
}
