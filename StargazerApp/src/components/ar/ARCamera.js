/**
 * ARCamera — wraps the device camera and provides a full-screen live view.
 *
 * This is the base layer of the AR experience. Other overlay components
 * (StarMarker, ConstellationLines, PlanetMarker) are rendered as children
 * on top of this camera feed using absolute positioning.
 *
 * Props:
 * - onCameraReady : callback fired when the camera has initialised
 * - children      : overlay components to render on top of the camera feed
 *
 * Uses the react-native-vision-camera library.
 * Requires camera permission to be granted before rendering.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ARCamera({ onCameraReady, children }) {
  // TODO: Use useCameraPermission() from react-native-vision-camera.
  // TODO: Use useCameraDevice('back') to get the rear camera.
  // TODO: Render <Camera> filling the screen.
  // TODO: Render children in an absolute-positioned overlay View.
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
