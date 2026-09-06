/* The Map of the Night: a vellum chart that unfolds a panel per chapter; the sheet turns over at the Long Stair. */
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
  function reached(id) { const ch = window.Game && window.Game.chapter(id); if (!ch) return false; return Store.state.visited.some(v => window.Game.sceneChapter[v] === id); }
  function render() {
    const W = 900, H = 320;
    const over = reached('ch5');
    let s = `<svg viewBox="0 0 ${W} ${H}" class="night-map">`;
    s += `<defs><linearGradient id="vellum" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${over ? '#1a1830' : '#3a2f22'}"/><stop offset="1" stop-color="${over ? '#0d0c1a' : '#241b14'}"/></linearGradient></defs>`;
    s += `<rect x="10" y="20" width="${W - 20}" height="${H - 40}" rx="8" fill="url(#vellum)" stroke="rgba(212,169,78,0.35)"/>`;
    s += `<text x="${W / 2}" y="50" text-anchor="middle" fill="rgba(212,169,78,0.8)" font-family="Cinzel,serif" font-size="16" letter-spacing="4">${over ? 'THE UNDER-MARCHES — the world is a lid' : 'THE MAP OF THE NIGHT — Thornhallow'}</text>`;
    const cols = PANELS.length, pw = (W - 60) / cols; let prev = null;
    PANELS.forEach((p, i) => {
      const x = 30 + i * pw + pw / 2, y = 170; const on = reached(p.id);
      if (prev && on) s += `<path d="M${prev.x},${prev.y} C${prev.x + pw * 0.4},${prev.y + 40} ${x - pw * 0.4},${y - 40} ${x},${y}" fill="none" stroke="var(--gold)" stroke-width="2" opacity=".9"/>`;
      s += `<g transform="translate(${x},${y})" opacity="${on ? 1 : 0.22}">`;
      s += `<rect x="-38" y="-48" width="76" height="96" rx="6" fill="rgba(0,0,0,0.25)" stroke="${on ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}" stroke-dasharray="${on ? '0' : '4 3'}"/>`;
      s += `<g fill="none" stroke="${on ? '#f2d27a' : '#888'}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" transform="scale(1.3)">${p.icon}</g>`;
      s += `<text y="64" text-anchor="middle" fill="${on ? '#e9e2d2' : '#777'}" font-family="Cormorant Garamond,serif" font-size="13">${on ? p.label : '· · ·'}</text>`;
      if (p.turn && on) s += `<text y="-58" text-anchor="middle" fill="var(--sea)" font-family="Cinzel,serif" font-size="10" letter-spacing="2">THE SHEET TURNS</text>`;
      s += `</g>`;
      if (on) prev = { x, y };
    });
    s += `</svg>`;
    return s;
  }
  window.VigilMap = { render, show: () => { const box = UI.el('div', { class: 'map-box', html: render() }); UI.modal(box, { title: 'The Map of the Night', cls: 'wide' }); } };
})();
