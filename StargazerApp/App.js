/**
 * Root component of the StargazerApp.
 *
 * Responsibilities:
 * - Wraps the app in the Redux store Provider so all screens can access state.
 * - Wraps the app in NavigationContainer from React Navigation.
 * - Renders the AppNavigator which defines the bottom tab and stack structure.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store/index';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    // TODO: Add store
    // TODO: Add NavigationContainer
    // TODO: Render AppNavigator
    null
  );
}
