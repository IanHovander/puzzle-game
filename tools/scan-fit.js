/* Layout check: does every scene fit on screen without scrolling?
   node tools/scan-fit.js [ch0 ch1] [--w 1280 --h 720] [--flow]
   Jumps to each scene with ?scene=, then reports:
     - the text box (#text), which shrinks its own type to fit: the size it settled on, and any
       overflow left at the smallest size it is allowed to use
     - the puzzle panel (#widget), which does NOT shrink: a puzzle whose ring, palette and commit
       button do not fit is scrolled, and players miss the half below the fold
     - the flow panel (#actions .flow-panel), which is the panel EVERY CHAPTER ENDS ON: whether it
       scrolls, whether the chart runs off the side, whether #actions runs off the bottom of the
       screen (which takes the Continue button with it), and the effective size of the chart's
       labels against the 17px floor.

   The flow panel is here because for nine chapters it was not. This tool measured exactly two
   elements, #text and #widget, and runFlow appends to neither -- so the chart at the end of every
   chapter was outside the layout gate entirely, and its labels rendered at 5.7-11.3px for as long as
   they have existed. A gate that cannot see the thing it is protecting is not a gate.

   The scene list comes from the loaded Game rather than a regex over the source: ch7 builds four of
   its scenes with a spread, and a regex for `^      id: {` never saw them. */
let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) { ({ chromium } = require('/tmp/claude-0/-home-user-puzzle-game/6c53366b-c261-5c1b-b535-5225f4be0786/scratchpad/node_modules/playwright-core')); }
const { spawn } = require('child_process');
const path = require('path');
const { loadHearth } = require('./lib-content.js');

const FLOOR = 17;   // STYLE R1.1: the game is read aloud from across a room

/* every scene of the named chapters, in chapter order, with the type that says which panels it builds */
function scenesOf(chIds) {
  const { Game } = loadHearth();
  const out = [];
  for (const id of chIds) {
    const ch = Game.chapter(id);
    if (!ch) { console.error('no such chapter: ' + id); process.exit(2); }
    for (const sid in ch.scenes) out.push({ id: sid, type: ch.scenes[sid].type || 'story' });
  }
  return out;
}

(async () => {
  const args = process.argv.slice(2);
  const get = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
  let chs = args.filter(a => /^ch\d$/.test(a)); if (!chs.length) chs = ['ch0', 'ch1'];
  const W = +get('--w', 1280), H = +get('--h', 720);
  const flowOnly = args.includes('--flow');
  let scenes = scenesOf(chs);
  if (flowOnly) scenes = scenes.filter(s => s.type === 'flow');
  const port = 8900 + Math.floor(Math.random() * 90);
  const srv = spawn('python3', ['-m', 'http.server', String(port)], { cwd: path.join(__dirname, '..'), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 700));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const page = await (await browser.newContext({ viewport: { width: W, height: H } })).newPage();
  await page.route('**://*.googleapis.com/**', r => r.abort());
  await page.route('**://*.gstatic.com/**', r => r.abort());
  const bad = [], shrunk = [], charts = [];
  const BUILDS_WIDGET = new Set(['puzzle', 'custom', 'reaction', 'token']);
  for (const sc of scenes) {
    const id = sc.id;
    await page.goto(`http://localhost:${port}/index.html?scene=${encodeURIComponent(id)}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(420);
    // The text box sizes itself before a character is typed, so it can be measured at once.
    const r = await page.evaluate(() => {
      const UI = window.VigilUI, el = document.getElementById('text');
      if (!UI || !UI.lastFit || !el) return null;
      return Object.assign({}, UI.lastFit, { scroll: el.scrollHeight > el.clientHeight + 1 });
    });
    // Everything past the typewriter is built on the keypress: the widget, and the flow panel.
    await page.keyboard.press('Space');
    /* Only wait for a widget on a scene that builds one. The old probe waited its full 6000ms on every
       prose scene -- roughly 90 of 131 -- which is where a quarter of an hour of scan time went. */
    const wid = BUILDS_WIDGET.has(sc.type) ? await page.evaluate(() => new Promise(res => {
      const t0 = Date.now(); // eslint-disable-line
      const tick = () => {
        const w = document.getElementById('widget');
        const shown = w && !w.classList.contains('hidden');
        const built = shown && w.children.length && w.scrollHeight > 40;
        if (built) return res({ over: Math.max(0, w.scrollHeight - w.clientHeight), h: w.scrollHeight, c: w.clientHeight, shown: true });
        if (Date.now() - t0 > 6000) return res({ shown: !!shown, h: w ? w.getBoundingClientRect().height : 0, over: 0 }); // eslint-disable-line
        setTimeout(tick, 120);
      };
      tick();
    })) : null;
    /* A scene may legitimately build no widget (ch7_cold puts its one button in #actions). What is not
       legitimate is an EMPTY widget still drawing its panel, which is what that looked like before. */
    if (wid && wid.shown && !wid.h) bad.push(`${id}: declares type "${sc.type}" and shows an empty puzzle panel`);
    if (wid && wid.shown && wid.h && wid.h < 40) bad.push(`${id}: shows an empty puzzle panel, ${Math.round(wid.h)}px of border and nothing in it`);
    if (wid && wid.over > 1) bad.push(`${id}: puzzle panel scrolls, ${wid.over}px below the fold`);
    /* #actions: the flow panel, the chart inside it, and whether the column runs off the screen. */
    await page.waitForTimeout(sc.type === 'flow' ? 350 : 60);
    const act = await page.evaluate(() => {
      const a = document.getElementById('actions'); if (!a) return null;
      const over = Math.max(0, Math.round(a.getBoundingClientRect().bottom - window.innerHeight));
      /* the whole two-column panel, in case a child that will not shrink blows the grid track out past
         the screen -- nothing above #panel scrolls, so anything past the right edge is simply gone */
      const pan = document.getElementById('panel');
      const wide = pan ? Math.max(0, Math.round(pan.getBoundingClientRect().right - window.innerWidth)) : 0;
      const p = a.querySelector('.flow-panel');
      if (!p) return { over, wide, flow: null };
      const wrap = p.querySelector('.flowchart-wrap'), svg = p.querySelector('.flowchart');
      let font = null, side = 0, w = 0, cut = [];
      try { cut = JSON.parse(wrap.dataset.fit || '{}').cutLabels || []; } catch (e) { cut = []; }
      if (svg) {
        const bb = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal.width;
        const scale = vb ? bb.width / vb : 1;
        const sizes = [...svg.querySelectorAll('.fc-node text')].map(t => parseFloat(getComputedStyle(t).fontSize) * scale);
        font = sizes.length ? Math.min(...sizes) : null;
        /* .flow-panel is itself overflow:auto, so on a chart wider than the panel it is the panel that
           scrolls and .flowchart-wrap reports no overflow at all. Measure whichever one actually did. */
        side = Math.max(wrap ? Math.round(wrap.scrollWidth - wrap.clientWidth) : 0, Math.round(p.scrollWidth - p.clientWidth), 0);
        w = Math.round(bb.width);
      }
      return { over, wide, flow: { panelOver: Math.max(0, p.scrollHeight - p.clientHeight), h: p.scrollHeight, font: font == null ? null : +font.toFixed(2), side, w, cut } };
    });
    if (act && act.over > 1) bad.push(`${id}: #actions runs ${act.over}px past the bottom of the screen — the Continue button is off it`);
    if (act && act.wide > 1) bad.push(`${id}: #panel runs ${act.wide}px past the right edge of the screen, and nothing scrolls to reach it`);
    if (act && act.flow) {
      const f = act.flow;
      if (f.font == null) bad.push(`${id}: flow panel has no chart to measure`);
      else if (f.font < FLOOR - 0.01) bad.push(`${id}: flow chart labels render at ${f.font}px, under the ${FLOOR}px floor`);
      /* A chart wider than its panel scrolls, with a hint that says so, and the enlarged copy shows the
         whole thing at full size -- so a few dozen pixels is a cost, not a failure. Half a chart off
         the side is a failure: that is the state the old zoom was in, 812px of 1730 hidden at once. */
      if (f.side > f.w * 0.25) bad.push(`${id}: flow chart runs ${f.side}px off the side of a ${f.w}px chart — over a quarter of it is off the panel at once`);
      if (f.panelOver > f.h * 0.5) bad.push(`${id}: over half the flow panel is below the fold (${f.panelOver}px of ${f.h}px)`);
      /* A node label the wrap had to shorten is a path the room cannot read at any size */
      for (const c of (f.cut || [])) bad.push(`${id}: flow node label "${c}" does not fit its box and is cut short`);
      charts.push(`${id}: ${f.w}px chart at ${f.font}px${f.side ? `, scrolls ${f.side}px sideways` : ''}${f.panelOver ? `, ${f.panelOver}px below the fold` : (f.side ? '' : ', fits')}`);
    }
    if (!r) continue;
    if (r.over > 0 || r.scroll) bad.push(`${id}: text still ${r.over}px over at ${r.size}px${r.scroll ? ' (scrolls)' : ''}`);
    else if (r.size && r.size < r.base) shrunk.push(`${id}: ${r.base}px -> ${r.size}px`);
  }
  console.log(`viewport ${W}x${H} — ${scenes.length} scenes`);
  console.log(shrunk.length ? 'shrunk to fit:\n  ' + shrunk.join('\n  ') : 'shrunk to fit: none');
  console.log(charts.length ? 'flow charts (17px floor; scrolling is reported, not failed, until a quarter is off the side or half below the fold):\n  ' + charts.join('\n  ') : 'flow charts: none in this range');
  console.log(bad.length ? 'STILL OVERFLOWING:\n  ' + bad.join('\n  ') : 'overflowing: none');
  console.log('(the puzzle panel does not shrink itself: anything listed above as "puzzle panel scrolls" is a real cut, not a CSS tweak)');
  await browser.close(); srv.kill(); process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error('SCAN FAILED', e); process.exit(2); });
