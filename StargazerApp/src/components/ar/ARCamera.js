/**
 * ARCamera — wraps the device camera and provides a full-screen live view.
 *
 * This is the base layer of the AR experience. Star, planet, and constellation
 * overlay components are rendered as children on top of the camera feed using
 * absolute positioning.
 *
 * Props:
 * - onCameraReady : optional callback fired when the camera has initialised
 * - children      : overlay components rendered on top of the camera feed
 */

import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

export default function ARCamera({ onCameraReady, children }) {
  // Get the rear-facing camera device.
  // Returns undefined if the device has no back camera (very rare).
  const device = useCameraDevice('back');

  // Check whether camera permission has been granted.
  // ARSkyScreen requests permission before rendering this component, so by
  // the time I get here it should already be granted — but I check anyway
  // as a safety net.
  const { hasPermission } = useCameraPermission();

  const handleInitialised = useCallback(() => {
    if (onCameraReady) onCameraReady();
  }, [onCameraReady]);

  // --- Error states ---
  if (!hasPermission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Camera permission is required for the sky view.</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.errorContainer}>
        <ActivityIndicator color="#7777ff" size="large" />
        <Text style={styles.errorText}>Looking for camera…</Text>
      </View>
    );
  }

  // --- Main render ---
  return (
    <View style={styles.container}>

      {/* Full-screen live camera feed — the base layer of the AR view. */}
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        onInitialized={handleInitialised}
      />

      {/* Overlay layer — star/planet/constellation markers sit on top of
          the camera feed. absoluteFill makes this layer the same size as
          the camera, and pointerEvents="box-none" lets taps pass through
          the transparent parts of the overlay to the markers below. */}
      <View style={styles.overlay} pointerEvents="box-none">
        {children}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    color: '#aaaacc',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
