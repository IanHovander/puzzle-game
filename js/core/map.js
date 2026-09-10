/* The Map of the Night: a vellum chart, one panel per chapter, that turns over at the Long Stair.

   TWO DEFECTS FIXED IN THE INTEGRATE PASS, both invisible from inside any chapter.

   1. IT DREW EVERY CHAPTER'S PICTOGRAM FROM THE PROLOGUE. The label was gated -- an unreached panel
      printed '· · ·' -- but the icon was drawn regardless, at opacity 0.22, so a table opening the
      map in Chapter I was shown a bell, a spiral stair, a crossed circle and a rising sun: the
      bell-chamber, the Long Stair, the Cold and Dawn, seven things they had not met and two of them
      the shape of the ending. This is the same defect the Menu had (engine.js showChapterSelect
      printed all nine chapter titles) and it was fixed there in this sweep while the map, which is
      the OTHER thing that lists all nine, was not. An unreached panel is a sealed fold now: the card,
      a wax seal, and nothing else.

   2. THE TYPE WAS 10px AND 13px AGAINST A 17px FLOOR. Nine columns of place names in one 900-unit
      row, scaled into an 800px modal, put the labels at 13px and 'THE SHEET TURNS' at 10px at every
      viewport measured. It is the flowchart's disease and it has the flowchart's cure (js/core/ui.js,
      UI.flowchart): lay the chart out in REAL CSS PIXELS for the box it is going into, at a type
      size that is the floor rather than the remainder, instead of drawing it big and scaling it down.
      Nine columns in 800px is 89px a column and 'The bell-chamber' needs about 152px at 17px, so one
      row cannot be made to work by any choice of numbers -- the sheet is laid out in TWO rows, which
      is what it was always describing: five panels above the turn (the school, on the world's
      surface) and four below it (the under-marches). The turn is drawn between them.
      Measured after: every label 17px, the whole sheet 800x352 inside an 800px modal box, nothing
      clipped and nothing scaled. */
(function () {
  'use strict';
  const UI = window.VigilUI, Store = window.VigilStore;
  const PANELS = [
    { id: 'ch0', label: 'The dormitory', icon: '<rect x="-16" y="-6" width="32" height="14" rx="2"/><rect x="-16" y="-14" width="6" height="22" rx="1"/><circle cx="12" cy="-12" r="3"/>' },
    { id: 'ch1', label: 'The Great Hall', icon: '<path d="M-18,12 L-18,-6 L0,-16 L18,-6 L18,12 Z"/><path d="M-8,12 L-8,0 L8,0 L8,12"/>' },
    { id: 'ch2', label: 'The Vault', icon: '<path d="M-14,12 L-14,-4 A14,14 0 0 1 14,-4 L14,12"/><circle cx="0" cy="2" r="4"/>' },
    { id: 'ch3', label: 'The Gallery', icon: '<rect x="-16" y="-10" width="9" height="12"/><rect x="-4" y="-10" width="9" height="12"/><rect x="8" y="-10" width="9" height="12"/><path d="M-18,10 L18,10"/>' },
    { id: 'ch4', label: 'The study', icon: '<rect x="-16" y="-12" width="32" height="6"/><rect x="-16" y="-2" width="32" height="6"/><rect x="-16" y="8" width="32" height="6"/>' },
    { id: 'ch5', label: 'The Long Stair', icon: '<path d="M-16,12 L-16,6 L-8,6 L-8,0 L0,0 L0,-6 L8,-6 L8,-12 L16,-12"/>', turn: true },
    { id: 'ch6', label: 'The bell-chamber', icon: '<path d="M-10,6 L-10,0 Q-10,-12 0,-13 Q10,-12 10,0 L10,6 Z"/><circle cx="0" cy="10" r="2.5"/>' },
    { id: 'ch7', label: 'The Cold', icon: '<circle cx="0" cy="0" r="12"/><path d="M0,-12 L0,12 M-12,0 L12,0" opacity=".5"/>' },
    { id: 'ch8', label: 'Dawn', icon: '<path d="M-16,8 L16,8"/><path d="M-10,8 A10,10 0 0 1 10,8"/><path d="M0,-10 L0,-14 M-9,-6 L-12,-9 M9,-6 L12,-9"/>' },
  ];
  const TURN_AT = PANELS.findIndex(p => p.turn);          // the sheet turns over at the Long Stair
  const F = 17;                                            // the readability floor, in real screen pixels

  function reached(id) { const ch = window.Game && window.Game.chapter(id); if (!ch) return false; return Store.state.visited.some(v => window.Game.sceneChapter[v] === id); }

  /* Wrap to at most two lines at the given character width; returns the lines. */
  function wrap(text, chars) {
    const words = String(text).split(' '); const lines = []; let cur = '';
    for (const w of words) {
      if (!cur) { cur = w; continue; }
      if ((cur + ' ' + w).length <= chars) cur += ' ' + w; else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines.slice(0, 2);
  }

  /* availW: the real pixel width of the box the sheet is going into. */
  function render(availW) {
    const rows = [PANELS.slice(0, TURN_AT), PANELS.slice(TURN_AT)];
    const perRow = Math.max(rows[0].length, rows[1].length);
    const W = Math.max(520, Math.round(availW || 800));
    const cw = Math.floor((W - 24) / perRow);
    const chars = Math.max(8, Math.floor((cw - 10) / (F * 0.56)));
    const lines = Math.max(...PANELS.map(p => wrap(p.label, chars).length));
    const cardW = Math.min(cw - 14, 96), cardH = 92;
    const labelH = lines * Math.round(F * 1.2);
    const rowH = cardH + 18 + labelH + 22;
    const H = 54 + rowH * 2 + 26;
    const over = reached('ch5');

    let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="night-map" style="--nm-font:${F}px">`;
    s += `<defs><linearGradient id="vellum" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${over ? '#1a1830' : '#3a2f22'}"/><stop offset="1" stop-color="${over ? '#0d0c1a' : '#241b14'}"/></linearGradient></defs>`;
    s += `<rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="8" fill="url(#vellum)" stroke="rgba(212,169,78,0.35)"/>`;
    s += `<text x="${W / 2}" y="34" text-anchor="middle" fill="rgba(212,169,78,0.85)" font-family="Cinzel,serif" font-size="${F}" letter-spacing="3">${over ? 'THE UNDER-MARCHES — the world is a lid' : 'THE MAP OF THE NIGHT — Thornhallow'}</text>`;

    let prev = null;
    rows.forEach((row, r) => {
      const yTop = 54 + r * rowH;
      const cy = yTop + cardH / 2;
      row.forEach((p, i) => {
        const x = 12 + i * cw + cw / 2, on = reached(p.id);
        if (prev && on) {
          /* the thread only ever runs left to right within a row; across the turn it drops down the
             left edge, because that is what turning the sheet over does */
          const d = prev.r === r
            ? `M${prev.x},${prev.y} C${prev.x + cw * 0.4},${prev.y + 30} ${x - cw * 0.4},${cy - 30} ${x},${cy}`
            : `M${prev.x},${prev.y} C${prev.x + 40},${prev.y + 40} ${x - 40},${cy - 40} ${x},${cy}`;
          s += `<path d="${d}" fill="none" stroke="var(--gold)" stroke-width="2" opacity=".9"/>`;
        }
        s += `<g transform="translate(${x},${cy})">`;
        s += `<rect x="${-cardW / 2}" y="${-cardH / 2}" width="${cardW}" height="${cardH}" rx="6" fill="rgba(0,0,0,0.25)" stroke="${on ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}" stroke-dasharray="${on ? '0' : '4 3'}"/>`;
        /* An UNREACHED panel is a sealed fold. It draws no pictogram at all: the icon used to be
           drawn for every chapter from the Prologue onward, which handed the room the bell, the
           stair, the Cold and the dawn before it had met any of them. */
        if (on) s += `<g fill="none" stroke="#f2d27a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" transform="scale(1.15)">${p.icon}</g>`;
        else s += `<g opacity="0.5"><circle cx="0" cy="0" r="9" fill="none" stroke="#7a6a52" stroke-width="2"/><path d="M-5,0 L5,0" stroke="#7a6a52" stroke-width="2" stroke-linecap="round"/></g>`;
        s += `</g>`;
        const ls = on ? wrap(p.label, chars) : ['· · ·'];
        ls.forEach((ln, k) => {
          s += `<text x="${x}" y="${yTop + cardH + 18 + k * Math.round(F * 1.2)}" text-anchor="middle" fill="${on ? '#e9e2d2' : '#777'}" font-family="Cormorant Garamond,serif" font-size="${F}">${UI.esc(ln)}</text>`;
        });
        if (on) prev = { x, y: cy, r };
      });
    });
    if (reached(PANELS[TURN_AT].id)) {
      const y = 54 + rowH - 12;
      s += `<path d="M14,${y} L${W - 14},${y}" stroke="var(--sea)" stroke-width="1" stroke-dasharray="5 5" opacity=".7"/>`;
      s += `<text x="${W / 2}" y="${y - 6}" text-anchor="middle" fill="var(--sea)" font-family="Cinzel,serif" font-size="${F}" letter-spacing="2">THE SHEET TURNS</text>`;
    }
    s += `</svg>`;
    return s;
  }

  window.VigilMap = {
    render,
    show: () => {
      /* Measure, then draw: the sheet is laid out for the box it is actually going into, the way
         UI.flowchart is, rather than drawn at a fixed size and scaled down into a smear. */
      const box = UI.el('div', { class: 'map-box' });
      const m = UI.modal(box, { title: 'The Map of the Night', cls: 'wide' });
      box.innerHTML = render(Math.max(520, box.clientWidth || 800));
      return m;
    },
  };
})();
