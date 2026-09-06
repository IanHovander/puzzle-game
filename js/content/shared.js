/* Shared between Hearth and Companion: opaque tokens, attunement casts, helpers. */
(function () {
  'use strict';
  const S = {};
  const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 32 symbols, no O/0/I/1

  function fnv(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return h >>> 0;
  }
  function code4(str) {
    let h = fnv('vigil:' + str); let out = '';
    for (let i = 0; i < 4; i++) { out += ALPHA[h % 32]; h = Math.floor(h / 32); if (h < 32) h = fnv(str + i); }
    return out;
  }
  S.norm = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  S.fnv = fnv; S.ALPHA = ALPHA;

  /* ---------- Tokens (phone -> Hearth). Deterministic opaque 4-char code for (channel, value), unique within `values`. ---------- */
  S.token = function (channel, value, values) {
    let salt = 0;
    while (true) {
      const mine = code4(channel + '|' + value + '|' + salt);
      const clash = values.some(v => v !== value && code4(channel + '|' + v + '|' + salt) === mine);
      if (!clash) return mine;
      salt++;
    }
  };
  S.decode = function (channel, token, values) {
    token = S.norm(token);
    for (const v of values) if (S.token(channel, v, values) === token) return v;
    return null;
  };

  /* ---------- Casts (Hearth -> phone). 6 data bits + 9-bit checksum bound to the word -> 3 symbols. ---------- */
  S.cast = function (word, bits) {
    let data = Array.isArray(bits) ? bits.reduce((a, b, i) => a | ((b ? 1 : 0) << i), 0) : (bits | 0);
    data &= 63;
    const check = fnv('cast|' + S.norm(word) + '|' + data + '|' + fnv(String(data * 7919 + word.length)) ) & 511;
    const v = data | (check << 6); // 15 bits
    return ALPHA[v & 31] + ALPHA[(v >> 5) & 31] + ALPHA[(v >> 10) & 31];
  };
  S.uncast = function (word, cast) {
    cast = S.norm(cast); if (cast.length !== 3) return null;
    const a = ALPHA.indexOf(cast[0]), b = ALPHA.indexOf(cast[1]), c = ALPHA.indexOf(cast[2]); if (a < 0 || b < 0 || c < 0) return null;
    const v = a | (b << 5) | (c << 10); const data = v & 63, check = (v >> 6) & 511;
    if ((fnv('cast|' + S.norm(word) + '|' + data + '|' + fnv(String(data * 7919 + word.length))) & 511) !== check) return null;
    return data;
  };
  S.bit = (data, i) => !!((data >> i) & 1);
  S.bits = (data, i, n) => (data >> i) & ((1 << n) - 1);
  S.pack = function (spec, state) {
    // spec: [{bit, n?, key}] ; state: object of flags (booleans or small ints)
    let d = 0;
    for (const f of spec) { const v = state[f.key]; const n = f.n || 1; const iv = typeof v === 'boolean' ? (v ? 1 : 0) : (v | 0); d |= (iv & ((1 << n) - 1)) << f.bit; }
    return d & 63;
  };
  S.unpack = function (spec, data) { const o = {}; for (const f of spec) { const n = f.n || 1; const v = (data >> f.bit) & ((1 << n) - 1); o[f.key] = n === 1 ? !!v : v; } return o; };

  window.VigilShared = S;
})();
