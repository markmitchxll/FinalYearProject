/**
 * Root component of the StargazerApp.
 *
 * Three wrappers, from outermost to innermost:
 *
 * 1. <Provider>      — makes the Redux store available to every component.
 * 2. <PersistGate>   — waits for AsyncStorage to finish loading saved state
 *                      before rendering the UI, so the pet/discoveries are
 *                      restored before any screen tries to read them.
 * 3. <NavigationContainer> — required by React Navigation; holds the
 *                            navigation state for the whole app.
 */

import React, { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from './src/store/index';
import AppNavigator from './src/navigation/AppNavigator';
import { decayStats } from './src/store/petSlice';

// Custom navigation theme — extends React Navigation's built-in DarkTheme
// with our space-purple colour palette.
const StargazerTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background:  '#000000',
    card:        '#000000',
    border:      '#14143a',
    primary:     '#ffdd44',
    text:        '#ffffff',
  },
};

/**
 * AppWithStore — a small inner component that can access the Redux store.
 * I need this because useDispatch() must be called inside a <Provider>.
 *
 * Responsibility: dispatch decayStats() when the app comes back to the
 * foreground, so hunger and happiness are recalculated based on how long
 * the user was away.
 */
function AppWithStore() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Recalculate pet stats whenever the app becomes active.
    // This handles the case where the user closes the app for hours —
    // the pet will be hungry when they return.
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active') {
        dispatch(decayStats());
      }
    });

    // Also run once on first launch in case the app was closed for a long time.
    dispatch(decayStats());

    return () => subscription.remove();
  }, [dispatch]);

  return (
    <NavigationContainer theme={StargazerTheme}>
      {/* Keep the status bar light (white text) on the dark background. */}
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    // GestureHandlerRootView is required by react-native-gesture-handler,
    // which is used internally by React Navigation's stack and tab navigators.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        {/* loading={null} means show nothing while state is being restored.
            You could replace null with a splash/loading screen component. */}
        <PersistGate loading={null} persistor={persistor}>
          <AppWithStore />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
