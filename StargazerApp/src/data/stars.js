/**
 * stars.js — the star catalogue used by CelestialService.
 *
 * Each star object contains:
 * - id          : unique string identifier (e.g. 'sirius')
 * - name        : common name (e.g. 'Sirius')
 * - designation : Bayer designation (e.g. 'Alpha Canis Majoris')
 * - ra          : Right Ascension in decimal hours (0–24)
 * - dec         : Declination in decimal degrees (-90 to +90)
 * - magnitude   : apparent magnitude (lower = brighter; Sirius = -1.46)
 * - distanceLy  : distance in light years
 * - mythologyId : links to an entry in mythology.js (or null)
 * - constellationId : which constellation this star belongs to
 *
 * Data source: Yale Bright Star Catalogue (public domain).
 */

export const stars = [

  // ─── Canis Major ─────────────────────────────────────────────────────────────
  {
    id: 'sirius',
    name: 'Sirius',
    designation: 'Alpha Canis Majoris',
    ra: 6.7525, dec: -16.7161, magnitude: -1.46, distanceLy: 8.6,
    mythologyId: 'sirius_myth', constellationId: 'canis_major',
  },
  {
    id: 'adhara',
    name: 'Adhara',
    designation: 'Epsilon Canis Majoris',
    ra: 6.9771, dec: -28.9722, magnitude: 1.50, distanceLy: 431,
    mythologyId: null, constellationId: 'canis_major',
  },
  {
    id: 'wezen',
    name: 'Wezen',
    designation: 'Delta Canis Majoris',
    ra: 7.1398, dec: -26.3932, magnitude: 1.83, distanceLy: 1600,
    mythologyId: null, constellationId: 'canis_major',
  },

  // ─── Orion ───────────────────────────────────────────────────────────────────
  {
    id: 'rigel',
    name: 'Rigel',
    designation: 'Beta Orionis',
    ra: 5.2423, dec: -8.2016, magnitude: 0.13, distanceLy: 860,
    mythologyId: 'orion_myth', constellationId: 'orion',
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse',
    designation: 'Alpha Orionis',
    ra: 5.9195, dec: 7.4070, magnitude: 0.42, distanceLy: 700,
    mythologyId: 'orion_myth', constellationId: 'orion',
  },
  {
    id: 'bellatrix',
    name: 'Bellatrix',
    designation: 'Gamma Orionis',
    ra: 5.4188, dec: 6.3497, magnitude: 1.64, distanceLy: 243,
    mythologyId: null, constellationId: 'orion',
  },
  {
    id: 'alnilam',
    name: 'Alnilam',
    designation: 'Epsilon Orionis',
    ra: 5.6036, dec: -1.2019, magnitude: 1.69, distanceLy: 2000,
    mythologyId: null, constellationId: 'orion',
  },
  {
    id: 'alnitak',
    name: 'Alnitak',
    designation: 'Zeta Orionis',
    ra: 5.6793, dec: -1.9426, magnitude: 1.77, distanceLy: 1260,
    mythologyId: null, constellationId: 'orion',
  },
  {
    id: 'saiph',
    name: 'Saiph',
    designation: 'Kappa Orionis',
    ra: 5.7955, dec: -9.6697, magnitude: 2.07, distanceLy: 720,
    mythologyId: null, constellationId: 'orion',
  },
  {
    id: 'mintaka',
    name: 'Mintaka',
    designation: 'Delta Orionis',
    ra: 5.5334, dec: -0.2991, magnitude: 2.23, distanceLy: 900,
    mythologyId: null, constellationId: 'orion',
  },

  // ─── Ursa Major ──────────────────────────────────────────────────────────────
  {
    id: 'alioth',
    name: 'Alioth',
    designation: 'Epsilon Ursae Majoris',
    ra: 12.9004, dec: 55.9598, magnitude: 1.77, distanceLy: 82,
    mythologyId: 'ursa_major_myth', constellationId: 'ursa_major',
  },
  {
    id: 'dubhe',
    name: 'Dubhe',
    designation: 'Alpha Ursae Majoris',
    ra: 11.0623, dec: 61.7511, magnitude: 1.79, distanceLy: 124,
    mythologyId: 'ursa_major_myth', constellationId: 'ursa_major',
  },
  {
    id: 'alkaid',
    name: 'Alkaid',
    designation: 'Eta Ursae Majoris',
    ra: 13.7923, dec: 49.3135, magnitude: 1.86, distanceLy: 101,
    mythologyId: null, constellationId: 'ursa_major',
  },
  {
    id: 'mizar',
    name: 'Mizar',
    designation: 'Zeta Ursae Majoris',
    ra: 13.3988, dec: 54.9254, magnitude: 2.27, distanceLy: 78,
    mythologyId: null, constellationId: 'ursa_major',
  },
  {
    id: 'merak',
    name: 'Merak',
    designation: 'Beta Ursae Majoris',
    ra: 11.0306, dec: 56.3824, magnitude: 2.37, distanceLy: 79,
    mythologyId: null, constellationId: 'ursa_major',
  },
  {
    id: 'phecda',
    name: 'Phecda',
    designation: 'Gamma Ursae Majoris',
    ra: 11.8970, dec: 53.6948, magnitude: 2.44, distanceLy: 84,
    mythologyId: null, constellationId: 'ursa_major',
  },
  {
    id: 'megrez',
    name: 'Megrez',
    designation: 'Delta Ursae Majoris',
    ra: 12.2573, dec: 57.0326, magnitude: 3.31, distanceLy: 81,
    mythologyId: null, constellationId: 'ursa_major',
  },

  // ─── Cassiopeia ──────────────────────────────────────────────────────────────
  {
    id: 'schedar',
    name: 'Schedar',
    designation: 'Alpha Cassiopeiae',
    ra: 0.6751, dec: 56.5373, magnitude: 2.23, distanceLy: 228,
    mythologyId: 'cassiopeia_myth', constellationId: 'cassiopeia',
  },
  {
    id: 'caph',
    name: 'Caph',
    designation: 'Beta Cassiopeiae',
    ra: 0.1528, dec: 59.1498, magnitude: 2.28, distanceLy: 54,
    mythologyId: null, constellationId: 'cassiopeia',
  },
  {
    id: 'gamma_cas',
    name: 'Navi',
    designation: 'Gamma Cassiopeiae',
    ra: 0.9453, dec: 60.7167, magnitude: 2.47, distanceLy: 550,
    mythologyId: null, constellationId: 'cassiopeia',
  },
  {
    id: 'ruchbah',
    name: 'Ruchbah',
    designation: 'Delta Cassiopeiae',
    ra: 1.4303, dec: 60.2353, magnitude: 2.68, distanceLy: 99,
    mythologyId: null, constellationId: 'cassiopeia',
  },
  {
    id: 'segin',
    name: 'Segin',
    designation: 'Epsilon Cassiopeiae',
    ra: 1.9065, dec: 63.6700, magnitude: 3.38, distanceLy: 442,
    mythologyId: null, constellationId: 'cassiopeia',
  },

  // ─── Leo ─────────────────────────────────────────────────────────────────────
  {
    id: 'regulus',
    name: 'Regulus',
    designation: 'Alpha Leonis',
    ra: 10.1395, dec: 11.9672, magnitude: 1.36, distanceLy: 79,
    mythologyId: 'leo_myth', constellationId: 'leo',
  },
  {
    id: 'denebola',
    name: 'Denebola',
    designation: 'Beta Leonis',
    ra: 11.8175, dec: 14.5717, magnitude: 2.14, distanceLy: 36,
    mythologyId: null, constellationId: 'leo',
  },
  {
    id: 'algieba',
    name: 'Algieba',
    designation: 'Gamma Leonis',
    ra: 10.3328, dec: 19.8415, magnitude: 2.01, distanceLy: 130,
    mythologyId: null, constellationId: 'leo',
  },
  {
    id: 'zosma',
    name: 'Zosma',
    designation: 'Delta Leonis',
    ra: 11.2351, dec: 20.5236, magnitude: 2.56, distanceLy: 58,
    mythologyId: null, constellationId: 'leo',
  },
  {
    id: 'eta_leo',
    name: 'Al Jabhah',
    designation: 'Eta Leonis',
    ra: 10.1226, dec: 16.7628, magnitude: 3.49, distanceLy: 2000,
    mythologyId: null, constellationId: 'leo',
  },
  {
    id: 'adhafera',
    name: 'Adhafera',
    designation: 'Zeta Leonis',
    ra: 10.2782, dec: 23.4174, magnitude: 3.44, distanceLy: 274,
    mythologyId: null, constellationId: 'leo',
  },

  // ─── Scorpius ────────────────────────────────────────────────────────────────
  {
    id: 'antares',
    name: 'Antares',
    designation: 'Alpha Scorpii',
    ra: 16.4901, dec: -26.4320, magnitude: 1.06, distanceLy: 554,
    mythologyId: 'scorpius_myth', constellationId: 'scorpius',
  },
  {
    id: 'shaula',
    name: 'Shaula',
    designation: 'Lambda Scorpii',
    ra: 17.5601, dec: -37.1038, magnitude: 1.62, distanceLy: 700,
    mythologyId: null, constellationId: 'scorpius',
  },
  {
    id: 'sargas',
    name: 'Sargas',
    designation: 'Theta Scorpii',
    ra: 17.6218, dec: -42.9979, magnitude: 1.87, distanceLy: 300,
    mythologyId: null, constellationId: 'scorpius',
  },
  {
    id: 'dschubba',
    name: 'Dschubba',
    designation: 'Delta Scorpii',
    ra: 16.0053, dec: -22.6220, magnitude: 2.32, distanceLy: 400,
    mythologyId: null, constellationId: 'scorpius',
  },
  {
    id: 'graffias',
    name: 'Graffias',
    designation: 'Beta Scorpii',
    ra: 16.0913, dec: -19.8052, magnitude: 2.62, distanceLy: 530,
    mythologyId: null, constellationId: 'scorpius',
  },

  // ─── Gemini ──────────────────────────────────────────────────────────────────
  {
    id: 'pollux',
    name: 'Pollux',
    designation: 'Beta Geminorum',
    ra: 7.7553, dec: 28.0262, magnitude: 1.16, distanceLy: 34,
    mythologyId: 'gemini_myth', constellationId: 'gemini',
  },
  {
    id: 'castor',
    name: 'Castor',
    designation: 'Alpha Geminorum',
    ra: 7.5767, dec: 31.8883, magnitude: 1.58, distanceLy: 52,
    mythologyId: 'gemini_myth', constellationId: 'gemini',
  },
  {
    id: 'alhena',
    name: 'Alhena',
    designation: 'Gamma Geminorum',
    ra: 6.6285, dec: 16.3993, magnitude: 1.93, distanceLy: 109,
    mythologyId: null, constellationId: 'gemini',
  },
  {
    id: 'tejat',
    name: 'Tejat',
    designation: 'Mu Geminorum',
    ra: 6.3828, dec: 22.5140, magnitude: 2.87, distanceLy: 230,
    mythologyId: null, constellationId: 'gemini',
  },
  {
    id: 'mebsuda',
    name: 'Mebsuda',
    designation: 'Epsilon Geminorum',
    ra: 6.7321, dec: 25.1313, magnitude: 3.06, distanceLy: 900,
    mythologyId: null, constellationId: 'gemini',
  },

  // ─── Taurus ──────────────────────────────────────────────────────────────────
  {
    id: 'aldebaran',
    name: 'Aldebaran',
    designation: 'Alpha Tauri',
    ra: 4.5987, dec: 16.5093, magnitude: 0.87, distanceLy: 65,
    mythologyId: 'taurus_myth', constellationId: 'taurus',
  },
  {
    id: 'elnath',
    name: 'Elnath',
    designation: 'Beta Tauri',
    ra: 5.4381, dec: 28.6074, magnitude: 1.68, distanceLy: 131,
    mythologyId: null, constellationId: 'taurus',
  },
  {
    id: 'alcyone',
    name: 'Alcyone',
    designation: 'Eta Tauri',
    ra: 3.7913, dec: 24.1052, magnitude: 2.87, distanceLy: 440,
    mythologyId: null, constellationId: 'taurus',
  },
  {
    id: 'tianguan',
    name: 'Tianguan',
    designation: 'Zeta Tauri',
    ra: 5.6274, dec: 21.1426, magnitude: 2.97, distanceLy: 440,
    mythologyId: null, constellationId: 'taurus',
  },

  // ─── Cygnus ──────────────────────────────────────────────────────────────────
  {
    id: 'deneb',
    name: 'Deneb',
    designation: 'Alpha Cygni',
    ra: 20.6906, dec: 45.2803, magnitude: 1.25, distanceLy: 2600,
    mythologyId: 'cygnus_myth', constellationId: 'cygnus',
  },
  {
    id: 'sadr',
    name: 'Sadr',
    designation: 'Gamma Cygni',
    ra: 20.3704, dec: 40.2567, magnitude: 2.23, distanceLy: 1800,
    mythologyId: null, constellationId: 'cygnus',
  },
  {
    id: 'gienah_cyg',
    name: 'Gienah',
    designation: 'Epsilon Cygni',
    ra: 20.7705, dec: 33.9708, magnitude: 2.48, distanceLy: 72,
    mythologyId: null, constellationId: 'cygnus',
  },
  {
    id: 'delta_cyg',
    name: 'Fawaris',
    designation: 'Delta Cygni',
    ra: 19.7494, dec: 45.1308, magnitude: 2.87, distanceLy: 165,
    mythologyId: null, constellationId: 'cygnus',
  },
  {
    id: 'albireo',
    name: 'Albireo',
    designation: 'Beta Cygni',
    ra: 19.5123, dec: 27.9597, magnitude: 3.09, distanceLy: 430,
    mythologyId: null, constellationId: 'cygnus',
  },

  // ─── Lyra ────────────────────────────────────────────────────────────────────
  {
    id: 'vega',
    name: 'Vega',
    designation: 'Alpha Lyrae',
    ra: 18.6157, dec: 38.7836, magnitude: 0.03, distanceLy: 25,
    mythologyId: 'lyra_myth', constellationId: 'lyra',
  },
  {
    id: 'sheliak',
    name: 'Sheliak',
    designation: 'Beta Lyrae',
    ra: 18.8346, dec: 33.3627, magnitude: 3.52, distanceLy: 960,
    mythologyId: null, constellationId: 'lyra',
  },
  {
    id: 'sulafat',
    name: 'Sulafat',
    designation: 'Gamma Lyrae',
    ra: 18.9820, dec: 32.6897, magnitude: 3.26, distanceLy: 620,
    mythologyId: null, constellationId: 'lyra',
  },

  // ─── Boötes ──────────────────────────────────────────────────────────────────
  {
    id: 'arcturus',
    name: 'Arcturus',
    designation: 'Alpha Bootis',
    ra: 14.2612, dec: 19.1822, magnitude: -0.05, distanceLy: 37,
    mythologyId: 'bootes_myth', constellationId: 'bootes',
  },

  // ─── Auriga ──────────────────────────────────────────────────────────────────
  {
    id: 'capella',
    name: 'Capella',
    designation: 'Alpha Aurigae',
    ra: 5.2782, dec: 45.9980, magnitude: 0.08, distanceLy: 43,
    mythologyId: 'auriga_myth', constellationId: 'auriga',
  },

  // ─── Canis Minor ─────────────────────────────────────────────────────────────
  {
    id: 'procyon',
    name: 'Procyon',
    designation: 'Alpha Canis Minoris',
    ra: 7.6553, dec: 5.2250, magnitude: 0.40, distanceLy: 11.5,
    mythologyId: 'canis_minor_myth', constellationId: 'canis_minor',
  },

  // ─── Aquila ──────────────────────────────────────────────────────────────────
  {
    id: 'altair',
    name: 'Altair',
    designation: 'Alpha Aquilae',
    ra: 19.8463, dec: 8.8683, magnitude: 0.77, distanceLy: 17,
    mythologyId: 'aquila_myth', constellationId: 'aquila',
  },

  // ─── Virgo ───────────────────────────────────────────────────────────────────
  {
    id: 'spica',
    name: 'Spica',
    designation: 'Alpha Virginis',
    ra: 13.4199, dec: -11.1613, magnitude: 0.97, distanceLy: 250,
    mythologyId: 'virgo_myth', constellationId: 'virgo',
  },

  // ─── Perseus ─────────────────────────────────────────────────────────────────
  {
    id: 'mirfak',
    name: 'Mirfak',
    designation: 'Alpha Persei',
    ra: 3.4053, dec: 49.8612, magnitude: 1.80, distanceLy: 590,
    mythologyId: 'perseus_myth', constellationId: 'perseus',
  },

  // ─── Piscis Austrinus ────────────────────────────────────────────────────────
  {
    id: 'fomalhaut',
    name: 'Fomalhaut',
    designation: 'Alpha Piscis Austrini',
    ra: 22.9608, dec: -29.6220, magnitude: 1.16, distanceLy: 25,
    mythologyId: null, constellationId: null,
  },
];
