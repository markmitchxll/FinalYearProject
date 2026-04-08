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

        // Tab bar styling — pure black space theme.
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor:  '#14143a',
          borderTopWidth:  1,
          paddingBottom:   6,
          paddingTop:      4,
          height:          62,
        },
        tabBarActiveTintColor:   '#ffdd44', // Star gold when selected.
        tabBarInactiveTintColor: '#2a2a4a', // Very dim when not selected.
        tabBarLabelStyle: {
          fontSize:   10,
          marginBottom: 2,
          letterSpacing: 0.5,
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
