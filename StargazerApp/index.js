/**
 * Entry point for the StargazerApp React Native application.
 * Registers the root App component with React Native's AppRegistry.
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
