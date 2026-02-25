/**
 * ARSkyScreen — the core AR experience screen.
 *
 * How it works:
 * 1. On mount, requests camera + location permissions.
 * 2. Gets the user's GPS position via LocationService.
 * 3. Subscribes to CompassService for live heading + pitch updates.
 * 4. On every orientation update, calls CelestialService to get which
 *    stars/planets/constellations are currently in the camera frame.
 * 5. Renders ARCamera with StarMarker, PlanetMarker, and ConstellationLines
 *    positioned as overlays using screen pixel coordinates.
 * 6. Tapping a marker opens StarInfoPanel with details + myth teaser.
 * 7. If the tapped object is new, dispatches discovery + XP actions to
 *    Redux and shows DiscoveryAlert.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Services
import {
  requestPermission as requestLocationPermission,
  getCurrentLocation,
  watchLocation,
} from '../services/LocationService';
import { startSensors } from '../services/CompassService';
import { requestCameraPermission } from '../services/ARService';
import { getObjectsInDirection, altAzToScreenPosition } from '../services/CelestialService';

// AR overlay components
import ARCamera from '../components/ar/ARCamera';
import StarMarker from '../components/ar/StarMarker';
import PlanetMarker from '../components/ar/PlanetMarker';
import ConstellationLines from '../components/ar/ConstellationLines';
import CompassOverlay from '../components/ui/CompassOverlay';

// UI components
import StarInfoPanel from '../components/ui/StarInfoPanel';
import DiscoveryAlert from '../components/ui/DiscoveryAlert';
import MythDetailModal from '../components/mythology/MythDetailModal';

// Redux
import { discoverStar, discoverPlanet, discoverConstellation, isFirstDiscoveryTonight } from '../store/discoveriesSlice';
import { addXP } from '../store/petSlice';
import { XP_AWARDS } from '../components/pet/PetEvolutionStage';

// Data
import { mythology } from '../data/mythology';

// The camera's horizontal field of view in degrees.
// 60° is a reasonable default for most phones.
const FOV_DEGREES = 60;

// Maps the object's type string to the correct key in the discoveries Redux state.
const DISCOVERY_STATE_KEY = {
  star:          'stars',
  planet:        'planets',
  constellation: 'constellations',
};

export default function ARSkyScreen({ navigation }) {
  const dispatch    = useDispatch();
  const discoveries = useSelector(state => state.discoveries);
  const isFirstTonight = useSelector(isFirstDiscoveryTonight);

  // Current screen size (used to convert sky angles to pixel positions).
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // --- Setup state ---
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [permissionError,    setPermissionError]    = useState(null);

  // --- Live sensor data ---
  const [orientation, setOrientation] = useState({ heading: 0, pitch: 45, roll: 0 });

  // Objects currently visible inside the camera's field of view.
  const [objectsInFrame, setObjectsInFrame] = useState({ stars: [], planets: [], constellations: [] });

  // --- UI state ---
  const [selectedObject,    setSelectedObject]    = useState(null);  // tapped marker
  const [discovery,         setDiscovery]         = useState(null);  // most recent new find
  const [showDiscoveryAlert, setShowDiscoveryAlert] = useState(false);
  const [showMythModal,     setShowMythModal]     = useState(false);

  // We store location in a ref as well as state so the sensor callback can
  // always read the latest coordinates without being re-subscribed every time
  // the location changes.
  const locationRef = useRef(null);

  // ─── Step 1: Request permissions and get initial GPS fix ─────────────────────
  useEffect(() => {
    async function setup() {
      const cameraGranted   = await requestCameraPermission();
      const locationGranted = await requestLocationPermission();

      if (!cameraGranted || !locationGranted) {
        setPermissionError(
          'Stargazer needs access to your camera and location to show you the sky.'
        );
        return;
      }

      try {
        const coords = await getCurrentLocation();
        locationRef.current = coords;
        setPermissionsGranted(true);
      } catch (err) {
        setPermissionError(
          'Could not get your location. Please check that GPS is enabled and try again.'
        );
      }
    }

    setup();
  }, []);

  // ─── Step 2: Keep GPS position updated as the user moves ─────────────────────
  useEffect(() => {
    if (!permissionsGranted) return;

    const stopWatching = watchLocation(
      coords => { locationRef.current = coords; },
      err    => console.warn('Location watch error:', err.message),
    );

    return stopWatching;
  }, [permissionsGranted]);

  // ─── Step 3: Subscribe to compass + tilt sensors ─────────────────────────────
  // Every time the phone moves, recompute which objects are in frame and
  // update the overlay positions.
  useEffect(() => {
    if (!permissionsGranted) return;

    const stopSensors = startSensors(
      newOrientation => {
        setOrientation(newOrientation);

        if (!locationRef.current) return;

        const { latitude, longitude } = locationRef.current;
        const { heading, pitch }      = newOrientation;

        const inFrame = getObjectsInDirection(
          latitude,
          longitude,
          heading,
          pitch,
          FOV_DEGREES,
        );

        setObjectsInFrame(inFrame);
      },
      err => console.warn('Sensor error:', err.message),
    );

    return stopSensors;
  }, [permissionsGranted]);

  // ─── Handle tapping a marker ─────────────────────────────────────────────────
  const handleObjectPress = useCallback(obj => {
    setSelectedObject(obj);

    // Check whether the user has already found this object before.
    const stateKey    = DISCOVERY_STATE_KEY[obj.type];
    const alreadyFound = !!discoveries[stateKey]?.[obj.id];
    if (alreadyFound) return;

    // Work out the XP to award.
    let xpAwarded = XP_AWARDS[obj.type] ?? 0;
    if (isFirstTonight) {
      xpAwarded += XP_AWARDS.firstOfNight; // Bonus XP for the first find each night.
    }

    // Record the discovery and award XP in Redux.
    if      (obj.type === 'star')          dispatch(discoverStar(obj.id));
    else if (obj.type === 'planet')        dispatch(discoverPlanet(obj.id));
    else if (obj.type === 'constellation') dispatch(discoverConstellation(obj.id));
    dispatch(addXP(xpAwarded));

    // Show the discovery pop-up.
    const myth = mythology[obj.mythologyId];
    setDiscovery({
      name:       obj.name,
      type:       obj.type,
      xpAwarded,
      mythTeaser: myth?.shortSummary ?? '',
    });
    setShowDiscoveryAlert(true);
  }, [dispatch, discoveries, isFirstTonight]);

  // ─── Convert a sky object's Alt/Az into screen pixel coordinates ─────────────
  function toScreenPos(obj) {
    return altAzToScreenPosition(
      obj.altitude,
      obj.azimuth,
      orientation.heading,
      orientation.pitch,
      screenWidth,
      screenHeight,
      FOV_DEGREES,
    );
  }

  // Pre-compute screen positions for all visible stars so ConstellationLines
  // can look them up by ID without doing extra calculations.
  const starScreenPositions = {};
  for (const star of objectsInFrame.stars) {
    starScreenPositions[star.id] = toScreenPos(star);
  }

  // ─── Render: error / loading states ──────────────────────────────────────────
  if (permissionError) {
    return (
      <View style={styles.centredContainer}>
        <Text style={styles.errorText}>{permissionError}</Text>
      </View>
    );
  }

  if (!permissionsGranted) {
    return (
      <View style={styles.centredContainer}>
        <Text style={styles.loadingText}>Getting your location…</Text>
      </View>
    );
  }

  // ─── Render: main AR view ─────────────────────────────────────────────────────
  return (
    <View style={styles.container}>

      {/* Live camera feed — all overlays are rendered as children on top of it */}
      <ARCamera>

        {/* Constellation stick-figure lines — drawn first so they sit behind markers */}
        {objectsInFrame.constellations.map(con => (
          <ConstellationLines
            key={con.id}
            constellation={con}
            starScreenPositions={starScreenPositions}
            onPress={handleObjectPress}
          />
        ))}

        {/* Star markers */}
        {objectsInFrame.stars.map(star => {
          const { x, y } = toScreenPos(star);
          return (
            <StarMarker
              key={star.id}
              star={star}
              screenX={x}
              screenY={y}
              onPress={handleObjectPress}
            />
          );
        })}

        {/* Planet markers */}
        {objectsInFrame.planets.map(planet => {
          const { x, y } = toScreenPos(planet);
          return (
            <PlanetMarker
              key={planet.id}
              planet={planet}
              screenX={x}
              screenY={y}
              onPress={handleObjectPress}
            />
          );
        })}

        {/* Cardinal direction labels (N, NE, E, …) along the horizon line */}
        <CompassOverlay heading={orientation.heading} />

      </ARCamera>

      {/* Discovery alert — slides in from the top when the user finds something new */}
      <DiscoveryAlert
        discovery={discovery}
        visible={showDiscoveryAlert}
        onDismiss={() => setShowDiscoveryAlert(false)}
      />

      {/* Info panel — slides up from the bottom when the user taps any marker */}
      {selectedObject && (
        <StarInfoPanel
          object={selectedObject}
          onClose={() => setSelectedObject(null)}
          onReadMore={() => setShowMythModal(true)}
        />
      )}

      {/* Full myth story modal */}
      <MythDetailModal
        myth={selectedObject ? mythology[selectedObject.mythologyId] : null}
        visible={showMythModal}
        onClose={() => {
          setShowMythModal(false);
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centredContainer: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    color: '#aaaacc',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6666',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
