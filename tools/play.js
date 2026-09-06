/* Scripted click-through: node tools/play.js script.json [--shots dir]
   script.json: { "start": "ch0_start", "flags": "A,B", "set": "K=v", "mobile": false, "steps": [ ... ] }
   steps: {"click": "selector"} | {"clickText": "Button text"} | {"type": ["selector","text"]} | {"keys": "ACM/"} (press each key, 60ms apart)
          | {"key": "Space"} | {"wait": ms} | {"waitFor": "selector"} | {"shot": "name"} | {"expect": "text"} | {"eval": "js"} | {"slots": [[3,"ASH"],[4,"EMBER"]]} (ring placement)
          | {"companion": true} switches to a phone context on companion.html; {"unlock": ["KINDLE", "cast"]} ; {"role": "reader"} ; {"tab": "sight"} */
let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) { ({ chromium } = require('/tmp/claude-0/-home-user-puzzle-game/6c53366b-c261-5c1b-b535-5225f4be0786/scratchpad/node_modules/playwright-core')); }
const { spawn } = require('child_process');
const path = require('path'), fs = require('fs');
(async () => {
  const args = process.argv.slice(2); const script = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  const get = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
  const shots = get('--shots'); if (shots) fs.mkdirSync(shots, { recursive: true });
  const port = 8700 + Math.floor(Math.random() * 200);
  const srv = spawn('python3', ['-m', 'http.server', String(port)], { cwd: path.join(__dirname, '..'), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 700));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const errors = []; const log = [];
  const hook = (p, tag) => { p.on('console', m => { if (m.type() === 'error' && !/ERR_CONNECTION|fonts.googleapis|net::/.test(m.text())) errors.push(`[${tag} console] ` + m.text()); }); p.on('pageerror', e => errors.push(`[${tag} pageerror] ` + e.message)); p.on('dialog', d => { log.push('dialog: ' + d.message()); d.accept(script.dialogText || 'VEIL'); }); };
  let page = await (await browser.newContext({ viewport: { width: 1440, height: 860 } })).newPage(); hook(page, 'hearth');
  let url = `http://localhost:${port}/index.html?scene=${encodeURIComponent(script.start)}`;
  if (script.flags) url += '&flags=' + script.flags; if (script.set) url += '&set=' + script.set;
  await page.goto(url); await page.waitForTimeout(1200);
  let n = 0;
  for (const st of script.steps) {
    n++;
    try {
      if (st.companion) { const c = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); page = await c.newPage(); hook(page, 'companion'); await page.goto(`http://localhost:${port}/companion.html`); await page.waitForTimeout(600); }
      else if (st.role) { await page.click(`.role-card:has-text("${st.role}")`); await page.waitForTimeout(300); const nm = await page.$('input.field.plain'); if (nm) { await nm.fill(st.name || 'Test'); await page.click('button:has-text("Keep it")'); await page.waitForTimeout(300); } }
      else if (st.unlock) { await page.fill('.unlock input:not(.mark)', st.unlock[0]); if (st.unlock[1]) await page.fill('.unlock input.mark', st.unlock[1]); await page.click('.unlock button'); await page.waitForTimeout(500); }
      else if (st.tab) { await page.click(`.ctab:has-text("${st.tab}")`); await page.waitForTimeout(300); }
      else if (st.click) await page.click(st.click, { timeout: st.timeout || 8000 });
      else if (st.clickText) await page.click(`button:has-text("${st.clickText}")`, { timeout: st.timeout || 8000 });
      else if (st.type) { await page.fill(st.type[0], st.type[1]); }
      else if (st.keys) { for (const k of st.keys) { await page.keyboard.press(k); await page.waitForTimeout(60); } }
      else if (st.key) await page.keyboard.press(st.key);
      else if (st.wait) await page.waitForTimeout(st.wait);
      else if (st.waitFor) await page.waitForSelector(st.waitFor, { timeout: st.timeout || 20000 });
      else if (st.slots) { for (const [slot, glyph] of st.slots) { await page.click(`.wheel .slot[data-i="${slot - 1}"]`); await page.waitForTimeout(80); if (glyph) await page.click(`.palette-grid .glyph:has-text("${glyph}")`); else await page.click('.palette-grid .glyph.empty'); await page.waitForTimeout(80); } }
      else if (st.shot) { if (shots) await page.screenshot({ path: path.join(shots, st.shot + '.png') }); }
      else if (st.expect) { const t = await page.evaluate(() => document.body.innerText); if (!t.toLowerCase().includes(String(st.expect).toLowerCase())) throw new Error('expected text not found: ' + st.expect); }
      else if (st.eval) { const r = await page.evaluate(st.eval); log.push('eval: ' + JSON.stringify(r)); }
      else if (st.log) { const t = await page.evaluate(() => ({ text: (document.getElementById('text') || document.body).innerText.slice(0, 600), buttons: Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean).slice(0, 20) })); log.push(JSON.stringify(t)); }
      if (st.pause) await page.waitForTimeout(st.pause); else await page.waitForTimeout(250);
    } catch (e) { errors.push(`[step ${n} ${JSON.stringify(st)}] ${e.message.split('\n')[0]}`); if (shots) await page.screenshot({ path: path.join(shots, `fail-step-${n}.png`) }); break; }
  }
  const scene = await page.evaluate(() => (window.VigilStore && window.VigilStore.state.scene) || (window.Companion && window.Companion.state().current) || null).catch(() => null);
  console.log(JSON.stringify({ steps: n, scene, errors, log }, null, 1));
  await browser.close(); srv.kill(); process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error('PLAY FAILED', e); process.exit(2); });
