/**
 * mythology.js — myths, legends, and stories for every discoverable object.
 *
 * Each entry is keyed by a mythologyId referenced from stars.js,
 * constellations.js, and planets.js.
 *
 * Each myth object contains:
 * - id           : same as the key (e.g. 'orion_myth')
 * - objectName   : display name
 * - culture      : origin culture of the myth
 * - shortSummary : 1–2 sentences shown in StarInfoPanel and DiscoveryAlert
 * - fullStory    : multi-paragraph string shown in MythDetailModal
 * - funFacts     : array of short astronomical fact strings
 * - imageUrl     : null until illustration assets are added
 */

export const mythology = {

  // ─── Constellations ────────────────────────────────────────────────────────

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
      'The three stars of Orion\'s Belt are nearly perfectly aligned and point to Sirius.',
      'Orion is one of the oldest identified constellations, dating back to the Babylonians around 1200 BC.',
    ],
    imageUrl: null,
  },

  ursa_major_myth: {
    id: 'ursa_major_myth',
    objectName: 'Ursa Major — the Great Bear',
    culture: 'Greek',
    shortSummary: 'Callisto was a beautiful nymph turned into a bear by a jealous Hera, then placed among the stars by Zeus.',
    fullStory: `Callisto was one of Artemis's hunting companions — a beautiful nymph sworn to chastity. Zeus fell in love with her and, disguising himself as Artemis, tricked her into breaking her vow.

When Callisto's secret was discovered, the jealous goddess Hera transformed her into a bear. Callisto wandered the forests for years, a bear on the outside but still a woman within.

Years later, her son Arcas, now grown into a hunter, came face to face with the bear in the forest. Not recognising his own mother, he raised his spear to strike. Zeus intervened at the last moment, sweeping them both up to the heavens — Callisto as Ursa Major, the Great Bear, and Arcas as Ursa Minor, the Little Bear — where they remain together for eternity.

Hera, furious that her rival was honoured in the sky, convinced Poseidon to forbid the bears from ever dipping below the ocean horizon. That is why Ursa Major never sets in the northern sky.`,
    funFacts: [
      'The seven brightest stars of Ursa Major form the famous "Big Dipper" or "Plough" pattern.',
      'The two stars at the end of the Big Dipper\'s cup point directly to Polaris, the North Star.',
      'Ursa Major is the third largest constellation in the sky.',
    ],
    imageUrl: null,
  },

  ursa_minor_myth: {
    id: 'ursa_minor_myth',
    objectName: 'Ursa Minor — the Little Bear',
    culture: 'Greek',
    shortSummary: 'Arcas, son of Callisto, was placed near his mother in the sky by Zeus, containing the all-important North Star.',
    fullStory: `Arcas was the son of Zeus and the nymph Callisto. After his mother was transformed into a bear, Arcas was raised by his grandfather and grew up to become a skilled hunter, unaware of his mother's fate.

One day while hunting in the forest, Arcas came upon a great bear — his own mother Callisto — who, recognising her son with a mother's heart, moved towards him. Arcas, seeing only a bear charging at him, prepared to kill it.

Zeus watched from Olympus and could not allow a son to unknowingly kill his own mother. He seized them both and placed them in the sky together — Callisto as Ursa Major, and Arcas as Ursa Minor, the Little Bear, forever beside her.

The tail of Ursa Minor ends at Polaris, the North Star, which has guided sailors and travellers for thousands of years. Because of this, Arcas's constellation may be small, but it is perhaps the most useful in the entire night sky.`,
    funFacts: [
      'Polaris, the North Star, sits at the very tip of Ursa Minor\'s tail.',
      'Polaris is so close to the celestial north pole that it appears almost stationary while other stars rotate around it.',
      'Ancient sailors used Polaris to navigate at sea long before compasses were invented.',
    ],
    imageUrl: null,
  },

  cassiopeia_myth: {
    id: 'cassiopeia_myth',
    objectName: 'Cassiopeia — the Vain Queen',
    culture: 'Greek',
    shortSummary: 'Queen Cassiopeia boasted she was more beautiful than the sea nymphs and was punished by being placed in the sky, spinning upside-down for eternity.',
    fullStory: `Cassiopeia was the queen of ancient Ethiopia, wife of King Cepheus and mother of Andromeda. She was renowned for her beauty — and she knew it.

Her fatal mistake was boasting that she and her daughter Andromeda were more beautiful than the Nereids, the fifty sea nymphs who served Poseidon, god of the seas. This was an unforgivable insult to the god of the oceans.

Poseidon was furious. To punish the queen's vanity, he sent Cetus, a terrible sea monster, to ravage the coast of Ethiopia. The oracle of Ammon declared that the only way to appease Poseidon was to sacrifice Andromeda to the monster.

When the gods placed Cassiopeia among the stars, they ensured her humiliation would last forever. Her constellation circles the North Pole, and half the year she is turned upside-down — a constant reminder that pride comes before a fall.`,
    funFacts: [
      'Cassiopeia\'s five main stars form a distinctive "W" or "M" shape, making it easy to recognise.',
      'Because it circles the North Pole, Cassiopeia is visible all year round from northern latitudes.',
      'In 1572, a bright supernova appeared in Cassiopeia — so bright it was visible in daylight for weeks.',
    ],
    imageUrl: null,
  },

  andromeda_myth: {
    id: 'andromeda_myth',
    objectName: 'Andromeda — the Princess',
    culture: 'Greek',
    shortSummary: 'Princess Andromeda was chained to a rock as a sacrifice to a sea monster, but was rescued at the last moment by the hero Perseus.',
    fullStory: `Andromeda was the beautiful daughter of King Cepheus and Queen Cassiopeia of Ethiopia. She was innocent of her mother's vanity, yet she paid the price for it.

When Poseidon sent the sea monster Cetus to devastate the kingdom as punishment for Cassiopeia's boasting, the oracle declared that only the sacrifice of Andromeda would satisfy the god's wrath. The king and queen, heartbroken but seeing no other way, chained their daughter to a rock by the sea.

Just as Cetus rose from the waves to claim his prize, Perseus arrived, flying on winged sandals, fresh from his victory over Medusa. Some say he used Medusa's severed head to turn the monster to stone; others say he simply slew it with his sword.

Perseus freed Andromeda, and the two fell in love. Together they returned to Greece, where they ruled wisely and had many children. The gods honoured them both with constellations placed side by side in the sky.

The Andromeda Galaxy, our closest galactic neighbour, bears her name — a faint smudge of light visible to the naked eye on dark nights.`,
    funFacts: [
      'The Andromeda Galaxy (M31) is the most distant object visible to the naked eye at 2.5 million light-years away.',
      'The Andromeda Galaxy and the Milky Way are on a collision course, set to merge in about 4.5 billion years.',
      'Andromeda is one of the 48 constellations listed by the ancient astronomer Ptolemy.',
    ],
    imageUrl: null,
  },

  perseus_myth: {
    id: 'perseus_myth',
    objectName: 'Perseus — the Hero',
    culture: 'Greek',
    shortSummary: 'Perseus slew the Gorgon Medusa and rescued Princess Andromeda, becoming one of the greatest heroes of Greek mythology.',
    fullStory: `Perseus was the son of Zeus and the mortal woman Danaë. Before his birth, a prophecy declared that Danaë's son would one day kill his grandfather, King Acrisius. Terrified, the king locked Danaë in a bronze tower — but Zeus visited her as a shower of golden rain, and Perseus was born.

The king set mother and child adrift at sea, but they survived and were taken in by a kind fisherman on the island of Seriphos. Years later, the island's ruler Polydectes sought to marry Danaë, and to get Perseus out of the way, he sent him on an impossible quest: bring back the head of Medusa, the Gorgon whose gaze turned men to stone.

The gods took pity on Perseus. Athena gave him a polished shield to use as a mirror, so he could look at Medusa's reflection rather than her face. Hermes gave him winged sandals and a sword. The nymphs gave him a magical bag and a helmet that made him invisible.

Perseus flew to the ends of the earth, found Medusa sleeping, and used his shield as a mirror to guide his sword. In one stroke he took her head, placed it in the bag without looking, and flew off. From the blood that fell into the sea, the winged horse Pegasus sprang to life.

On his journey home, Perseus spotted Andromeda chained to a rock and slew the sea monster Cetus to save her. He returned to Seriphos, turned Polydectes to stone with the Gorgon's head, and freed his mother. He later accidentally fulfilled the prophecy when a discus he threw at the games was carried by the wind and struck his grandfather.`,
    funFacts: [
      'The Perseid meteor shower, visible every August, radiates from the constellation Perseus.',
      'Algol, the second brightest star in Perseus, is called the "Demon Star" — it winks every 2.87 days as a companion star eclipses it.',
      'Perseus contains a famous double cluster of stars, visible to the naked eye as a faint smudge.',
    ],
    imageUrl: null,
  },

  pegasus_myth: {
    id: 'pegasus_myth',
    objectName: 'Pegasus — the Winged Horse',
    culture: 'Greek',
    shortSummary: 'Pegasus sprang from the blood of the slain Gorgon Medusa and became a symbol of inspiration and the divine.',
    fullStory: `When Perseus severed the head of Medusa, her blood fell into the sea and from it sprang Pegasus — a magnificent white horse with great feathered wings. It was said the horse was fathered by Poseidon himself, who had once been Medusa's lover before her transformation into a Gorgon.

Pegasus flew freely across the heavens until the hero Bellerophon, with the help of the goddess Athena and a golden bridle, managed to tame him. Together Bellerophon and Pegasus performed great deeds, most famously slaying the fire-breathing Chimaera.

But Bellerophon grew too proud. He attempted to fly Pegasus all the way to Mount Olympus to join the gods. Zeus was furious at his arrogance and sent a gadfly to sting Pegasus. The startled horse threw Bellerophon, who fell back to earth and was lamed and blinded.

Pegasus continued to Olympus alone and became the horse of the gods, carrying Zeus's thunderbolts. For his faithful service, Zeus placed him among the stars as a constellation of honour.`,
    funFacts: [
      'The Great Square of Pegasus is one of the most recognisable shapes in the autumn sky.',
      'The star Alpheratz, shared between Pegasus and Andromeda, represents the horse\'s navel.',
      'Pegasus is the seventh largest constellation, covering a large area of the sky.',
    ],
    imageUrl: null,
  },

  cepheus_myth: {
    id: 'cepheus_myth',
    objectName: 'Cepheus — the King',
    culture: 'Greek',
    shortSummary: 'King Cepheus of Ethiopia was the husband of the vain Cassiopeia and father of Andromeda, placed among the stars after his death.',
    fullStory: `Cepheus was the king of ancient Ethiopia, a ruler of great power but perhaps less great judgement. His downfall began with his wife Cassiopeia's unwise boast that she and their daughter Andromeda were more beautiful than the sea nymphs of Poseidon.

When Poseidon sent the sea monster Cetus to punish the kingdom, Cepheus was faced with an impossible choice. The oracle declared that only by sacrificing his own daughter could he save his people. Though it broke his heart, Cepheus agreed, and Andromeda was chained to the rocks.

Fortunately, Perseus arrived and saved Andromeda, slaying Cetus and asking for Andromeda's hand in marriage. At first Cepheus agreed, but when an old suitor named Phineus arrived with an army to claim Andromeda, Cepheus initially wavered. Perseus was forced to use Medusa's head to turn the entire army to stone.

In the end, Cepheus and Cassiopeia were placed in the stars near their daughter — a royal family reunited in the sky for eternity.`,
    funFacts: [
      'Cepheus contains one of the largest known stars — VV Cephei, a red supergiant roughly 1,000 times the size of the Sun.',
      'Delta Cephei is the prototype for Cepheid variable stars, which pulsate in brightness and are used to measure distances across the universe.',
      'The constellation is circumpolar from northern latitudes, visible year-round.',
    ],
    imageUrl: null,
  },

  hercules_myth: {
    id: 'hercules_myth',
    objectName: 'Hercules — the Hero',
    culture: 'Greek',
    shortSummary: 'Hercules was the greatest hero of ancient Greece, famous for his twelve impossible labours, and was honoured in the sky as a kneeling warrior.',
    fullStory: `Hercules (Heracles in Greek) was the son of Zeus and the mortal woman Alcmene — Zeus's greatest son among mortals. From birth he was plagued by the jealousy of Hera, Zeus's wife, who sent two serpents to kill him in his cradle. The infant Hercules strangled them both with his bare hands.

As a man, Hercules was the strongest being on Earth. But Hera's curse drove him temporarily mad, and in a fit of madness he killed his own wife and children. When his sanity returned, devastated with grief, he went to the Oracle at Delphi and was told he must serve King Eurystheus for twelve years, performing whatever tasks the king demanded.

These became the Twelve Labours of Hercules: slaying the Nemean Lion, killing the Lernaean Hydra, capturing the Erymanthian Boar, cleaning the Augean Stables in a single day, killing the Stymphalian Birds, capturing the Cretan Bull, stealing the Mares of Diomedes, obtaining the girdle of Hippolyta, stealing the cattle of Geryon, fetching the golden apples of the Hesperides, capturing Cerberus from the underworld, and finally, capturing the golden hind of Artemis.

After completing his labours and many further adventures, Hercules was eventually killed by a poisoned garment and, in death, was raised to Olympus as a god. Zeus placed him among the stars kneeling, as a reminder of his humility as well as his great strength.`,
    funFacts: [
      'Hercules is the fifth largest constellation in the sky.',
      'The Hercules Cluster (M13) is a spectacular globular cluster visible with binoculars, containing around 300,000 stars.',
      'In the year 13,000 AD, Earth\'s axis will point towards Vega rather than Polaris — and Hercules will be near the celestial pole.',
    ],
    imageUrl: null,
  },

  draco_myth: {
    id: 'draco_myth',
    objectName: 'Draco — the Dragon',
    culture: 'Greek',
    shortSummary: 'Draco represents Ladon, the sleepless dragon who guarded the golden apples of the Hesperides, slain by Hercules.',
    fullStory: `At the edge of the world, in a garden at the foot of the mountains that hold up the sky, grew a wondrous apple tree. Its branches bore golden apples that granted immortality, a wedding gift from Gaia to Hera when she married Zeus.

The garden was tended by the Hesperides, the daughters of evening, who sang as they worked. But Hera did not fully trust them, so she set Ladon, a mighty dragon with a hundred heads, to coil about the tree and guard it without ever sleeping.

Fetching the golden apples was one of the Twelve Labours of Hercules. Some say he slew the great dragon Ladon with a poisoned arrow to enter the garden; others say he tricked the titan Atlas into fetching the apples while Hercules held up the heavens in his place.

Hera, grieving for her faithful guardian, placed Ladon among the stars as the constellation Draco — the Dragon — where he coils around the north celestial pole, forever watchful.`,
    funFacts: [
      'Draco winds between Ursa Major and Ursa Minor in the northern sky.',
      'Around 3,000 BC, Earth\'s north pole pointed towards Thuban in Draco, not Polaris. The ancient Egyptians used Thuban as their pole star.',
      'Draco contains the Cat\'s Eye Nebula, one of the most complex planetary nebulae ever observed.',
    ],
    imageUrl: null,
  },

  lyra_myth: {
    id: 'lyra_myth',
    objectName: 'Lyra — the Lyre of Orpheus',
    culture: 'Greek',
    shortSummary: 'The constellation Lyra represents the magical lyre of Orpheus, whose music was so beautiful it could move gods, beasts, and even the stones of the earth.',
    fullStory: `Orpheus was the greatest musician the world has ever known, son of the Muse Calliope and the god Apollo, who gifted him a golden lyre. When Orpheus played, rivers ceased to flow, trees uprooted themselves and walked towards him, wild beasts became tame, and even the stones wept.

Orpheus fell deeply in love with the nymph Eurydice. On their wedding day, she was bitten by a serpent and died. Heartbroken, Orpheus did what no mortal had ever dared — he descended into the Underworld to win her back.

His music moved even the dead. The tortured souls of the Underworld stood still in wonder. Sisyphus sat down on his stone. Tantalus forgot his thirst. Even Hades and Persephone wept and agreed to release Eurydice, on one condition: Orpheus must walk back to the living world without once looking back at her.

Orpheus walked, and Eurydice followed in silence. As he neared the light of the upper world, doubt seized him — was she really there? He turned, and in an instant Eurydice faded back into the shadows. He had lost her a second time.

After his death, the Muses placed his lyre among the stars, where it shines to this day as the constellation Lyra, containing Vega, one of the brightest stars in the sky.`,
    funFacts: [
      'Vega is the fifth brightest star in the night sky and the brightest star in Lyra.',
      'Vega was the northern pole star around 12,000 BC and will be again around 13,727 AD.',
      'The Lyrid meteor shower, visible every April, radiates from the direction of Lyra.',
    ],
    imageUrl: null,
  },

  cygnus_myth: {
    id: 'cygnus_myth',
    objectName: 'Cygnus — the Swan',
    culture: 'Greek',
    shortSummary: 'Cygnus represents a young man transformed into a swan out of grief for his fallen friend Phaethon, who crashed the sun chariot.',
    fullStory: `Phaethon was the son of Helios, the god who drove the chariot of the Sun across the sky each day. Desperate to prove his divine parentage, Phaethon begged his father to let him drive the sun chariot for one day.

Helios, bound by a rash promise, reluctantly agreed. But the horses of the Sun were too powerful for a mortal to control. The chariot veered wildly — first too high, freezing the earth, then plunging too low, scorching it. Zeus, seeing the world about to burn, struck Phaethon with a thunderbolt to end the disaster. The boy fell blazing into the river Eridanus.

Cygnus was Phaethon's closest friend and perhaps his half-brother. Overcome with grief, he spent his days wandering the banks of the river, diving into the water trying to retrieve his friend's body, crying out in a mournful voice. The gods, moved by his devotion, transformed him into a swan so he could search the waters more easily.

Zeus eventually placed the swan in the sky as Cygnus, flying along the Milky Way with wings outstretched, still searching — still mourning.`,
    funFacts: [
      'Cygnus lies along the band of the Milky Way and contains some of its richest star fields.',
      'Deneb, the tail of the swan, is one of the most luminous stars known — roughly 200,000 times brighter than the Sun.',
      'Cygnus X-1, within this constellation, was the first strong candidate for a black hole ever identified.',
    ],
    imageUrl: null,
  },

  aquila_myth: {
    id: 'aquila_myth',
    objectName: 'Aquila — the Eagle',
    culture: 'Greek',
    shortSummary: "Zeus's eagle, who carried his thunderbolts and abducted the beautiful youth Ganymede to serve as cupbearer to the gods.",
    fullStory: `Aquila was the sacred eagle of Zeus, king of the gods. Enormous and majestic, the eagle was Zeus's chosen companion, carrying his terrible thunderbolts when he needed to punish the arrogant or defend justice.

The eagle played a role in one of the most famous abductions in mythology. Ganymede was a Trojan prince of such extraordinary beauty that Zeus desired him to be the cupbearer of the gods, replacing Hebe. Zeus sent his eagle down to Earth, and the great bird swept Ganymede up in its talons and carried him to Olympus.

In another myth, Aquila was sent to torment the titan Prometheus, who had stolen fire from the gods and given it to humanity. Every day, the eagle would descend on Prometheus where he was chained to a rock, tearing out and eating his liver. Every night the liver grew back, and every morning the eagle returned — until the hero Hercules finally freed Prometheus by slaying the eagle with an arrow.

Zeus placed his faithful eagle among the stars, where it flies along the Milky Way for eternity.`,
    funFacts: [
      'Altair, the brightest star in Aquila, is one of the closest stars visible to the naked eye at only 17 light-years away.',
      'Altair rotates so rapidly that it bulges noticeably at its equator — it is 20% wider across its equator than from pole to pole.',
      'Altair forms one corner of the famous Summer Triangle, along with Vega and Deneb.',
    ],
    imageUrl: null,
  },

  scorpius_myth: {
    id: 'scorpius_myth',
    objectName: 'Scorpius — the Scorpion',
    culture: 'Greek',
    shortSummary: 'The scorpion was sent by Gaia to kill the boastful hunter Orion, and now eternally chases him across opposite sides of the sky.',
    fullStory: `Orion the Hunter was the greatest hunter who had ever lived. But greatness bred arrogance, and Orion began to boast that he would hunt and kill every beast on Earth until not a single creature remained.

Gaia, goddess of the Earth and mother of all living things, was outraged. She summoned a great scorpion from the earth and sent it to fight Orion. The battle was fearsome — the scorpion's armour was impenetrable to Orion's arrows, and its sting was deadly. Some say the scorpion stung Orion in the heel; others say it stung him in the foot, and the wound proved fatal.

Zeus, honouring both combatants, placed them both in the sky. But he was wise enough to place them on opposite sides of the heavens, so they could never meet again.

And so to this day, when Scorpius rises in the east, Orion flees below the western horizon. As summer ends and autumn comes, Orion returns and Scorpius retreats. They pursue each other forever, but never meet — an eternal hunt across the sky.`,
    funFacts: [
      'Antares, the heart of the scorpion, is a red supergiant roughly 700 times the size of our Sun.',
      'The name Antares means "rival of Mars" — when Mars passes near it, the two red objects look remarkably similar.',
      'Scorpius is best seen in summer from the northern hemisphere, low on the southern horizon.',
    ],
    imageUrl: null,
  },

  leo_myth: {
    id: 'leo_myth',
    objectName: 'Leo — the Lion',
    culture: 'Greek',
    shortSummary: 'Leo represents the fearsome Nemean Lion, whose impenetrable golden hide could not be pierced by any weapon, until Hercules strangled it with his bare hands.',
    fullStory: `The Nemean Lion was no ordinary beast. Born of Typhon and Echidna, the most fearsome monsters in Greek mythology, it had fallen from the moon and taken up residence in the valley of Nemea, where it terrorised the countryside and devoured the people.

What made the lion truly terrifying was its hide — golden and so tough that no weapon made by mortal hands could pierce it. Swords bent, arrows bounced off, and spears shattered. Killing the Nemean Lion was the very first of Hercules's Twelve Labours.

Hercules drove the lion into its cave and wrestled it barehanded, strangling the great beast with his enormous strength. He then used the lion's own claws — the only things sharp enough — to skin it. From that day on, Hercules wore the lion's impenetrable hide as armour, which became his most recognisable symbol.

Hera, who had sent Hercules on the labours hoping he would fail, was grudgingly impressed by the feat. She placed the Nemean Lion among the stars as the constellation Leo, as a permanent testament to how formidable the beast had been.`,
    funFacts: [
      'The bright star Regulus marks the heart of Leo and lies almost perfectly on the ecliptic — the path of the Sun, Moon and planets.',
      'Every November, Earth passes through Leo, producing the Leonid meteor shower.',
      'Leo is one of the twelve zodiac constellations and one of the oldest recognised by ancient astronomers.',
    ],
    imageUrl: null,
  },

  cancer_myth: {
    id: 'cancer_myth',
    objectName: 'Cancer — the Crab',
    culture: 'Greek',
    shortSummary: 'Hera sent a crab to distract Hercules during his battle with the Hydra, but it was quickly crushed underfoot — and Hera placed it in the stars as a reward for trying.',
    fullStory: `The Lernaean Hydra was a monstrous water serpent with nine heads and breath so poisonous that even its footprints were lethal. Slaying it was the second of Hercules's Twelve Labours — and it proved to be one of the most difficult.

Every time Hercules cut off one of the Hydra's heads, two more grew in its place. The battle was going badly. Hera, watching from Olympus and wanting Hercules to fail, decided to tip the scales further against him.

She sent a crab to the swamp where they fought, with instructions to bite Hercules on the foot and distract him. The crab scuttled forward bravely and snapped at Hercules's heel. Hercules, barely noticing, brought his foot down and crushed it instantly.

It was a pitiful end for a willing servant. Hera, appreciating its loyalty even if not its effectiveness, placed the crab among the stars as the constellation Cancer. It is one of the faintest constellations of the zodiac — a fitting memorial to a creature that tried its best.`,
    funFacts: [
      'Cancer is the faintest of the twelve zodiac constellations, with no stars brighter than magnitude 3.5.',
      'Cancer contains the Beehive Cluster (M44), a beautiful open cluster of stars visible to the naked eye on dark nights.',
      'The ancient Babylonians called this region of sky "the Crayfish" over 3,000 years ago.',
    ],
    imageUrl: null,
  },

  gemini_myth: {
    id: 'gemini_myth',
    objectName: 'Gemini — the Twins',
    culture: 'Greek',
    shortSummary: 'Castor and Pollux were twin brothers — one mortal, one immortal — who loved each other so deeply that they chose to share their immortality rather than be parted.',
    fullStory: `Castor and Pollux were twin brothers, born from the same mother Leda but different fathers — Pollux was the son of Zeus and therefore immortal, while Castor was the son of the mortal king Tyndareus and therefore fated to die.

Despite this difference, the twins were inseparable. Together they sailed with Jason and the Argonauts in search of the Golden Fleece. Castor was celebrated as a master horseman; Pollux was an undefeated boxer. Together they were known as the Dioscuri — the sons of Zeus — and were worshipped as protectors of sailors.

The tragedy came when Castor was killed in a battle over stolen cattle. Pollux was devastated. He was immortal, destined to live forever on Olympus, but without his brother the thought was unbearable. He prayed to his father Zeus to let him share his immortality with Castor.

Zeus was so moved by this act of brotherly love that he honoured both twins: they were allowed to spend alternate days in the heavens and in the Underworld together, never separated for long. He then placed them side by side among the stars as the constellation Gemini, where the two bright stars Castor and Pollux shine as a pair for all eternity.`,
    funFacts: [
      'The two brightest stars in Gemini are named Castor and Pollux — Pollux is actually slightly brighter despite Castor being named "alpha".',
      'Castor is actually a system of six stars all gravitationally bound together.',
      'The Geminid meteor shower, one of the year\'s best, radiates from Gemini every December.',
    ],
    imageUrl: null,
  },

  taurus_myth: {
    id: 'taurus_myth',
    objectName: 'Taurus — the Bull',
    culture: 'Greek',
    shortSummary: 'Taurus represents Zeus disguised as a magnificent white bull to win the heart of the Phoenician princess Europa, who he carried across the sea to Crete.',
    fullStory: `Europa was a Phoenician princess of extraordinary beauty. One day she and her companions were playing on the seashore gathering flowers when Zeus spotted her from Olympus and was immediately captivated.

Zeus was cunning. Knowing she would flee if he approached as himself, he transformed into a magnificent white bull — pure as snow, with breath that smelled of flowers and crescent-shaped horns that gleamed like the moon. The bull walked calmly among Europa's companions, so gentle that they stroked it without fear.

Europa was enchanted by the creature. She decorated his horns with garlands and climbed onto his back. At that moment the bull rose to his feet and charged towards the sea, diving into the waves and swimming powerfully away from the shore. Europa clung to his back as Crete appeared on the horizon.

There Zeus revealed himself. Europa became a queen of Crete, and their son Minos grew up to be the famous king who built the Labyrinth. Zeus, remembering the beautiful creature he had become, placed the image of the bull among the stars.

The Pleiades star cluster, representing seven sisters in Greek myth, sits on the bull's shoulder — making Taurus one of the most star-rich constellations in the sky.`,
    funFacts: [
      'The Pleiades star cluster, visible in Taurus, contains hundreds of stars and has been observed by cultures worldwide for thousands of years.',
      'Aldebaran, the bright red eye of the bull, is a red giant 44 times the size of the Sun.',
      'The Crab Nebula in Taurus is the remains of a supernova that was recorded by Chinese astronomers in 1054 AD.',
    ],
    imageUrl: null,
  },

  aries_myth: {
    id: 'aries_myth',
    objectName: 'Aries — the Ram',
    culture: 'Greek',
    shortSummary: 'Aries represents the golden-fleeced ram that rescued two royal children, whose precious fleece later became the legendary quest of Jason and the Argonauts.',
    fullStory: `Phrixus and Helle were the children of King Athamas of Boeotia. Their stepmother Ino hated them and plotted their destruction, convincing the king that the gods demanded the children be sacrificed to end a drought.

Just as the children were to be killed, a magnificent ram with a fleece of pure gold appeared — sent by their mother Nephele, a cloud goddess, to rescue them. The children climbed onto the ram's back and it flew into the sky, carrying them across the sea.

Tragically, Helle lost her grip and fell into the strait below, which was thereafter named the Hellespont (now the Dardanelles) in her honour. Phrixus arrived safely in Colchis on the eastern shore of the Black Sea, where he sacrificed the ram to Zeus and gave its golden fleece to the local king, Aeëtes.

The fleece was hung in a sacred grove, guarded by a dragon that never slept. It became the most famous treasure of the ancient world — and the quest of Jason and the Argonauts.

The ram itself was placed among the stars by Zeus in honour of its brave service.`,
    funFacts: [
      'Aries was considered the first constellation of the zodiac in ancient times, as the Sun was in Aries at the spring equinox around 2000 BC.',
      'Due to the precession of Earth\'s axis, the spring equinox has since moved into Pisces, but Aries retains its "first" status in astrology.',
      'The brightest star in Aries, Hamal, was used by ancient navigators to determine the time of year.',
    ],
    imageUrl: null,
  },

  virgo_myth: {
    id: 'virgo_myth',
    objectName: 'Virgo — the Maiden',
    culture: 'Greek',
    shortSummary: 'Virgo represents Persephone, daughter of the harvest goddess Demeter, whose abduction to the Underworld created the seasons of the year.',
    fullStory: `Persephone was the beloved daughter of Demeter, goddess of the harvest and the earth's fertility. While gathering flowers in a meadow, she was seized by Hades, god of the Underworld, who burst through the earth and dragged her down to his kingdom.

Demeter was devastated. She searched the world in grief, and while she mourned the earth grew barren — crops withered, trees shed their leaves, animals had no food. Famine spread across the land, and the prayers of humanity rose to the heavens.

Zeus finally intervened, ordering Hades to return Persephone. But Hades had tricked her into eating six pomegranate seeds while in the Underworld, and anyone who eats the food of the dead must return there. A compromise was reached: Persephone would spend six months of the year below the earth with Hades, and six months with her mother.

When Persephone returns in spring, Demeter rejoices and the earth blooms. When she descends again in autumn, Demeter's sorrow brings winter. The constellation Virgo disappears from the night sky in autumn and returns in spring, following the same rhythm as the seasons she created.`,
    funFacts: [
      'Virgo is the second largest constellation in the sky, after Hydra.',
      'Spica, the brightest star in Virgo, helped Hipparchus discover the precession of Earth\'s axis in 127 BC.',
      'The Virgo Cluster, a massive group of around 1,300 galaxies, lies within this constellation.',
    ],
    imageUrl: null,
  },

  libra_myth: {
    id: 'libra_myth',
    objectName: 'Libra — the Scales',
    culture: 'Greek',
    shortSummary: 'Libra represents the scales of justice held by Astraea, the last of the immortals to leave the earth, who weighed the souls of the dead.',
    fullStory: `In the Golden Age of humanity, when the gods still walked openly among mortals, Astraea was the goddess of innocence and justice. She lived on earth among human beings, teaching them fairness and law.

As humanity grew more corrupt through the Silver and Bronze Ages, the gods one by one abandoned the earth and retreated to the heavens. Astraea was the last to leave. She loved humanity even in its fallen state, and clung to hope longer than any other immortal. But eventually even she could bear humanity's cruelty and injustice no more, and she rose to the heavens.

Zeus placed her among the stars as the constellation Virgo, and her scales — with which she weighed the souls of the dead and judged their deeds — became the neighbouring constellation Libra.

Libra is the only zodiac constellation that represents an object rather than a living creature, and its position next to Virgo forever links justice with wisdom.`,
    funFacts: [
      'Libra is the only zodiac constellation that does not represent a person or animal.',
      'In ancient times, Libra\'s stars were considered part of Scorpius, forming the scorpion\'s claws.',
      'The bright star Zubenelgenubi means "the southern claw" in Arabic, reflecting its original role in Scorpius.',
    ],
    imageUrl: null,
  },

  sagittarius_myth: {
    id: 'sagittarius_myth',
    objectName: 'Sagittarius — the Archer',
    culture: 'Greek',
    shortSummary: 'Sagittarius is often linked to Chiron, the wisest of the centaurs, who taught heroes like Achilles and Hercules and was placed among the stars by Zeus.',
    fullStory: `Among the centaurs — creatures who were half human and half horse — Chiron stood apart. While most centaurs were wild, violent, and given to drinking, Chiron was extraordinarily wise, gentle, and learned. He was the son of Cronus (father of Zeus) and was therefore immortal.

Chiron made his home on Mount Pelion, where he became the greatest teacher in Greece. Heroes came from across the known world to learn from him: Achilles learned music, medicine, and the arts of war; Jason learned navigation; Asclepius learned healing; even young Hercules spent time in his care.

One day, Hercules visited his friend Pholus, another centaur, who opened a jar of communal wine that belonged to all centaurs. The smell attracted wild centaurs who attacked in a drunken rage. Hercules defended himself with his famous poisoned arrows — dipped in the blood of the Hydra. In the chaos, an arrow accidentally struck Chiron.

The wound was agonising. Chiron, being immortal, could not die, but neither could the poison be healed. He endured terrible suffering for days before finally asking Zeus to be allowed to die in the place of Prometheus, who was suffering his own eternal torment. Zeus agreed, and in death Chiron was placed with honour among the stars.`,
    funFacts: [
      'Sagittarius points towards the centre of the Milky Way galaxy — the richest star fields in the sky lie in this direction.',
      'The pattern of eight stars known as the "Teapot" in Sagittarius is one of the most recognisable asterisms after the Big Dipper.',
      'More Messier objects lie in Sagittarius than in any other constellation — it contains star clusters, nebulae, and more.',
    ],
    imageUrl: null,
  },

  capricornus_myth: {
    id: 'capricornus_myth',
    objectName: 'Capricornus — the Sea Goat',
    culture: 'Greek',
    shortSummary: 'Capricornus represents Pan, the goat-god, who leapt into the Nile and transformed himself into a sea creature to escape the monster Typhon.',
    fullStory: `Typhon was the most terrible monster ever born — the last great challenger to the rule of the Olympian gods. He was so vast his head brushed the stars, his arms stretched from east to west, and his lower body was a mass of writhing serpents. When he attacked Olympus, the gods fled in terror.

Pan, the wild goat-god of nature and music, was among those who fled. In a panic he leapt into the River Nile, intending to transform himself into a fish to escape. But in his haste and fear the transformation went wrong — he became a creature that was a goat above the water and a fish below, an odd hybrid that became known as the sea-goat.

Zeus, who had not fled but stayed to fight Typhon, was eventually victorious after a tremendous battle. He looked back at the gods who had run away and saw Pan's peculiar transformation, which made even the mighty Zeus laugh. To commemorate the moment, he placed the image of the sea-goat in the sky as Capricornus.`,
    funFacts: [
      'Capricornus is one of the oldest recognised constellations, with records of it from ancient Babylon over 3,000 years ago.',
      'Despite being a zodiac constellation, Capricornus is quite faint — none of its stars are particularly bright.',
      'The Sun is in Capricornus during January and February, though the "Tropic of Capricorn" was named when the Sun was there at the winter solstice, thousands of years ago.',
    ],
    imageUrl: null,
  },

  aquarius_myth: {
    id: 'aquarius_myth',
    objectName: 'Aquarius — the Water Bearer',
    culture: 'Greek',
    shortSummary: 'Aquarius represents Ganymede, a beautiful Trojan prince abducted by Zeus\'s eagle and brought to Olympus to serve as cupbearer to the gods.',
    fullStory: `Ganymede was the son of Tros, king of Troy, and was considered the most beautiful mortal alive. He tended his father's sheep on the slopes of Mount Ida when Zeus, king of the gods, noticed him from Olympus.

Zeus was so captivated by the young man's beauty that he resolved to have him as the cupbearer of the gods — the attendant who poured the divine nectar at the gods' feasts. He sent his great eagle Aquila down to Troy, and the bird swooped down and carried Ganymede up to Olympus in its talons.

Once there, Ganymede was granted immortality and eternal youth, and took his place among the gods, pouring nectar from a golden jug whenever called upon. His place was taken from Hebe, the goddess of youth, which caused some resentment among the gods.

Zeus, knowing that Ganymede's father grieved for his lost son, gave King Tros a herd of divine horses as compensation. He placed Ganymede among the stars as Aquarius, eternally pouring the waters of life from his jar.`,
    funFacts: [
      'The Aquarid meteor showers (Eta Aquarids in May and Delta Aquarids in July) both radiate from Aquarius.',
      'Aquarius contains the Helix Nebula, one of the closest planetary nebulae to Earth, sometimes called the "Eye of God".',
      'Aquarius is one of the oldest recognised constellations, mentioned in ancient Babylonian star catalogues.',
    ],
    imageUrl: null,
  },

  pisces_myth: {
    id: 'pisces_myth',
    objectName: 'Pisces — the Fish',
    culture: 'Greek',
    shortSummary: 'Pisces represents Aphrodite and her son Eros, who transformed into fish and tied themselves together with a cord to escape the monster Typhon.',
    fullStory: `When the terrible monster Typhon attacked Olympus, the gods fled in every direction, disguising themselves as animals. Aphrodite, goddess of love, and her son Eros (the god of love) fled to the banks of the River Euphrates in Syria.

Seeing no other escape as Typhon closed in, they leapt into the river and transformed into fish. Afraid of being separated in the rushing current and losing each other forever, they tied themselves together with a cord before diving into the water.

They swam to safety, and afterwards Aphrodite, moved by her son's quick thinking, asked Zeus to place the image of the two fish among the stars, tied together with a ribbon, as Pisces — a monument to maternal love and the bonds that hold us to those we care for.

The constellation is faint and scattered, but the cord that ties the two fish together is represented by a line of stars connecting their tails.`,
    funFacts: [
      'The vernal equinox — the moment when the Sun crosses the celestial equator in spring — is currently in Pisces, making it astronomically important.',
      'Pisces is the twelfth and final sign of the zodiac, associated with endings and new beginnings.',
      'The star Alrescha, which marks the knot of the cord binding the two fish, is a binary star system.',
    ],
    imageUrl: null,
  },

  auriga_myth: {
    id: 'auriga_myth',
    objectName: 'Auriga — the Charioteer',
    culture: 'Greek',
    shortSummary: 'Auriga represents Erichthonius, the legendary king of Athens who invented the four-horse chariot and was rewarded with a place among the stars.',
    fullStory: `Erichthonius was no ordinary child. Born from the earth itself after Hephaestus, god of the forge, tried to embrace Athena, the goddess recoiled and the resulting child was given to Gaia to raise. He was part man, part serpent from the waist down.

Despite — or perhaps because of — his unusual nature, Erichthonius showed extraordinary ingenuity. He was the first person to tame four horses together and harness them to a chariot, creating the quadriga. Before this invention, chariots had used only two horses. The four-horse chariot was a revolution in war and ceremony.

Erichthonius went on to become king of Athens, where he built the original temple to Athena on the Acropolis and established many of the city's most important religious festivals. He was revered as one of Athens' founding heroes.

Athena, who had always felt a bond with this unusual child, persuaded Zeus to place him among the stars as the Charioteer — Auriga — driving his chariot across the sky.`,
    funFacts: [
      'Capella, the brightest star in Auriga and sixth brightest in the night sky, is actually a system of four stars.',
      'Auriga contains three Messier open star clusters: M36, M37, and M38.',
      'The star Epsilon Aurigae has one of the longest known eclipses — it dims for two years at a time as an enormous unseen companion passes in front of it.',
    ],
    imageUrl: null,
  },

  bootes_myth: {
    id: 'bootes_myth',
    objectName: 'Boötes — the Herdsman',
    culture: 'Greek',
    shortSummary: 'Boötes represents a farmer who invented the plough and was honoured by the gods for his gift to humanity.',
    fullStory: `In one version of the myth, Boötes was a simple farmer who lived in poverty with his mother and his brothers, who were lazy and selfish and refused to work. Needing a way to till the earth more efficiently, he invented the plough — harnessing two oxen and dragging a blade through the soil.

This invention changed everything for humanity. Before the plough, farming was back-breaking work done with hand tools. With it, vast fields could be tilled and sown, and civilisation could grow. The gods, watching from Olympus, were so impressed by the benefit brought to humanity that Zeus placed the farmer among the stars.

In another telling, Boötes is Arcas, the son of Callisto (placed in the sky as Ursa Major), who is forever herding or following the great bear across the sky. He is sometimes depicted with hunting dogs at his heels — the small constellation Canes Venatici.

Either way, Boötes is one of the oldest recognised constellations, containing Arcturus — the fourth brightest star in the night sky.`,
    funFacts: [
      'Arcturus, the brightest star in Boötes, is a red giant and the fourth brightest star in the entire sky.',
      'Arcturus means "guardian of the bear" in Greek, as it follows Ursa Major across the sky.',
      'Arcturus was the first star to have its distance measured using a parallax method, in 1838.',
    ],
    imageUrl: null,
  },

  corona_borealis_myth: {
    id: 'corona_borealis_myth',
    objectName: 'Corona Borealis — the Northern Crown',
    culture: 'Greek',
    shortSummary: "The Northern Crown is the jewelled crown given to Ariadne by the god Dionysus after the hero Theseus abandoned her on the island of Naxos.",
    fullStory: `Ariadne was the daughter of King Minos of Crete and the keeper of the Labyrinth — the great maze that housed the Minotaur, a monster half-man, half-bull. When the Athenian hero Theseus came to Crete as one of the tribute victims destined to feed the Minotaur, Ariadne fell in love with him at first sight.

She gave him a ball of golden thread and a sword. Theseus unrolled the thread as he entered the Labyrinth, so he could find his way back. He killed the Minotaur and followed the thread back to the entrance — and to Ariadne. Together they fled Crete by ship.

But Theseus was not the hero in love that Ariadne had hoped for. On the island of Naxos, while she slept, he abandoned her and sailed away. The reasons the myths give vary — perhaps Athena ordered it, perhaps he was simply heartless.

Ariadne woke alone on the beach, weeping. But the god Dionysus, god of wine and celebration, saw her and fell immediately in love. He married her, gave her a crown of stars as a wedding gift, and swore to love her forever. When Ariadne died, Dionysus hurled the crown into the sky where it became the constellation Corona Borealis — a reminder that after every abandonment, a new joy may be waiting.`,
    funFacts: [
      'Corona Borealis forms a neat semicircle of seven stars — one of the most recognisable small patterns in the sky.',
      'The brightest star, Alphecca, means "broken ring" in Arabic, as ancient astronomers saw the crown as incomplete.',
      'T Coronae Borealis is a recurrent nova in this constellation — it explodes in brightness to become visible to the naked eye roughly every 80 years.',
    ],
    imageUrl: null,
  },

  canis_major_myth: {
    id: 'canis_major_myth',
    objectName: 'Canis Major — the Greater Dog',
    culture: 'Greek',
    shortSummary: "Canis Major represents Laelaps, Orion's faithful hunting dog, placed among the stars alongside his master. It contains Sirius, the brightest star in the sky.",
    fullStory: `Canis Major is the great hunting dog that runs at the heels of Orion across the sky. The Greeks knew the dog by several names — sometimes Laelaps, the magical dog who never failed to catch his prey.

Laelaps was a gift from Zeus and had a remarkable property: it was destined to always catch whatever it hunted. The dog was passed through several hands — from Zeus to Europa, from Europa to Minos, from Minos to Procris, and eventually to the hunter Cephalus, who brought it to Thebes where the country was being ravaged by the Teumessian Fox.

But here was a paradox: the Teumessian Fox was destined never to be caught. What happens when an unstoppable hound chases an uncatchable fox? The chase went on and on, neither ever able to win. Zeus, finding the logical impossibility amusing but unable to allow it to continue forever, solved the problem by turning them both to stone and placing them in the stars.

However, the Greeks most commonly saw Canis Major as simply one of Orion's loyal hunting dogs, running beneath him across the winter sky. Its eye is Sirius — the Dog Star — the brightest star in all the night sky.`,
    funFacts: [
      'Sirius, at the heart of Canis Major, is the brightest star in the night sky at magnitude -1.46.',
      'Sirius is only 8.6 light-years away, making it one of the Sun\'s nearest neighbours.',
      'The ancient Egyptians built temples aligned with Sirius\'s rising, as it heralded the annual flooding of the Nile.',
    ],
    imageUrl: null,
  },

  canis_minor_myth: {
    id: 'canis_minor_myth',
    objectName: 'Canis Minor — the Lesser Dog',
    culture: 'Greek',
    shortSummary: "Canis Minor is Orion's smaller hunting dog, forever following its master across the winter sky. Its brightest star, Procyon, rises just before Sirius.",
    fullStory: `Where Canis Major is the great, powerful hunting hound of Orion, Canis Minor is the smaller, swifter companion — perhaps a greyhound to the mastiff of the larger dog.

The two dogs run together at Orion's heels through the winter sky, chasing the hare Lepus that cowers beneath their master's feet. Together they are known as the Canicules, or the little dogs, and they usher in the brightest region of the winter sky.

Some myths connect Canis Minor to Maera, the devoted dog of the Athenian Icarius, who was killed by shepherds who thought he had poisoned them with wine (actually the wine had simply fermented and made them drunk). His dog Maera led his daughter Erigone to his grave. Both were later turned into stars — Erigone becoming Virgo, and Maera becoming Canis Minor.

In the sky, Canis Minor's main star Procyon rises just before Sirius, earning it the ancient name "the one who rises before the dog."`,
    funFacts: [
      'Procyon is the eighth brightest star in the night sky and is only 11.5 light-years from Earth.',
      'The name Procyon comes from the Greek for "before the dog" — it rises slightly before Sirius.',
      'Procyon, like Sirius, has a faint white dwarf companion star.',
    ],
    imageUrl: null,
  },

  centaurus_myth: {
    id: 'centaurus_myth',
    objectName: 'Centaurus — the Centaur',
    culture: 'Greek',
    shortSummary: 'Centaurus represents Chiron, the wisest of the centaurs, who taught Achilles, Hercules, and many great heroes, and sacrificed his immortality to free Prometheus.',
    fullStory: `Most centaurs in Greek mythology were wild and unruly creatures — half man, half horse, prone to drunkenness and violence. Chiron was different. Born the son of the titan Cronus, he was immortal and possessed wisdom and learning that surpassed most of the gods.

Chiron lived on Mount Pelion in Thessaly, where the greatest heroes of Greece came to be educated. He taught Achilles to play the lyre and how to be honourable; he guided Jason before the voyage of the Argonauts; he trained Asclepius in the healing arts; he mentored Hercules himself.

It was the last that proved his undoing. When Hercules visited the centaur Pholus and a jar of wine was opened, wild centaurs attacked. In the chaos, one of Hercules's arrows — dipped in the lethal blood of the Hydra — accidentally struck Chiron. The wise teacher was poisoned but could not die, being immortal.

The pain was unbearable. Chiron, rather than suffer forever, agreed to give up his immortality in exchange for freeing Prometheus from his torment on the rock. Zeus, deeply moved by this selfless act, placed Chiron among the stars as Centaurus — an eternal monument to wisdom, sacrifice, and healing.`,
    funFacts: [
      'Alpha Centauri, the brightest star in Centaurus, is the closest star system to our Sun at just 4.37 light-years away.',
      'Proxima Centauri, part of the Alpha Centauri system, is the single closest star to the Sun.',
      'Centaurus contains Omega Centauri, the largest and most massive globular cluster in the Milky Way, containing millions of stars.',
    ],
    imageUrl: null,
  },

  corvus_myth: {
    id: 'corvus_myth',
    objectName: 'Corvus — the Crow',
    culture: 'Greek',
    shortSummary: 'Apollo sent his crow to fetch water, but the bird stopped to eat figs and lied about the delay — Apollo punished it by placing it in the sky unable to drink.',
    fullStory: `Apollo, the god of the sun and prophecy, had a pet crow — in those ancient days, crows were white as snow. He sent the crow to fetch water from a spring, carrying a golden cup for the task.

On the way, the crow passed a fig tree heavy with fruit. The figs were not yet ripe, but the crow was tempted and sat in the tree, waiting day after day for the figs to ripen. When they finally did, the crow feasted lazily, completely forgetting its errand.

Eventually, remembering the mission, the crow snatched up a water serpent (Hydra) and flew back to Apollo with the cup. It presented the serpent to Apollo, claiming it had been blocking the spring and causing the delay.

Apollo, being the god of prophecy, saw through the lie immediately. Furious, he turned all crows black — which is why they are black to this day. He placed the crow (Corvus), the cup (Crater), and the water serpent (Hydra) together in the sky, with the crow sitting on the serpent's back, forever unable to reach the cup of water beside it — an eternal punishment for idleness and dishonesty.`,
    funFacts: [
      'Corvus, Crater, and Hydra are three neighbouring constellations that represent the same myth.',
      'Corvus is a compact, distinctive quadrilateral of four stars making it easy to identify.',
      'The crow in the constellation is always depicted sitting on Hydra\'s back, forever denied the water in the cup.',
    ],
    imageUrl: null,
  },

  hydra_myth: {
    id: 'hydra_myth',
    objectName: 'Hydra — the Water Serpent',
    culture: 'Greek',
    shortSummary: 'Hydra is the many-headed water serpent that Hercules battled as his second labour — every head that was cut off grew back two in its place.',
    fullStory: `The Lernaean Hydra was among the most fearsome monsters ever created — a water serpent with nine heads, or some say many more, who lived in the swamps of Lerna in Argos. Its breath and even its footprints were so poisonous that they killed anyone who came near.

Defeating the Hydra was the second of Hercules's Twelve Labours. He drove it from its den with burning arrows and began to cut off its heads with his sword. But every time a head fell, two more grew in its place. Worse, an enormous crab (Cancer) was sent by Hera to bite at Hercules's feet during the battle.

Hercules's nephew Iolaus came up with the solution: after Hercules cut each head off, Iolaus would immediately brand the stump with fire, preventing new heads from growing. This is perhaps the earliest story of using fire for cauterisation.

After destroying all the mortal heads, Hercules buried the immortal central head under a rock on the road to Elaeus, where it is said to hiss still. He dipped his arrows in the Hydra's lethal blood, making them poisonous — weapons that would later cause much grief, including accidentally wounding Chiron.

The Hydra was placed among the stars as the longest constellation in the sky, stretching across a quarter of the night sky.`,
    funFacts: [
      'Hydra is the largest constellation in the sky, spanning over 100 degrees of the celestial sphere.',
      'Despite being so large, Hydra contains only one star brighter than magnitude 2 — Alphard, the "lonely one".',
      'The Hydra constellation takes five hours to fully rise above the horizon.',
    ],
    imageUrl: null,
  },

  ophiuchus_myth: {
    id: 'ophiuchus_myth',
    objectName: 'Ophiuchus — the Serpent Bearer',
    culture: 'Greek',
    shortSummary: 'Ophiuchus represents Asclepius, god of medicine, who was so skilled at healing that he could raise the dead — until Zeus struck him down for upsetting the natural order.',
    fullStory: `Asclepius was the son of Apollo, the god of the sun, and the mortal woman Coronis. He was trained in the healing arts by the wise centaur Chiron and became the greatest physician the world had ever known. He could cure any illness, mend any wound, and set broken bones to heal perfectly.

His skill grew beyond mortal medicine. He began to discover the secrets of resurrection — the ability to bring the dead back to life. Accounts vary on who he raised: the hunter Orion, the hero Hippolytus, and others. For this he used the blood of the Gorgon Medusa, given to him by Athena — blood from the left side of the Gorgon killed, while blood from the right side healed.

Hades, god of the Underworld, complained to Zeus. Dead souls were no longer arriving in his kingdom. The natural order of life and death was being disrupted. Zeus agreed, and struck Asclepius down with a thunderbolt.

Apollo was furious at the death of his son and took his revenge on the Cyclopes who had forged the thunderbolts. Zeus eventually relented and placed Asclepius among the stars as Ophiuchus, the serpent-bearer. The snake, which sheds its skin and is reborn, became the enduring symbol of medicine — the caduceus still used today.`,
    funFacts: [
      'The rod of Asclepius — a serpent coiled around a staff — remains the international symbol of medicine.',
      'Ophiuchus is sometimes called the "thirteenth zodiac constellation" as the Sun passes through it for about 18 days each December.',
      'Kepler\'s Supernova, the most recent naked-eye supernova in our galaxy, appeared in Ophiuchus in 1604.',
    ],
    imageUrl: null,
  },

  // ─── Stars ──────────────────────────────────────────────────────────────────

  sirius_myth: {
    id: 'sirius_myth',
    objectName: 'Sirius — the Dog Star',
    culture: 'Egyptian',
    shortSummary: 'The ancient Egyptians used Sirius to predict the flooding of the Nile, worshipping it as the star of the goddess Isis.',
    fullStory: `Sirius is the brightest star in the night sky and has captivated humans for thousands of years.

To the ancient Egyptians, Sirius was the star of the goddess Isis. Each year, Sirius would disappear below the horizon for 70 days, then dramatically reappear just before sunrise — an event called the heliacal rising. This reappearance always coincided with the annual flooding of the Nile, which brought rich silt that made Egypt's crops grow. The Egyptians considered Sirius the bringer of life.

The Greek word for Sirius means "glowing" or "scorching", and the Romans called the hottest days of summer the "Dog Days" because Sirius (the Dog Star) rose alongside the Sun during those weeks.

In Greek mythology, Sirius was one of Orion's faithful hunting dogs — the eye of Canis Major — placed in the sky to follow its master forever.`,
    funFacts: [
      'Sirius is only 8.6 light-years away — one of our nearest stellar neighbours.',
      'Sirius appears blue-white, indicating it burns hotter than our yellow Sun.',
      'Sirius has a companion star, Sirius B — a tiny white dwarf roughly the size of Earth but with the mass of the Sun.',
    ],
    imageUrl: null,
  },

  // ─── Planets ─────────────────────────────────────────────────────────────────

  mercury_myth: {
    id: 'mercury_myth',
    objectName: 'Mercury — Messenger of the Gods',
    culture: 'Roman',
    shortSummary: 'Mercury was the swift messenger of the gods, patron of travellers and merchants, who guided souls to the Underworld on winged sandals.',
    fullStory: `Mercury (Hermes in Greek) was the son of Jupiter and the nymph Maia. Born in a cave on Mount Cyllene, he was extraordinary from his first day of life. While still an infant, he crept from his cradle, stole the cattle of Apollo, and cleverly disguised their tracks by driving them backwards. When challenged by Apollo, the infant played him a tune on a lyre he had invented from a tortoise shell that very morning — and Apollo was so enchanted he forgave the theft and traded his cattle for the instrument.

Mercury was given the role of messenger of the gods, given winged sandals and a winged helmet to carry him between the realms, and a caduceus — a staff entwined by two serpents — as his symbol of office. He was the only god permitted to travel freely between Olympus, Earth, and the Underworld.

As psychopomp, he guided the souls of the dead on their journey to Hades. He was also the god of thieves, merchants, athletes, and boundaries — all things that involve movement and crossing from one realm to another.

The planet Mercury, darting around the Sun faster than any other planet, was named for this quicksilver god — a streak of light that appears briefly near the horizon at dawn or dusk, then vanishes.`,
    funFacts: [
      'Mercury orbits the Sun in just 88 days — faster than any other planet.',
      'Despite being closest to the Sun, Mercury is not the hottest planet. Venus is hotter because Mercury has no atmosphere to trap heat.',
      'Mercury has almost no atmosphere, so temperatures swing from 430°C in the day to -180°C at night.',
    ],
    imageUrl: null,
  },

  venus_myth: {
    id: 'venus_myth',
    objectName: 'Venus — Goddess of Love',
    culture: 'Roman',
    shortSummary: 'Venus, goddess of love and beauty, was born from the sea-foam and became the most beautiful and influential of all the Olympian gods.',
    fullStory: `Venus (Aphrodite in Greek) was born in the most unusual way. When the titan Cronus overthrew his father Uranus, he cast the severed remains into the sea. From the foam that gathered around them, Venus emerged fully formed — rising from the waves on a scallop shell, as Botticelli famously depicted two thousand years later.

She was the most beautiful being in existence, causing immediate discord among the gods when she arrived at Olympus. To prevent conflict, Zeus quickly arranged her marriage to Hephaestus, the god of the forge — the humblest and least physically impressive of the Olympians — hoping this would reduce rivalry.

It was an unhappy match. Venus's most famous love was the handsome mortal Adonis, and she famously chose the Trojan prince Paris over Athena and Hera in the Judgement of Paris. In exchange for his choice, she promised him the most beautiful woman in the world — Helen of Sparta — setting in motion the Trojan War.

The planet Venus, the brightest object in the sky after the Sun and Moon, was named for the most beautiful of the gods. It shines with a steady, warm light near the horizon at dawn or dusk.`,
    funFacts: [
      'Venus is the brightest object in the night sky after the Moon, sometimes bright enough to cast shadows.',
      'Venus rotates backwards compared to all other planets — the Sun rises in the west on Venus.',
      'A day on Venus (one rotation) is longer than a year on Venus (one orbit of the Sun).',
    ],
    imageUrl: null,
  },

  mars_myth: {
    id: 'mars_myth',
    objectName: 'Mars — God of War',
    culture: 'Roman',
    shortSummary: 'Mars was the Roman god of war and one of the most important gods in the Roman pantheon, said to be the father of Romulus and Remus, the founders of Rome.',
    fullStory: `Mars (Ares in Greek) was the god of war — not the strategic, civilised warfare of Athena, but the raw, brutal, blood-soaked chaos of battle. He was feared even by the other gods.

In Roman religion, Mars held a special place above his Greek counterpart Ares. Where the Greeks saw Ares as a troublemaker and coward (he was famously wounded by the mortal Diomedes at Troy), the Romans revered Mars as a noble, powerful protector. He was second only to Jupiter in the Roman pantheon.

The founding myth of Rome begins with Mars. A Vestal Virgin named Rhea Silvia was visited by the god, and bore him twin sons — Romulus and Remus. The twins were thrown into the Tiber by their jealous great-uncle but survived, were suckled by a she-wolf, and grew up to found the city of Rome. The Romans therefore considered themselves literally the children of Mars.

The month of March is named for Mars — it was originally the first month of the Roman calendar, when the campaign season began and armies marched to war.`,
    funFacts: [
      'Mars has the largest volcano in the solar system — Olympus Mons, three times the height of Everest.',
      'Mars has two small moons, Phobos and Deimos, named after the Greek gods of fear and dread.',
      'The red colour of Mars comes from iron oxide — rust — covering its surface.',
    ],
    imageUrl: null,
  },

  jupiter_myth: {
    id: 'jupiter_myth',
    objectName: 'Jupiter — King of the Gods',
    culture: 'Roman',
    shortSummary: 'Jupiter was king of the Roman gods, ruler of the sky and thunder, whose symbol was the eagle and whose word was law on Olympus.',
    fullStory: `Jupiter (Zeus in Greek) was the king of the Olympian gods, ruler of the sky, thunder, and lightning. He was the son of the titan Cronus, who swallowed all his children at birth, fearing a prophecy that his own son would overthrow him.

Jupiter escaped this fate when his mother Rhea substituted a stone wrapped in cloth for the infant Jupiter and hid the baby in Crete. There he was raised by nymphs and a divine goat named Amalthea, whose horn, accidentally broken, became the Cornucopia — the horn of plenty that overflows with food and drink.

When Jupiter came of age, he forced Cronus to vomit up his swallowed siblings — Juno, Neptune, Pluto, Ceres, and Vesta — and led them in a ten-year war against the Titans. Victorious, Jupiter divided the universe: he took the sky, Neptune took the seas, and Pluto took the Underworld.

Jupiter ruled not through pure power but through law and justice. His thunderbolt — forged by the Cyclopes — was his ultimate sanction, but he preferred to rule by treaty, negotiation, and the force of his divine will. His symbol of power was the eagle, which became the symbol of Rome itself.`,
    funFacts: [
      'Jupiter is the largest planet in the solar system — more than 1,300 Earths could fit inside it.',
      'Jupiter\'s Great Red Spot is a storm that has been raging for at least 350 years.',
      'Jupiter has 95 known moons, including Ganymede — the largest moon in the solar system, bigger than the planet Mercury.',
    ],
    imageUrl: null,
  },

  saturn_myth: {
    id: 'saturn_myth',
    objectName: 'Saturn — God of Time and Harvest',
    culture: 'Roman',
    shortSummary: 'Saturn ruled over a mythical Golden Age of peace and abundance, but lived in fear of a prophecy that his own son would overthrow him — as indeed Jupiter eventually did.',
    fullStory: `Saturn (Cronus in Greek) was the ruler of the universe before Jupiter. He was the youngest and cleverest of the Titans, who had overthrown his own father Uranus with an adamantine sickle.

Saturn ruled during the Golden Age — a time when the earth yielded its fruits freely without labour, when there was no war, no death before old age, and humans and gods lived as equals. His festival, the Saturnalia, was the most joyous of the Roman calendar — a week of feasting, gift-giving, and temporary suspension of social hierarchy, a memory of that paradise lost.

But Saturn carried a dark secret. He had been told by a prophecy that he would be overthrown by his own child, just as he had overthrown his father. His response was to swallow each child as it was born. He swallowed five children before his wife Rhea tricked him with a stone wrapped in cloth in place of Jupiter.

When Jupiter grew to manhood, he returned, gave Saturn a potion that made him vomit up all five children, and led his siblings in the war of the Olympians against the Titans. Saturn was defeated and cast into Tartarus. Later myths suggest he was eventually pardoned and became ruler of the Elysian Fields, where the blessed dead spend eternity.`,
    funFacts: [
      'Saturn\'s rings are made of ice and rock particles ranging in size from tiny grains to chunks as large as houses.',
      'Saturn is the least dense planet in the solar system — it would float on water.',
      'Saturn has 146 known moons, more than any other planet. Titan, its largest, has a thick atmosphere and lakes of liquid methane.',
    ],
    imageUrl: null,
  },

};
