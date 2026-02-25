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
 * Start with the 20 brightest stars visible to the naked eye,
 * then expand to include all named stars across the 88 constellations.
 *
 * Data source: Yale Bright Star Catalogue (public domain).
 */

export const stars = [
  {
    id: 'sirius',
    name: 'Sirius',
    designation: 'Alpha Canis Majoris',
    ra: 6.7525,
    dec: -16.7161,
    magnitude: -1.46,
    distanceLy: 8.6,
    mythologyId: 'sirius_myth',
    constellationId: 'canis_major',
  },
  // TODO: Add the remaining named stars.
  // Suggested order: Canopus, Arcturus, Vega, Capella, Rigel, Procyon,
  // Achernar, Betelgeuse, Hadar, Altair, Aldebaran, Antares, Spica,
  // Pollux, Fomalhaut, Deneb, Mimosa, Regulus, Adhara, Castor.
];
