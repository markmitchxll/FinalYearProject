/**
 * mythology.js — the myths, legends, and stories for every discoverable object.
 *
 * Each entry is keyed by a mythologyId that is referenced from stars.js,
 * constellations.js, and planets.js.
 *
 * Each myth object contains:
 * - id           : same as the key (e.g. 'orion_myth')
 * - objectName   : display name (e.g. 'Orion the Hunter')
 * - culture      : 'Greek' | 'Roman' | 'Egyptian' | 'Chinese' | 'Norse' | 'Indigenous' | etc.
 * - shortSummary : 1–2 sentences, shown in MythCard and DiscoveryAlert
 * - fullStory    : multi-paragraph markdown string, shown in MythDetailModal
 * - funFacts     : array of short astronomical fact strings
 * - imageUrl     : URL or local asset path for the myth illustration
 *
 * TODO: Populate entries for all stars, planets, and constellations.
 *       Aim for at least one myth per object, ideally 2–3 from different cultures.
 */

export const mythology = {
  orion_myth: {
    id: 'orion_myth',
    objectName: 'Orion the Hunter',
    culture: 'Greek',
    shortSummary: 'Orion was a giant huntsman placed among the stars by Zeus after his death.',
    fullStory: `In Greek mythology, Orion was the greatest hunter who ever lived — son of Poseidon, god of the sea, who granted him the ability to walk on water.

Orion boasted that he would hunt every animal on Earth, which angered Gaia, the goddess of the Earth. She sent a giant scorpion to stop him. The battle was so fierce that Zeus placed both Orion and the Scorpion (Scorpius) in opposite sides of the sky, so they would never meet again.

To this day, Orion sets below the horizon just as Scorpius rises, and Scorpius disappears just as Orion returns — forever chasing each other across the heavens.

Orion's faithful hunting dogs, Canis Major and Canis Minor, follow at his heels, and the great bull Taurus charges at him from the west.`,
    funFacts: [
      'Betelgeuse, Orion\'s right shoulder, is a red supergiant 700 times wider than our Sun.',
      'The three stars of Orion\'s Belt (Mintaka, Alnilam, Alnitak) are nearly perfectly aligned.',
      'Orion is one of the oldest identified constellations, dating back to the Babylonians around 1200 BC.',
    ],
    imageUrl: null, // TODO: Add illustration asset.
  },

  sirius_myth: {
    id: 'sirius_myth',
    objectName: 'Sirius — the Dog Star',
    culture: 'Egyptian',
    shortSummary: 'The ancient Egyptians used Sirius to predict the flooding of the Nile.',
    fullStory: `Sirius is the brightest star in the night sky and has captivated humans for thousands of years.

To the ancient Egyptians, Sirius was the star of the goddess Isis. Each year, Sirius would disappear below the horizon for 70 days, then dramatically reappear just before sunrise — an event called the heliacal rising. This reappearance always coincided with the annual flooding of the Nile, which brought rich soil that made Egypt's crops grow. The Egyptians considered Sirius the bringer of life.

The Greek word for Sirius means "glowing" or "scorching", and the Romans called the hottest days of summer the "Dog Days" because Sirius (the Dog Star) rose alongside the Sun during those weeks.`,
    funFacts: [
      'Sirius is only 8.6 light years away — one of our nearest stellar neighbours.',
      'Sirius appears white-blue, indicating it burns hotter than our yellow Sun.',
      'Sirius has a companion star, Sirius B — a tiny white dwarf about the size of Earth.',
    ],
    imageUrl: null,
  },

  // TODO: Add entries for: Venus, Mars, Jupiter, Saturn, Ursa Major, Cassiopeia,
  //       Scorpius, Leo, Taurus, Gemini, Cygnus, Lyra, and all remaining objects.
};
