/**
 * constellations.js — data for all 88 IAU constellations.
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
 *
 * Start with the most recognisable constellations:
 * Orion, Ursa Major, Cassiopeia, Scorpius, Leo, Gemini, Taurus, Cygnus, Lyra.
 */

export const constellations = [
  {
    id: 'orion',
    name: 'Orion',
    abbreviation: 'Ori',
    starIds: ['betelgeuse', 'rigel', 'bellatrix', 'saiph', 'mintaka', 'alnilam', 'alnitak'],
    linePairs: [
      ['betelgeuse', 'alnilam'],
      ['alnilam', 'rigel'],
      ['bellatrix', 'alnilam'],
      ['alnilam', 'saiph'],
      ['mintaka', 'alnilam'],
      ['alnilam', 'alnitak'],
    ],
    mythologyId: 'orion_myth',
    bestMonths: [12, 1, 2],
    hemisphere: 'both',
  },
  // TODO: Add Ursa Major, Cassiopeia, Scorpius, Leo, Gemini, Taurus,
  //       Cygnus, Lyra, Aquila, Perseus, Andromeda, and the remaining 76.
];
