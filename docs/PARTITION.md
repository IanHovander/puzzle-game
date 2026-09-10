# The partition table

Every puzzle in the game, and what each one is worth when a seat is empty.

This table is the whole design premise of *What the Fire Keeps* stated as arithmetic. The game claims
to need exactly four players. That claim is only true puzzle by puzzle, and until this pass it had
only ever been checked puzzle by puzzle, by hand, by whoever was writing that chapter -- which is how
three chapters shipped with a recorded number that was wrong.

**How to read it.** *Field* is the number of distinct submissions consistent with the pages that
remain when one role is missing. *p* is the probability that a table missing that role wins anyway,
drawing distinct candidates uniformly against the budget the puzzle actually enforces. A puzzle is
four-handed when no single drop leaves a field small enough to walk. **p = 1.000 on a drop row means
that seat is free.**

**Method, and why it is trustworthy.** Every figure below was recomputed by a reviewer working from
the shipped predicates -- `cfg.check` / `accept` / `tally` with the real `Store.state` swapped
underneath -- not from the comments in the source. Before any new number was trusted, the model had to
**reproduce the figures the chapters already publish**. The list of what reproduced exactly is at the
bottom; a model that cannot reproduce a known number has no business answering a new question. This
project has twice recorded a drop-a-role figure that was confidently wrong, which is
`docs/ADVERSARIAL.md` pattern 13.

```
PUZZLE (budget) | all four | -Reader | -Listener | -Seer | -Binder
ch0_carve (free retries, not partitioned) — p 1.000
ch0_lamp (free retries, tutorial) | 1 | 4 | 2 | 4 | 4 [2 if clockwise is public] — p 1.000 every row
ch1_vote (2 asks, ONE commit) | 1 of 28 | 2 -> 0.500 | 2 -> 0.500 | 8 -> 0.125 | 3 -> 0.333 ; no pages 28 -> 0.036
ch2_door (ONE count) | 1 | 72 -> 0.014 | 24 -> 0.042 | 22 -> 0.045 | 3 -> 0.333
ch3_grid (12 turns, 11 after a bell) | — | both seams inside 2 wasted turns 4/64 -> 0.063 | 412 of 3,995 -> 0.103 | 0.103 plus a coin at each seam | 824 believed safe / 412 real -> 0.500
ch3_fight (3 tries, in the save) | 1 | 5 -> 0.600 | 6 -> 0.500 | 4 -> 0.750 | 4 -> 0.750 (honest since the ward was made to run widdershins: both the start AND the direction are the Binder's, and the Prologue spends neither for a ring of that class)
ch4_shelf (ONE pull) | 1 | 360 -> 0.003 | 360 -> 0.003 | 2 -> 0.500 | 2 -> 0.500 ; Seer+Binder both gone 3 -> 0.333
ch4_secrets (3/3/2/2 per corner) | one corner per role; the Seer's tapestry is two ordinals = 16 against 2 tries -> 0.125 (and it feeds LAW0, which ch5 gate 2 reads)
ch4_oath (ONE closing) | 2 winners | 32 -> 0.063 | 12 -> 0.167 | 8 -> 0.250 | 8 -> 0.250
ch5_gate1 (2 tries) | 1 | 336 -> 0.006 | 60 -> 0.033 | 10 -> 0.200 | 6 -> 0.333 [0.000 under the rule the game has taught: see the ch5 finding]
ch5_gate2 (2 tries) | 1 | 6,720 -> 0.0003 | 120 -> 0.017 | 10 -> 0.200 | 12 -> 0.167 [0.333 the same way]
ch5_count (3 answers) | 1 | 100 -> 0.030 whichever seat is missing; the 'it lies between the others' heuristic 0 / 0 / 0.115 / 0.115
ch5_collapse (free retries) — not partitioned by design, p 1.000
ch6_round1 (one pass, 17 of 24) | 24 PASSES | 15 fails | 15 fails | 15 fails | 15 fails ; one lane mashing 18 PASSES, two or more 16 fails
ch6_round3 (one pass, 20 of 24) | 24 PASSES | 18 fails | 5-18 fails | 18 fails | 18 fails — all 18 drop-a-page runs land on 18 exactly; a page-less lane guessing blind passes 794/4,096 = 19.4% (28.4% at size six)
ch6_strip (4 readings, in the save) | 1 | 192 -> 0.021 | 8 -> 0.500 | 8 -> 0.500 | 12 -> 0.333
ch7_sigil (NO try limit; 30+30n s of a 900 s night) | 1 | no word can be named | 4 (2 sworn) | 8 | 8 [4 if clockwise is public] — p 1.000 every row; expected cost 0 / — / 90 s / 420 s / 420 s [120 s]
ch7_binding (3 attempts, then it holds with help) — not partitioned by design; 30 s a slip
ch8 — no puzzles

WORST PAIR per puzzle (smallest field the two remaining pages reach): ch1 1 board and it is a LOSER (Reader+Seer gone: the max-keeps set is a single wrong pair, p = 0); ch2 24; ch3_fight 8; ch4_oath 16; ch5_gate1 20; ch6_strip 64; ch7_sigil 16.
```

## What the table says that the chapters did not

- **`ch7_sigil` has no try limit at all**, so every drop row is p = 1.000 and the only real cost is
  time: 90 seconds without the Listener, 420 without the Seer or the Binder, out of a 900-second
  night. This is `ADVERSARIAL.md` OPEN 2, now with numbers attached.
- **`ch3_fight`'s Binder row was wrong twice, in two different ways.** First it was 1 board, not 4:
  the Binder's page was word for word their Prologue page. Moving the ring's mark to the notch fixed
  half of that and the row was still wrong, at 2 -- because the *direction* a sigil runs is taught in
  the same four-line list, aloud, in the Binder's own mouth. Each correction made it look fixed. It
  is 4 now because a Vigil ward runs widdershins, which is on one page only.
- **`ch1_vote`'s worst pair is a loser, not a coin flip.** With the Reader and the Seer both gone the
  remaining pages reach exactly one board and it is wrong: p = 0, not p = 1.
- **`ch6`'s two reaction rounds are the strongest partition in the game.** All eighteen drop-a-page
  runs land on exactly 18 of 24, against a 20 pass mark. No page, no round.
- **`ch5`'s gates read differently under the rule the game has actually taught** than under the rule
  the chapter's comment assumes -- 0.000 rather than 0.333 for the Binder on gate 1, and the reverse
  on gate 2. Two rings, back to back, failing in opposite directions.

## Reproduced first, exactly

Reproduced-first check, every published figure I could find, all exact: ch1 'only {sorrel, oriel} reaches five' and '28 askable pairs'; ch2 1/72/24/22/3 and pairs 70/24/72/72/576/72/40,320; ch3 grid 3,995 / 869 / 1,257 / 282 blind, 412 / 50 / 34 / 4 safe, safe:['A1','B3'] 412/132/37/6 and hurt 34/1, Binder-less 824 believed vs 412 real, the Reader-less wasted-turn table 412/114/125/34/9/1; ch3 ward 5/6/4/4; ch4 shelf 1/2/2/3/360/360 and oath 3,393 legal boards, 2 accepted, 1,432 COLD, 1,121 unfilled, 838 paid wrong, fields 32/12/8/8; ch5 gate1 336/60/10/6 and gate2 6,720/120/10/12, count 100 and 0/0/0.115/0.115; ch6 stone 1/192/8/8/12 with pairs 64/3,064/2,048, raw 262,144 and 111,752 unpaged, round 1 24/18/16/16/16/15, round 3 the three bell-lists verbatim (Reader 1 6 10 14 20 24, Seer 2 5 11 15 19 22, Binder 3 7 9 12 16 21, Cold 4 8 13 17 18 23), 18 on all 18 drop-a-page runs, no-Listener 7/6/5/6/18 and 0.0% of 4,000; ch7 sigil 8 phrases, 4 legal, 1 opening, 1/4(2)/8/8 and the price ladder 60/90/120/150/180/210/240.

## Keeping it true

A number in a comment is a copy, and copies drift -- that is pattern 18. Where a figure here is
load-bearing it should be asserted by a tool, not written down: `tools/scripts/ch4-oath-check.js`,
`ch5-gate-check.js`, `ch6-stone-check.js`, `ch7-sigil-check.js` and `ch3-grid-check.js` each pin one
chapter's field sizes against the shipped predicate. Anything in this file with no check behind it is
a claim, not a fact, and the next sweep should treat it that way.
