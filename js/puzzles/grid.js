/* Stealth grid: turn-based movement on a small graph with patrols on fixed timetables.
   cfg: { cols, rows, cells:[ids of open cells like 'A1'], edges:[['A1','A2'],...] (open passages), doors:{ 'A3|B3': {password:'VEIL', prompt} },
          start, goal, safe:['A1','B3'], patrols:[{name, path:[cell per turn, cycles]}], alarm:{cells:['B5','C5'], effect(fn)}, maxTurns, restEvery (Wren must wait every Nth move),
          labels:{cell:'Laundry'}, seen: (patrolCell, wrenCell)=>bool (default: same cell or open edge) }
   Resolves { turns, spotted, route } */
(function () {
  'use strict';
  const UI = window.VigilUI, Audio = window.VigilAudio;
  const col = (c) => c.charCodeAt(0) - 65, row = (c) => parseInt(c.slice(1), 10) - 1;

  function build(container, cfg, api) {
    return new Promise((resolve) => {
      const edgeSet = new Set(); cfg.edges.forEach(([a, b]) => { edgeSet.add(a + '|' + b); edgeSet.add(b + '|' + a); });
      const doorKey = (a, b) => cfg.doors && (cfg.doors[a + '|' + b] || cfg.doors[b + '|' + a]);
      const open = (a, b) => edgeSet.has(a + '|' + b);
      const root = UI.el('div', { class: 'pz grid-pz' });
      if (cfg.title) root.appendChild(UI.el('div', { class: 'pz-title', text: cfg.title }));
      if (cfg.note) root.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich(cfg.note) }));
      const board = UI.el('div', { class: 'grid-board' });
      const S = 84, pad = 30, W = cfg.cols * S + pad * 2, H = cfg.rows * S + pad * 2;
      const hud = UI.el('div', { class: 'react-hud' }, [UI.el('span', { class: 'g-turn' }), UI.el('span', { class: 'g-msg' })]);
      root.appendChild(hud); root.appendChild(board);
      const controls = UI.el('div', { class: 'grid-controls' });
      const mk = (t, dx, dy, wait) => UI.el('button', { class: 'btn', text: t, onclick: () => move(dx, dy, wait) });
      controls.appendChild(mk('▲ North', 0, -1)); controls.appendChild(mk('◀ West', -1, 0)); controls.appendChild(mk('Wait', 0, 0, true)); controls.appendChild(mk('▶ East', 1, 0)); controls.appendChild(mk('▼ South', 0, 1));
      root.appendChild(controls);
      const status = UI.el('div', { class: 'pz-status' }); root.appendChild(status);
      root.appendChild(UI.el('button', { class: 'btn small ghost', text: 'Start over from the Gallery', onclick: () => { reset(true); } }));
      container.appendChild(root);

      let wren, turn, lastSafe, spotted, route, movesSinceRest, alarmUntil, history;
      const revealed = {}; // patrolIndex -> set of turns whose position has been revealed
      function reset(full) { wren = cfg.start; turn = 0; lastSafe = cfg.start; spotted = full ? 0 : spotted; route = [cfg.start]; movesSinceRest = 0; alarmUntil = -1; history = []; render(); }
      function cellXY(c) { return { x: pad + col(c) * S + S / 2, y: pad + row(c) * S + S / 2 }; }
      function patrolAt(p, t) { if (alarmUntil >= t && p.alarmCell) return p.alarmCell; return p.path[((t - 1) % p.path.length + p.path.length) % p.path.length]; }
      function seenBy(pc, wc) { if (cfg.seen) return cfg.seen(pc, wc); return pc === wc || open(pc, wc); }

      function render() {
        let s = `<svg viewBox="0 0 ${W} ${H}">`;
        s += `<rect width="${W}" height="${H}" fill="rgba(0,0,0,0.35)" rx="10"/>`;
        // cells
        for (let r = 0; r < cfg.rows; r++) for (let c = 0; c < cfg.cols; c++) {
          const id = String.fromCharCode(65 + c) + (r + 1); const isOpen = cfg.cells.includes(id);
          const x = pad + c * S, y = pad + r * S;
          s += `<rect x="${x + 3}" y="${y + 3}" width="${S - 6}" height="${S - 6}" rx="6" fill="${isOpen ? (cfg.safe && cfg.safe.includes(id) ? 'rgba(127,174,94,0.15)' : 'rgba(255,255,255,0.05)') : 'rgba(0,0,0,0.6)'}" stroke="${isOpen ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0)'}"/>`;
          if (isOpen) s += `<text x="${x + 10}" y="${y + 18}" fill="rgba(233,226,210,0.35)" font-size="12" font-family="Cinzel,serif">${id}</text>`;
          if (cfg.labels && cfg.labels[id]) s += `<text x="${x + S / 2}" y="${y + S - 10}" text-anchor="middle" fill="rgba(212,169,78,0.8)" font-size="11" font-family="Cinzel,serif">${UI.esc(cfg.labels[id])}</text>`;
          if (cfg.alarm && cfg.alarm.cells.includes(id)) s += `<circle cx="${x + S - 14}" cy="${y + 14}" r="4" fill="rgba(178,58,58,0.7)"/>`;
        }
        // walls between open cells with no edge: draw thick line; doors: dashed gold
        for (const a of cfg.cells) for (const b of cfg.cells) {
          if (a >= b) continue; const dc = col(b) - col(a), dr = row(b) - row(a);
          if (Math.abs(dc) + Math.abs(dr) !== 1) continue;
          const A = cellXY(a), B = cellXY(b); const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
          const d = doorKey(a, b);
          if (!open(a, b) && !d) { s += dc ? `<line x1="${mx}" y1="${my - S / 2 + 4}" x2="${mx}" y2="${my + S / 2 - 4}" stroke="#2a2230" stroke-width="6"/>` : `<line x1="${mx - S / 2 + 4}" y1="${my}" x2="${mx + S / 2 - 4}" y2="${my}" stroke="#2a2230" stroke-width="6"/>`; }
          if (d && d.revealed !== false) { s += dc ? `<line x1="${mx}" y1="${my - 16}" x2="${mx}" y2="${my + 16}" stroke="var(--gold)" stroke-width="3" stroke-dasharray="4 3"/>` : `<line x1="${mx - 16}" y1="${my}" x2="${mx + 16}" y2="${my}" stroke="var(--gold)" stroke-width="3" stroke-dasharray="4 3"/>`; }
        }
        // goal
        const G = cellXY(cfg.goal); s += `<circle cx="${G.x}" cy="${G.y}" r="20" fill="none" stroke="var(--gold)" stroke-width="2" stroke-dasharray="3 3"/>`;
        // last turn's patrol positions (feedback)
        if (turn > 0 && cfg.revealPatrols !== false) cfg.patrols.forEach((p, i) => { const pc = patrolAt(p, turn); if (!pc) return; const P = cellXY(pc); s += `<g opacity=".85"><circle cx="${P.x}" cy="${P.y}" r="14" fill="rgba(178,58,58,0.35)" stroke="var(--blood)" stroke-width="2"/><text x="${P.x}" y="${P.y + 4}" text-anchor="middle" fill="#ffb0b0" font-size="11" font-family="Cinzel,serif">${UI.esc(p.short || p.name[0])}</text></g>`; });
        // wren
        const Wp = cellXY(wren); s += `<g><circle cx="${Wp.x}" cy="${Wp.y}" r="16" fill="rgba(212,169,78,0.3)" stroke="var(--gold-2)" stroke-width="2"/><text x="${Wp.x}" y="${Wp.y + 4}" text-anchor="middle" fill="var(--gold-2)" font-size="12" font-family="Cinzel,serif">W</text></g>`;
        // route trail
        if (route.length > 1) { let d = ''; route.forEach((c, i) => { const p = cellXY(c); d += (i ? 'L' : 'M') + p.x + ',' + p.y + ' '; }); s += `<path d="${d}" fill="none" stroke="rgba(212,169,78,0.35)" stroke-width="2"/>`; }
        s += `</svg>`;
        board.innerHTML = s;
        hud.firstChild.textContent = `Turn ${turn}${cfg.maxTurns ? ' of ' + cfg.maxTurns : ''}`;
        hud.lastChild.textContent = turn > 0 ? cfg.patrols.map(p => `${p.name}: ${patrolAt(p, turn) || '—'}`).join('   ') : '';
        if (cfg.restEvery) status.textContent = movesSinceRest >= cfg.restEvery - 1 && !status.classList.contains('bad') ? 'Wren is tiring — the next turn must be a rest.' : status.textContent;
      }

      async function move(dx, dy, wait) {
        let target = wren;
        if (!wait) {
          const c = col(wren) + dx, r = row(wren) + dy;
          if (c < 0 || r < 0 || c >= cfg.cols || r >= cfg.rows) return;
          target = String.fromCharCode(65 + c) + (r + 1);
          if (!cfg.cells.includes(target)) { status.className = 'pz-status bad'; status.textContent = 'A wall.'; Audio.sfx('wrong'); return; }
          if (cfg.restEvery && movesSinceRest >= cfg.restEvery) { status.className = 'pz-status bad'; status.textContent = 'Wren needs to rest this turn.'; Audio.sfx('wrong'); return; }
          const d = doorKey(wren, target);
          if (d) {
            const pw = prompt(d.prompt || 'A hidden door. The lintel carries a word. Speak it:');
            if (pw == null) return;
            if (String(pw).toUpperCase().replace(/[^A-Z]/g, '') !== d.password) { status.className = 'pz-status bad'; status.textContent = d.wrongText || 'The wall stays a wall.'; Audio.sfx('wrong'); return; }
            Audio.sfx('unlock'); d.revealed = true;
          } else if (!open(wren, target)) { status.className = 'pz-status bad'; status.textContent = 'A wall.'; Audio.sfx('wrong'); return; }
        }
        turn++; wren = target; route.push(wren); history.push(wren);
        movesSinceRest = wait ? 0 : movesSinceRest + 1;
        Audio.sfx('step');
        status.className = 'pz-status'; status.textContent = '';
        if (cfg.alarm && cfg.alarm.cells.includes(wren)) { alarmUntil = turn + (cfg.alarm.turns || 3); status.className = 'pz-status bad'; status.textContent = cfg.alarm.text || 'Someone raises a cry. The heavy boots come back.'; Audio.sfx('alarm'); }
        if (cfg.safe && cfg.safe.includes(wren)) lastSafe = wren;
        // check patrols
        let caught = null;
        cfg.patrols.forEach(p => { const pc = patrolAt(p, turn); if (pc && seenBy(pc, wren) && !(cfg.safe && cfg.safe.includes(wren))) caught = p; });
        if (caught) {
          spotted++; Audio.sfx('fail'); window.VigilFX.shake(board, 400);
          status.className = 'pz-status bad'; status.textContent = `${caught.name} sees Wren at ${wren}! Wren scrambles back to ${cfg.labels && cfg.labels[lastSafe] ? cfg.labels[lastSafe] : lastSafe}. (Turn ${turn} — the count keeps running.)`;
          wren = lastSafe; route = [wren]; movesSinceRest = 0;
          if (cfg.onSpotted) cfg.onSpotted(spotted);
          if (spotted >= 2) document.getElementById('hint').classList.add('attention');
        }
        render();
        if (wren === cfg.goal) { Audio.sfx('solved'); status.className = 'pz-status good'; status.textContent = cfg.successText || 'The Tower door. Wren slips through.'; Array.from(controls.children).forEach(b => b.disabled = true); setTimeout(() => resolve({ turns: turn, spotted, route: history }), 900); return; }
        if (cfg.maxTurns && turn >= cfg.maxTurns) { Audio.sfx('boom'); status.className = 'pz-status bad'; status.textContent = cfg.timeoutText || 'The third bell. Wren is still in the corridors. Start again — the patrols reset.'; if (cfg.onTimeout) cfg.onTimeout(); setTimeout(() => reset(false), 1600); }
      }
      reset(true);
    });
  }
  window.VigilGrid = { build };
})();
