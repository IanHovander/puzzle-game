# The narrator's voice (the `claude/pratchett-voice` branch)

This branch rewrites every chapter in the manner of Terry Pratchett's Discworld (Carnegie Medal): a warm, wry,
omniscient narrator who sets up a small joke about the world and then quietly lands something true. **The Prologue
(`js/content/ch0.js`) is the reference.** Read it first and match it.

The plot, the clues, the puzzles, the setups and payoffs, and the five characters do not change. Only the telling does.

## The user's words

> "I don't like this pattern where Wren talks to all 4 characters at once, it's hard to process and feels synthetic."
> "Every piece of dialog should be doing at least a couple things at once… one should be obvious and the other is
> usually setting things up or giving the beats in the story that make it feel good."
> "Make the reader care… relationships and feeling for others." "Point the reader towards what to feel and make it pay off."
> "Details matter." (Wren saying "ours" and then carving only Wren's own name read as selfish.)

## The four rules of the voice

1. **The narrator jokes about the world, never about the five.** Prophecies, Masters, Houses, rules, writs, soldiers,
   the Crown, a hundred people with matches: fair game. The Reader, Listener, Seer, Binder and Wren get affection.
   A friend can be funny; a friend is never the butt.
2. **People are shown by what they do, and the doing is their care.** Pratchett pins a person with one true
   generalisation ("Wren has never knocked on this door, on the principle that nobody knocks on their own").
   Introduce feeling through an action or a habit, not an adjective.
3. **Wren gets the jokes. The narrator gets the truth underneath.** Wren deflects with humor. The narrator, once in a
   while, lets the table see under it: "It is a good joke. Wren has clearly been working on it." This is how Wren's
   hidden fear survives the comedy. Never have Wren say the fear plainly unless the scene is built to break.
4. **Short setup, short punchline.** Pratchett writes long; the game is read aloud in boxes. One setup sentence, one
   turn. Then stop.

And the rule that makes the comedy mean anything:

5. **When it matters, the narrator goes plain.** The funnier the book, the plainer the sentence at the moment of loss.
   The oath, "Now, love. Walk.", the Provost's confession, the Cold, the endings: no jokes in the narration there.
   Wren may still joke (that is character), and the narrator lets it sit.

## No roll calls

Never have Wren (or anyone) address the four in sequence ("Reader, … Listener, … Seer, … Binder, …"). It is a list
wearing a costume. Instead:

- Each friend acts in their own sentence, in a different shape of sentence (a gesture, a line, a look, a count).
- Wren answers **one or two** people, often by dodging. Spread the others across neighbouring scenes.
- When the four read their Wren-tab lines aloud, Wren's reply on the Hearth responds to **one or two** of them
  specifically and to the whole with a single gesture or line. It does not summarise all four.
- Choices voiced through a role ("Seer: \"The Idiots.\"") stay as they are: one voice per option is fine.

## The five

| | who | how they sound | the habit that is their care |
|---|---|---|---|
| Wren | found on the Hearth's stones fourteen years ago; bright, scheming, generous, never knocks; frightened of tomorrow and hiding it | playful, quick, warm, deflects with jokes; calls the Provost "Mom" by accident | sits nearest the warm thing; gives the Reader biscuits; "four idiots" |
| Reader | studious, a bit proud, a bit shy; hates not knowing | precise; admits effort ("*Yet.* Don't laugh.") | takes unreadable words personally; forgets to eat |
| Listener | the worrier | warm, a little hesitant, trailing off | checks whether Wren's hands are cold; counts; can never hear Wren's heart |
| Seer | dry, protective, keeps secrets | short, deadpan, one dry joke | "the face"; stands between Wren and the light so nobody sees the shadow |
| Binder | earnest, stubborn, loyal, rule-bound | plain and formal; states intent | counts the rules being broken, then does it anyway; keeps tying a thread to Wren |

Others: **Provost Marrow** (Ilsabet; runs the school; raised Wren; loves Wren and has been saying goodbye for fourteen
years; never raises her voice). **Lord Vane** (the Crown's Envoy; courteous, ruthless; secretly trying to stop the
child being sacrificed; the Crown's interest is his cover). **Masters Sorrel and Oriel** and the Houses (fair game for
the narrator).

Wren takes no pronoun in narration: say "Wren". Vane calls Wren "the boy"; that is his voice, keep it.

## Motifs that cross chapters (keep them recognisable; they are callbacks)

"You're awake! Brilliant." · "four idiots" · Wren never knocks · the biscuit for the Reader · "Mom'll — the
Provost'll —" · the Seer's face · the eleven-second record for standing still · the sleeve (Wren holds the Provost's
in I; she holds Wren's at the end) · "Not coming back" · "made of stone" · the fifth blanket · Wren always sits nearest
the fire · "I'm fine" (the Listener checks anyway) · "Now, love. Walk." · "I know, Mom." · "Loved enough to walk back
in" · "I had a speech" · "It is simply a fire" · the group name (`group(s)` / GROUP_NAME) · "KNOT. The one that does
not come undone."

## The threads (do not lose an escalation)

- **Seer, the shadow:** it never points at light or warmth, only ever at the Hearth (I: the length of the hall; II:
  reaches for the Ember's case; III: in total dark, cast by nothing, toward the Hall; IV: passes the Provost's fire by;
  V: points up through the rock; VI: asked out loud, "toward the fire"; VIII: falls the right way).
- **Listener, the heartbeat:** never Wren's; the Hearth beats once in I and Wren flinches; the Ember has a slow pulse;
  Wren hums its time; the bell keeps the fire's hum but not Wren's voice; VI: "I've been hearing it all night, in the
  fire"; VIII: a pulse in Wren's throat.
- **Binder, the thread:** none to anyone; a flash from the Provost in I; the plinths' threads run into the Ember; the
  four threads bend round Wren like a knot; the Provost's is gray (a goodbye already started); the thrones' threads end
  where a fifth would begin; VI: "the knot itself"; VIII: red.
- **Reader, the name:** two alphabets on the door; Mere's sheet; the plaques; IV: *Wrenn*, the hollow of a bell;
  V: "hollow" on the thrones; VI: said; VIII: cannot read Wren's letter any more.
- **The stone:** "one born of four" → four went down → read from the foot: four, as one.
- **The clock:** midnight. **Vane:** "He lives. I promise you that." → wants the boy alive → withdraws.

## Hard constraints (unchanged from docs/STYLE.md §0 and §1)

- Never change: flag names or values, scene ids, option ids, `set:`/`next:` logic, puzzle answers/configs/checks,
  tier-3 (last) hints, attunement words and casts, Book content, glyph names. Prose may be cut; a flag write may not.
- Scene ≤ 150 words and ≤ 6 paragraphs on its worst branch. Puzzle brief ≤ 65 words, ≤ 6 paragraphs, each ≤ 18 words.
  Chapter ≤ 1,925 words, the R1.5 drafting limit (`node tools/prose-count.js chN`); its 2,125 acceptance ceiling is not room.
- `node tools/check-content.js` clean (it enforces speaker-label, semicolon and other rules).
- `node tools/scan-fit.js chN --w 1280 --h 720`: overflowing none, at most 2 shrunk. `--w 1152 --h 648`: at most one
  overflow, under 5 px.
- American spelling in player-visible text (P10); "biscuit" and "Mom" stay.
- Instruction lines (`cls: 'whisper'`/`'small'` lines that tell the table what to do), rule cards and hints are
  mechanics: leave them unless a line is pure flavor.
- Companion Sight/Speak pages carry puzzle facts: do not change any fact, number, word or figure there. The Wren tab
  (setup line + letter) may be re-voiced: the setup takes the narrator's voice; the letter is the friend's own voice
  (the table above), about 25–30 words, first person, spoken to Wren, an act of care.
