/* THE CROSS-CHAPTER FLAG CONTRACT.
   Every flag here is written in one chapter and read in another. Renaming, dropping or changing the
   meaning of one silently breaks a payoff a later chapter has already been written against -- and
   nothing else in the project can tell: check-content.js sees a renamed flag as no flag at all, and a
   playthrough script walks whichever branch the default falls through to.

   `node tools/flag-map.js --assert` compares this list against the live scan and fails on any
   difference. A flag GONE from the live scan is a rename or a drop. A flag NEW in the live scan is a
   contract nobody declared: add it here in the same commit that creates it, deliberately.

   Generated from `node tools/flag-map.js --danger` and then owned by hand.
   37 flags. Four were added by the Integrate pass when docs/ADVERSARIAL.md OPEN 2 was settled:
   SIGIL_COLD (ch7 writes, ch8 reads), STONE_MISREAD (ch6 writes, ch8 reads) and STONE_TOLD (ch6
   writes, ch7 and ch8 read). They are the shared currency of the last two chapters -- what a wrong
   answer costs there is a recorded cost, and a recorded cost is only real once the Epilogue reads it,
   which is what these three now are. The fourth is WREN_TRUST (ch1 and ch3 write, ch8 reads): it had
   four writes and no reader anywhere in the game, printed for months as "set but never read", and
   ch3's owner could not give it a consumer without a second chapter. ch8_years is that consumer. */
module.exports = [
  "BARGAIN_",
  "BELLS_CRACKED",
  "CLUES",
  "CLUES_HELP",
  "DOOR",
  "EMBER_LOST",
  "ENDING",
  "GROUP_NAME",
  "LAW0",
  "LETTER",
  "LETTER_READ",
  "MIDNIGHT_LEFT",
  "OATH",
  "OATH_KNOT",
  "ORIEL",
  "PRECRACKED",
  "REFUSED_OATH",
  "SIGIL_COLD",
  "SOLDIERS",
  "SORREL",
  "STAIR",
  "STONE_MISREAD",
  "STONE_TOLD",
  "SURRENDERED",
  "TAPESTRY",
  "TRUTHS",
  "VANE_ACCEPT",
  "VANE_PRETEND",
  "VOLUNTEER",
  "VOTE_LOST",
  "WALK_",
  "WALK_UNLOCKED",
  "WHISPER_",
  "WREN_HURT",
  "WREN_SCARED",
  "WREN_SHOWN",
  "WREN_TRUST",
];
