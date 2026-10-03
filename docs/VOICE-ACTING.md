# Voice acting

The story is read aloud. The narrator, Wren, the Provost and every other grown-up are voiced by the
game. The four players' own lines are not. When one of the four speaks, the words light up in that
player's colour, a banner says *read this aloud*, and the player reads it. The story then goes on.

`docs/VOICE.md` is about how the prose is written. This page is about how it sounds.

## How it plays

- `js/core/voice.js` reads each paragraph as `UI.typewrite` shows it. It works out who says each
  quotation (a "says Wren" after the quote, a "says the Seer" before it, or a short sentence starting
  with the speaker just before it). Unattributed quotes stay with the narrator.
- A line plays from a recording when `js/content/voice-manifest.js` lists it. Otherwise the browser's
  own voice reads it, cast by name preference and rate/pitch in `CAST`.
- Recordings are keyed by `VigilVoice.key(who, text)`. If a line's text changes, its recording stops
  matching and the browser voice takes over until the line is recorded again. Nothing goes stale silently.
- A player cue ends when that player presses their key or Enter, or clicks **Said it**. With
  **Listen for our lines** on (Menu), it also ends when the microphone hears someone speak. This is a
  level meter only: nothing is recorded, transcribed or sent anywhere. Failing all of those, the cue
  ends after a generous timeout.
- Menu → **Narrator** turns the voice off. It is off by default under automation (`navigator.webdriver`).

## The narrator

An older British storyteller, warm and unhurried, reading a comic novel aloud by a fire to people
they are fond of. Think of the Discworld audiobooks. This narrator is amused by the world and its
institutions, never by the children in it.

**How the wry lines land.** Almost all of it is timing.

1. **Setup at an ordinary pace.** Don't signal that a joke is coming.
2. **A beat before the turn.** The turn is usually the short last sentence of a paragraph ("Wren knows
   nothing about it, loudly."). Pause just long enough for the table to lean in.
3. **The turn quieter and flatter**, as though it were obvious. Never lean on it, never laugh at your
   own line, never do a comic voice.
4. **Leave room after it.** The laugh, if it comes, happens in the silence.
5. **Documents are read like a bored clerk** (the Register, the order of business). Flatness is the joke,
   and later it is the horror.
6. **Drop the smile completely for the stakes.** Plain, slower, a little lower, every word placed. "Wren
   has been told to wear something warm" is said gently, almost kindly, which is what makes it hurt.
7. **The prophecy is ceremonial.** It is the one line with no irony in it at all.

Wren is fourteen and quick: jokes delivered as if rehearsed (they were), getting smaller rather than
bigger when a line turns sincere. The story never says whether Wren is a boy or a girl, so the voice
does not either.

The full cast and per-line direction live in `tools/voice/direction/`:
`cast.json` (who sounds like what), `ch0.json` (a note for every line of the Prologue), and
`audition.json` (sample passages in several styles).

## Recording

`tools/voice/render.js` builds the script from the game's own text, using the same attribution and
keys the game uses, then records every non-player line. There are two voice engines.

### Kokoro (local, no key)

Kokoro-82M is an open neural voice that runs on the CPU, at roughly real time. It cannot take spoken
direction, so the acting is done with timing. Each line is spoken phrase by phrase at the game's own
phrase breaks, and the phrases are joined with silences. The turn of a joke is said slower and quieter.
A line's `pace` in the direction file sets its speed and how long its silences run: `stakes`, `omen`,
`hush` or `brisk`. The cast's `kokoro` entries pick the voices and may blend them. Wren is 60%
`bf_lily` and 40% `bm_fable`, which lands at about 163 Hz, between typical male and female pitch.

    tools/voice/setup-kokoro.sh                        # once; fills tools/voice/.cache (git-ignored)
    node tools/voice/render.js ch0 --engine kokoro     # record what is missing
    node tools/voice/render.js ch0 --engine kokoro --force
    node tools/voice/render.js ch0 --engine kokoro --only "Wren knows"

### Gemini TTS (a directable AI voice actor)

Gemini's speech models take natural-language direction. Every line is sent with an audio profile, the
scene and the director's notes from `ch0.json`, so the actor can be told *a beat before 'loudly',
deadpan*. This is the better performance, and the one to use for release.

1. Get a key at aistudio.google.com (**Get API key**).
2. Add it as `GEMINI_API_KEY` in the environment's settings (for a Claude Code cloud session: the
   environment menu → Edit → environment variables), or export it locally. Never commit it.
3. `pip install lameenc`, then:

        node tools/voice/render.js audition        # 6 voices × 3 passages → audio/voice/audition/
        node tools/voice/render.js ch0             # record what is missing
        node tools/voice/render.js ch0 --dry       # print the prompts without calling the API

Both engines write `audio/voice/<chapter>/<key>.mp3` and rewrite `js/content/voice-manifest.js` from
what is on disk. Commit both. A hosted single-file build needs the `audio/voice/` folder published
alongside it.
