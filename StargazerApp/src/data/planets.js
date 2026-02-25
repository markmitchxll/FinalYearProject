/**
 * planets.js — static data for the 7 naked-eye planets.
 *
 * Note: Actual sky positions of planets are computed dynamically by
 * CelestialService using the astronomy-engine library (which uses orbital
 * mechanics). This file holds the static descriptive data only.
 *
 * Each planet object contains:
 * - id          : unique string (e.g. 'mars')
 * - name        : display name (e.g. 'Mars')
 * - colour      : hex colour for PlanetMarker rendering
 * - mythologyId : links to an entry in mythology.js
 * - distanceAU  : average distance from Sun in astronomical units
 * - funFacts    : array of short fact strings shown in StarInfoPanel
 */

export const planets = [
  {
    id: 'mercury',
    name: 'Mercury',
    colour: '#b5b5b5',
    mythologyId: 'mercury_myth',
    distanceAU: 0.39,
    funFacts: [
      'Mercury has no atmosphere to retain heat.',
      'A year on Mercury lasts only 88 Earth days.',
    ],
  },
  {
    id: 'venus',
    name: 'Venus',
    colour: '#ffeeaa',
    mythologyId: 'venus_myth',
    distanceAU: 0.72,
    funFacts: [
      'Venus is the brightest object in the night sky after the Moon.',
      'Venus rotates backwards compared to most planets.',
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    colour: '#ff4422',
    mythologyId: 'mars_myth',
    distanceAU: 1.52,
    funFacts: [
      'Mars has the largest volcano in the solar system: Olympus Mons.',
      'A Martian day is 24 hours and 37 minutes long.',
    ],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    colour: '#ffaa66',
    mythologyId: 'jupiter_myth',
    distanceAU: 5.2,
    funFacts: [
      'Jupiter\'s Great Red Spot is a storm that has lasted over 350 years.',
      'Jupiter has 95 known moons.',
    ],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    colour: '#ffdd99',
    mythologyId: 'saturn_myth',
    distanceAU: 9.58,
    funFacts: [
      'Saturn\'s rings are made of ice and rock.',
      'Saturn is the least dense planet — it would float on water.',
    ],
  },
  // TODO: Add Uranus and Neptune (faint but technically visible with good conditions).
];
