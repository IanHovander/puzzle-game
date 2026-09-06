# HEARTHFALL

*Four fourth-year Wardens of Thornhallow, each with a different way of seeing, must get their friend Wren — the prophesied "one born of four" — through one night of politics, wards and bells to the Cold beneath their school, and decide, when the Hearth goes cold, who really has to walk in.*

A cooperative story-puzzle game for **exactly four players**, in **one sitting of about two hours**. One shared screen (the **Hearth**) runs the story, the puzzles and the group decisions; each player's phone (their **Companion**) shows what only they can see. It is an escape room, a *Myst* vault, a *Keep Talking* manual split four ways, and a *Detroit: Become Human* flowchart of the choices you made — in a fantasy of prophecy, houses and a chosen one.

No spoilers here. Read **[docs/HOST.md](docs/HOST.md)** to set up a night. Do not read `docs/DESIGN.md` unless you will never play.

## Play it

It is a static site: no build, no server-side code, no accounts.

- **GitHub Pages**: publish this repository (Settings → Pages → branch, root) and open `index.html` on the laptop, `companion.html` on the phones. A workflow in `.github/workflows/pages.yml` deploys the root on every push to `main`.
- **Locally**: `./tools/serve.sh` (a Python static server on port 8080), then open `http://<laptop-ip>:8080/` on the laptop and `.../companion.html` on phones on the same Wi-Fi. The Hearth's *Phones* button shows the QR code.

Sound on. Sit left to right: Reader, Listener, Seer, Binder. The title screen explains the rest.

## What's in the box

- Nine chapters (prologue, six chapters, finale, epilogue), ~120 minutes at a normal table, with a three-tier hint bell on every puzzle.
- One recurring puzzle grammar (a four-glyph tongue read two ways) that escalates every chapter, plus a political vote, a stealth grid, a study search, a timed per-phone count, and a four-key bell sequence that the game warns you about long before it arrives.
- Group choices (some timed), private choices fed back through opaque sealed words, a Detroit-style flowchart after every chapter, and five endings.
- Procedural everything: SVG scenes, canvas particles, WebAudio ambience and bells. No image or audio files.

## Repository layout

```
index.html            the Hearth (main screen)
companion.html        the Companion (phones)
css/                  theme, layouts, puzzle widgets
js/core/              engine: scenes, store/save, audio, fx, input, ui
js/puzzles/           widgets: ring, wheel, grid, reaction lanes, binding, seats, dial sequence, answer, dials, tiles
js/content/           lore tables, glyph grammar, shared token/cast codes, chapters ch0–ch8
js/content/companion/ phone pages per chapter, plus the shared Book
js/art/               procedural SVG scenes
docs/HOST.md          spoiler-free host guide
docs/CONVENTIONS.md   how the content is written (for contributors)
docs/DESIGN.md        the full design — SPOILERS
tools/                local server, headless test runners, scripted playthroughs
```

## Development

- `node tools/check-content.js` — static checks (every scene link resolves, every chapter registered on both screens, codes round-trip).
- `node tools/run.js <sceneId> --shots /tmp/shots` — load one scene headlessly, report console errors, screenshot.
- `node tools/play.js tools/scripts/ch0.json --shots /tmp/shots` — scripted playthroughs of a chapter (see the file header for the step vocabulary). The runners use `playwright-core` with a system Chromium; install with `npm i playwright-core` if you don't have it.

## License

Code and text in this repository: MIT. The vendored QR generator is © Kazuhiko Arase, MIT.
