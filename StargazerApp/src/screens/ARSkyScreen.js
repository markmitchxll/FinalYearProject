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
import { View, Text, StyleSheet, Dimensions, PanResponder, TouchableOpacity, Modal, ScrollView } from 'react-native';
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

// Preset cities available in virtual sky mode.
const CITIES = [
  { name: 'My Location',    flag: '📍', latitude: null,    longitude: null    },
  { name: 'London',         flag: '🇬🇧', latitude: 51.51,  longitude: -0.13   },
  { name: 'New York',       flag: '🇺🇸', latitude: 40.71,  longitude: -74.01  },
  { name: 'Tokyo',          flag: '🇯🇵', latitude: 35.68,  longitude: 139.69  },
  { name: 'Sydney',         flag: '🇦🇺', latitude: -33.87, longitude: 151.21  },
  { name: 'Dubai',          flag: '🇦🇪', latitude: 25.20,  longitude: 55.27   },
  { name: 'Paris',          flag: '🇫🇷', latitude: 48.86,  longitude: 2.35    },
  { name: 'Los Angeles',    flag: '🇺🇸', latitude: 34.05,  longitude: -118.24 },
  { name: 'São Paulo',      flag: '🇧🇷', latitude: -23.55, longitude: -46.63  },
  { name: 'Cairo',          flag: '🇪🇬', latitude: 30.04,  longitude: 31.24   },
  { name: 'Cape Town',      flag: '🇿🇦', latitude: -33.92, longitude: 18.42   },
  { name: 'Mumbai',         flag: '🇮🇳', latitude: 19.08,  longitude: 72.88   },
  { name: 'Singapore',      flag: '🇸🇬', latitude: 1.35,   longitude: 103.82  },
  { name: 'Reykjavik',      flag: '🇮🇸', latitude: 64.13,  longitude: -21.94  },
  { name: 'Anchorage',      flag: '🇺🇸', latitude: 61.22,  longitude: -149.90 },
];

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

  // --- Mode toggle ---
  const [virtualMode, setVirtualMode] = useState(false);

  // --- Virtual sky location (null = use real GPS) ---
  const [virtualLocation,    setVirtualLocation]    = useState(CITIES[0]);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  // --- Live sensor data ---
  const [orientation, setOrientation] = useState({ heading: 0, pitch: 45, roll: 0 });

  // Objects currently visible inside the camera's field of view.
  const [objectsInFrame, setObjectsInFrame] = useState({ stars: [], planets: [], constellations: [] });

  // --- UI state ---
  const [selectedObject, setSelectedObject] = useState(null);
  const [discovery,         setDiscovery]         = useState(null);  // most recent new find
  const [showDiscoveryAlert, setShowDiscoveryAlert] = useState(false);
  const [showMythModal,     setShowMythModal]     = useState(false);

  // I store location in a ref as well as state so the sensor callback can
  // always read the latest coordinates without being re-subscribed every time
  // the location changes.
  const locationRef = useRef(null);

  // Low-pass filter for sensor smoothing.
  // Each new reading is blended with the previous smoothed value to reduce jitter.
  // 0.15 = smooth (less responsive); 0.3 = more responsive (more jitter).
  const SMOOTHING = 0.15;
  const smoothedOrientation = useRef({ heading: 0, pitch: 45, roll: 0 });

  // Blends two compass angles correctly, handling the 0°/360° wraparound.
  // e.g. smoothing from 359° towards 1° gives 360° (not 180°).
  function smoothAngle(current, target) {
    let diff = target - current;
    if (diff > 180)  diff -= 360;
    if (diff < -180) diff += 360;
    return (current + SMOOTHING * diff + 360) % 360;
  }

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

  // ─── Step 3: Subscribe to compass + tilt sensors (AR mode only) ─────────────
  // Every time the phone moves, recompute which objects are in frame and
  // update the overlay positions. Sensors are stopped in virtual mode.
  useEffect(() => {
    if (!permissionsGranted || virtualMode) return;

    const stopSensors = startSensors(
      newOrientation => {
        // Apply low-pass filter to reduce sensor noise jitter.
        smoothedOrientation.current = {
          heading: smoothAngle(smoothedOrientation.current.heading, newOrientation.heading),
          pitch:   smoothedOrientation.current.pitch + SMOOTHING * (newOrientation.pitch - smoothedOrientation.current.pitch),
          roll:    smoothedOrientation.current.roll  + SMOOTHING * (newOrientation.roll  - smoothedOrientation.current.roll),
        };

        const smoothed = smoothedOrientation.current;
        setOrientation(smoothed);

        if (!locationRef.current) return;

        const { latitude, longitude } = locationRef.current;

        const inFrame = getObjectsInDirection(
          latitude,
          longitude,
          smoothed.heading,
          smoothed.pitch,
          FOV_DEGREES,
        );

        setObjectsInFrame(inFrame);
      },
      err => console.warn('Sensor error:', err.message),
    );

    return stopSensors;
  }, [permissionsGranted, virtualMode]);

  // ─── Step 4: Recompute visible objects when orientation/location changes in virtual mode
  useEffect(() => {
    if (!virtualMode) return;

    // Use the selected city coords, or fall back to real GPS if "My Location" is chosen.
    const lat = virtualLocation.latitude  ?? locationRef.current?.latitude;
    const lon = virtualLocation.longitude ?? locationRef.current?.longitude;
    if (lat == null || lon == null) return;

    const { heading, pitch } = orientation;

    const inFrame = getObjectsInDirection(lat, lon, heading, pitch, FOV_DEGREES);
    setObjectsInFrame(inFrame);
  }, [virtualMode, orientation, virtualLocation]);

  // ─── PanResponder for virtual mode drag-to-look ───────────────────────────────
  const lastDragPos = useRef({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      // Don't claim the touch immediately — let child components (buttons,
      // markers) receive taps first.
      onStartShouldSetPanResponder: () => false,
      // Only claim the gesture once the finger has moved more than 8px,
      // confirming it is a drag rather than a tap.
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 8 || Math.abs(gesture.dy) > 8,
      onPanResponderGrant: (_, gesture) => {
        lastDragPos.current = { x: gesture.x0, y: gesture.y0 };
      },
      onPanResponderMove: (_, gesture) => {
        const dx = gesture.moveX - lastDragPos.current.x;
        const dy = gesture.moveY - lastDragPos.current.y;
        lastDragPos.current = { x: gesture.moveX, y: gesture.moveY };

        setOrientation(prev => ({
          heading: (prev.heading + dx * 0.3 + 360) % 360,
          pitch:   Math.max(-90, Math.min(90, prev.pitch - dy * 0.3)),
          roll:    0,
        }));
      },
    })
  ).current;

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

    // Pick a curious fact for the pet to say.
    // Planets carry funFacts directly; stars/constellations use mythology funFacts;
    // stars without myths fall back to their distance.
    let petComment = '';
    if (obj.funFacts?.length) {
      petComment = obj.funFacts[0];
    } else if (myth?.funFacts?.length) {
      petComment = myth.funFacts[0];
    } else if (obj.distanceLy) {
      petComment = `${obj.name} is ${obj.distanceLy} light years away from Earth!`;
    }

    setDiscovery({
      name:       obj.name,
      type:       obj.type,
      xpAwarded,
      mythTeaser: myth?.shortSummary ?? '',
      petComment,
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
  // ConstellationLines expects a Map (uses .get / .size / .values).
  const starScreenPositions = new Map();
  for (const star of objectsInFrame.stars) {
    starScreenPositions.set(star.id, toScreenPos(star));
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

  // ─── Shared overlay content (markers + compass) ──────────────────────────────
  const overlayContent = (
    <>
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
    </>
  );

  // ─── Render: main AR view ─────────────────────────────────────────────────────
  return (
    <View style={styles.container}>

      {/* Mode toggle button — top-right corner */}
      <TouchableOpacity
        style={styles.modeToggle}
        onPress={() => setVirtualMode(v => !v)}
        activeOpacity={0.8}
      >
        <Text style={styles.modeToggleText}>
          {virtualMode ? '📷  AR Mode' : '🌌  Virtual'}
        </Text>
      </TouchableOpacity>

      {virtualMode ? (
        /* ── Virtual sky: dark background + drag to look ── */
        <View style={styles.virtualSky} {...panResponder.panHandlers}>
          {overlayContent}

          {/* Location picker button — bottom-centre */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => setShowLocationPicker(true)}
          >
            <Text style={styles.locationButtonText}>
              {virtualLocation.flag}  {virtualLocation.name}  ▾
            </Text>
          </TouchableOpacity>

          <Text style={styles.dragHint} pointerEvents="none">
            Drag to explore the sky
          </Text>
        </View>
      ) : (
        /* ── AR mode: live camera feed ── */
        <ARCamera>
          {overlayContent}
        </ARCamera>
      )}

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

      {/* Location picker modal */}
      <Modal
        visible={showLocationPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLocationPicker(false)}
      >
        <TouchableOpacity
          style={styles.pickerBackdrop}
          activeOpacity={1}
          onPress={() => setShowLocationPicker(false)}
        />
        <View style={styles.pickerSheet}>
          <Text style={styles.pickerTitle}>View sky from…</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {CITIES.map(city => {
              const isSelected = city.name === virtualLocation.name;
              return (
                <TouchableOpacity
                  key={city.name}
                  style={[styles.cityRow, isSelected && styles.cityRowSelected]}
                  onPress={() => {
                    setVirtualLocation(city);
                    setShowLocationPicker(false);
                  }}
                >
                  <Text style={styles.cityFlag}>{city.flag}</Text>
                  <Text style={[styles.cityName, isSelected && styles.cityNameSelected]}>
                    {city.name}
                  </Text>
                  {isSelected && <Text style={styles.cityTick}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  // ── Mode toggle button ──
  modeToggle: {
    position:        'absolute',
    top:             52,
    right:           16,
    zIndex:          100,
    backgroundColor: 'rgba(10, 10, 30, 0.85)',
    borderRadius:    20,
    borderWidth:     1,
    borderColor:     '#333366',
    paddingVertical:  8,
    paddingHorizontal: 14,
  },
  modeToggleText: {
    color:      '#ccccff',
    fontSize:   13,
    fontWeight: 'bold',
  },

  // ── Virtual sky background ──
  virtualSky: {
    flex:            1,
    backgroundColor: '#00000f',
  },
  dragHint: {
    position:  'absolute',
    bottom:    76,
    alignSelf: 'center',
    color:     '#333355',
    fontSize:  12,
  },

  // ── Location picker button ──
  locationButton: {
    position:        'absolute',
    bottom:          100,
    alignSelf:       'center',
    backgroundColor: 'rgba(10, 10, 30, 0.85)',
    borderRadius:    20,
    borderWidth:     1,
    borderColor:     '#333366',
    paddingVertical:  8,
    paddingHorizontal: 18,
  },
  locationButtonText: {
    color:    '#ccccff',
    fontSize: 14,
  },

  // ── Location picker modal sheet ──
  pickerBackdrop: {
    flex:            1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerSheet: {
    backgroundColor: '#0d0d2b',
    borderTopLeftRadius:  20,
    borderTopRightRadius: 20,
    borderTopWidth:  1,
    borderColor:     '#222255',
    paddingTop:      20,
    paddingBottom:   40,
    maxHeight:       '60%',
  },
  pickerTitle: {
    color:        '#8888cc',
    fontSize:     13,
    fontWeight:   'bold',
    letterSpacing: 1,
    textAlign:    'center',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  cityRow: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingVertical:  14,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#111133',
  },
  cityRowSelected: {
    backgroundColor: '#111133',
  },
  cityFlag: {
    fontSize:    22,
    marginRight: 14,
  },
  cityName: {
    flex:     1,
    color:    '#aaaacc',
    fontSize: 16,
  },
  cityNameSelected: {
    color:      '#ffdd44',
    fontWeight: 'bold',
  },
  cityTick: {
    color:    '#ffdd44',
    fontSize: 18,
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
