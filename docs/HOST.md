# Hosting a night of HEARTHFALL — spoiler-free guide

This page contains no story spoilers. It tells you what to set up, what to expect, and what to do if something goes wrong.

## What it is

A cooperative story-puzzle game for exactly four people, played in one sitting of about two hours (hard cap ~2h15). One screen — the **Hearth** — runs the story, the puzzles and the group decisions. Each player also holds a phone — their **Companion** — showing information only they can see. Nobody can solve anything alone; the game is the conversation between the four of you.

If you enjoyed escape rooms, *Myst*, *Keep Talking and Nobody Explodes*, or the choice-and-consequence feel of *Detroit: Become Human*, this is that, in fantasy dress.

## You need

- **A laptop** connected to a TV or a big monitor, with sound on. A wireless keyboard on the table is ideal: at a few announced moments all four of you press keys on the same keyboard.
- **Four phones** (any modern browser). Each player opens the Companion page on their own phone.
- **Two hours** without interruptions, snacks, and a piece of paper and a pen for the table.

## Setting it up

The game is a static website. Everything runs in the browser; no accounts, no installs, no internet needed once the pages have loaded (except for fonts, which fall back gracefully).

**Option A — GitHub Pages (easiest for phones).** If this repository is published with GitHub Pages, open `https://<user>.github.io/<repo>/` on the laptop and `https://<user>.github.io/<repo>/companion.html` on each phone. The Hearth's *Phones* button shows a QR code for the Companion page.

**Option B — a local server on the laptop.** Phones must be on the same Wi-Fi as the laptop.

```sh
./tools/serve.sh            # or: python3 -m http.server 8080
```

Find the laptop's local IP (e.g. `192.168.1.23`), open `http://192.168.1.23:8080/` on the laptop and `http://192.168.1.23:8080/companion.html` on the phones. The *Phones* button on the Hearth shows the exact URL and a QR code once the page is served over http.

Opening `index.html` directly from the file system works for the Hearth alone, but phones cannot reach a `file://` page — use A or B.

**Option C — single-file pages.** `node tools/bundle.js` writes `dist/hearth.html` and `dist/companion.html` with everything inlined, so each is one file you can host anywhere that serves a static page (pass `--companion-url <url>` so the Hearth's *Phones* button points at wherever the Companion ended up). `--artifact` emits the same pages as fragments for hosts that supply their own page skeleton.

## Seating and roles

Sit in a row facing the screen, left to right: **the Reader, the Listener, the Seer, the Binder**. Each seat has a different gift and a different phone. Each seat also has a key on the laptop keyboard (defaults `A`, `C`, `M`, `/`, changeable on the title screen). On each phone: pick your seat, type your first name (it stays on the phone), and wait for the Hearth to show a word.

**The house rule: say what you see; never show your phone.** The game never enforces this; it is what makes the night work.

## How a chapter goes

1. The Hearth shows a **word of attunement** (sometimes with a short mark beside it). Everyone types it into their phone. The phones turn the page.
2. Everyone reads their own pages silently for a minute or so. The Hearth names a *Warden of the Hearth* (who holds the keyboard this chapter) and a *Voice* (who reads the screen aloud).
3. The story plays; puzzles appear on the Hearth; the four of you talk until you agree; the Warden enters the answer.
4. Some choices are timed — the screen always says so, and a bar counts down. Some choices are private: each phone asks you something and gives you a short sealed word to type into the Hearth. Nobody can tell what your word meant.
5. At the end of each chapter the Hearth shows the paths you took and the ones you didn't.

**Fair warning, as promised on the title screen:** one chapter, announced well in advance and preceded by a practice round, asks all four of you to press your keys in time with falling lights. It is not hard, it is not long, and the game does not end if you miss.

## Hints and time

Every puzzle has a hint bell (*Hint*, top right) with three tiers: which phone holds the missing piece; the rule you need; the answer. Hints cost nothing but pride, and the game keeps a discreet count. If a puzzle is running long, the bell pulses on its own. A comfortable night is about two hours; if you are enjoying the arguments, take longer.

The Hearth saves after every scene. Closing the laptop or the tab is fine: the title screen offers *Resume*. Phones remember their pages too. If a phone dies, open the Companion on another one, choose the same seat, and type the current word again.

## If something goes wrong

- **A key doesn't register** — use *change keys* on the title screen or in the key-claiming scene and pick four keys spread across the keyboard. Avoid modifier keys.
- **A phone can't reach the page** — it is on a different network, or the laptop's firewall blocks port 8080. GitHub Pages sidesteps this entirely.
- **The wrong scene, or a mistake you want to undo** — the menu (☰) has *Replay scene* and *Chapter select*.
- **Someone typed a private word wrong** — the Hearth just says it isn't attuned; retype it.
- **No sound** — click anywhere once (browsers require a gesture), then check the speaker icon.
- **No sound on a phone** — on an iPhone, set the Ring/Silent switch to ring (no orange showing) and turn the volume up, then press the listening button again; on Android, check the media volume. Every sound a Companion page plays is also written on that page, so nobody is stuck without it.
- **You want to start over** — menu → *Abandon game*, or *New game* on the title screen.

## For the host who wants to know more

`docs/DESIGN.md` contains the full design: story, every puzzle, every ending. **It spoils everything.** Only read it if you are not going to play.
