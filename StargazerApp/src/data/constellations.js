/**
 * constellations.js — data for the major visible constellations.
 *
 * Each constellation object contains:
 * - id          : unique string identifier (e.g. 'orion')
 * - name        : full name (e.g. 'Orion')
 * - abbreviation: IAU abbreviation (e.g. 'Ori')
 * - starIds     : array of star IDs (from stars.js) that make up this constellation
 * - linePairs   : array of [starId, starId] pairs defining the stick-figure lines
 *                 used by ConstellationLines component
 * - mythologyId : links to an entry in mythology.js
 * - bestMonths  : array of month numbers (1–12) when the constellation is most visible
 * - hemisphere  : 'northern' | 'southern' | 'both'
 */

export const constellations = [

  // ─── Orion ───────────────────────────────────────────────────────────────────
  {
    id: 'orion',
    name: 'Orion',
    abbreviation: 'Ori',
    starIds: ['betelgeuse', 'rigel', 'bellatrix', 'saiph', 'mintaka', 'alnilam', 'alnitak'],
    linePairs: [
      ['betelgeuse', 'bellatrix'],   // shoulders
      ['betelgeuse', 'alnilam'],     // left side of body
      ['bellatrix',  'alnilam'],     // right side of body
      ['mintaka',    'alnilam'],     // belt
      ['alnilam',    'alnitak'],     // belt
      ['alnilam',    'rigel'],       // left leg
      ['alnilam',    'saiph'],       // right leg
    ],
    mythologyId: 'orion_myth',
    bestMonths: [12, 1, 2],
    hemisphere: 'both',
  },

  // ─── Ursa Major ──────────────────────────────────────────────────────────────
  {
    id: 'ursa_major',
    name: 'Ursa Major',
    abbreviation: 'UMa',
    starIds: ['dubhe', 'merak', 'phecda', 'megrez', 'alioth', 'mizar', 'alkaid'],
    linePairs: [
      ['dubhe',  'merak'],    // base of cup
      ['merak',  'phecda'],   // right side of cup
      ['phecda', 'megrez'],   // top of cup
      ['megrez', 'dubhe'],    // left side of cup
      ['megrez', 'alioth'],   // handle start
      ['alioth', 'mizar'],    // handle middle
      ['mizar',  'alkaid'],   // handle end
    ],
    mythologyId: 'ursa_major_myth',
    bestMonths: [3, 4, 5],
    hemisphere: 'northern',
  },

  // ─── Cassiopeia ──────────────────────────────────────────────────────────────
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    abbreviation: 'Cas',
    starIds: ['caph', 'schedar', 'gamma_cas', 'ruchbah', 'segin'],
    linePairs: [
      ['caph',      'schedar'],    // W left arm
      ['schedar',   'gamma_cas'],  // W left dip
      ['gamma_cas', 'ruchbah'],    // W right dip
      ['ruchbah',   'segin'],      // W right arm
    ],
    mythologyId: 'cassiopeia_myth',
    bestMonths: [10, 11, 12],
    hemisphere: 'northern',
  },

  // ─── Leo ─────────────────────────────────────────────────────────────────────
  {
    id: 'leo',
    name: 'Leo',
    abbreviation: 'Leo',
    starIds: ['regulus', 'eta_leo', 'algieba', 'adhafera', 'zosma', 'denebola'],
    linePairs: [
      ['regulus',  'eta_leo'],    // sickle base
      ['eta_leo',  'algieba'],    // sickle curve
      ['algieba',  'adhafera'],   // sickle top
      ['regulus',  'zosma'],      // body
      ['zosma',    'denebola'],   // tail
    ],
    mythologyId: 'leo_myth',
    bestMonths: [3, 4, 5],
    hemisphere: 'both',
  },

  // ─── Scorpius ────────────────────────────────────────────────────────────────
  {
    id: 'scorpius',
    name: 'Scorpius',
    abbreviation: 'Sco',
    starIds: ['graffias', 'dschubba', 'antares', 'sargas', 'shaula'],
    linePairs: [
      ['graffias', 'dschubba'],   // head/claws
      ['dschubba', 'antares'],    // body
      ['antares',  'sargas'],     // tail upper
      ['sargas',   'shaula'],     // tail tip / stinger
    ],
    mythologyId: 'scorpius_myth',
    bestMonths: [6, 7, 8],
    hemisphere: 'both',
  },

  // ─── Gemini ──────────────────────────────────────────────────────────────────
  {
    id: 'gemini',
    name: 'Gemini',
    abbreviation: 'Gem',
    starIds: ['castor', 'pollux', 'alhena', 'tejat', 'mebsuda'],
    linePairs: [
      ['castor',  'pollux'],     // heads (the twins side by side)
      ['castor',  'mebsuda'],    // Castor's body
      ['mebsuda', 'tejat'],      // Castor's feet
      ['pollux',  'alhena'],     // Pollux's body
      ['tejat',   'alhena'],     // feet connecting
    ],
    mythologyId: 'gemini_myth',
    bestMonths: [1, 2, 3],
    hemisphere: 'both',
  },

  // ─── Taurus ──────────────────────────────────────────────────────────────────
  {
    id: 'taurus',
    name: 'Taurus',
    abbreviation: 'Tau',
    starIds: ['aldebaran', 'elnath', 'tianguan', 'alcyone'],
    linePairs: [
      ['aldebaran', 'elnath'],    // horn tip
      ['aldebaran', 'tianguan'],  // other horn
      ['aldebaran', 'alcyone'],   // to Pleiades cluster
    ],
    mythologyId: 'taurus_myth',
    bestMonths: [12, 1, 2],
    hemisphere: 'both',
  },

  // ─── Cygnus ──────────────────────────────────────────────────────────────────
  {
    id: 'cygnus',
    name: 'Cygnus',
    abbreviation: 'Cyg',
    starIds: ['deneb', 'sadr', 'albireo', 'gienah_cyg', 'delta_cyg'],
    linePairs: [
      ['deneb',      'sadr'],        // top of cross (neck)
      ['sadr',       'albireo'],     // bottom of cross (body/tail)
      ['gienah_cyg', 'sadr'],        // right wing
      ['sadr',       'delta_cyg'],   // left wing
    ],
    mythologyId: 'cygnus_myth',
    bestMonths: [8, 9, 10],
    hemisphere: 'northern',
  },

  // ─── Lyra ────────────────────────────────────────────────────────────────────
  {
    id: 'lyra',
    name: 'Lyra',
    abbreviation: 'Lyr',
    starIds: ['vega', 'sheliak', 'sulafat'],
    linePairs: [
      ['vega',    'sheliak'],    // left side of lyre
      ['vega',    'sulafat'],    // right side of lyre
      ['sheliak', 'sulafat'],    // base of lyre
    ],
    mythologyId: 'lyra_myth',
    bestMonths: [7, 8, 9],
    hemisphere: 'northern',
  },

];
