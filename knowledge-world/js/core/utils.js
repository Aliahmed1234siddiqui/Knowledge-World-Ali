/* ==========================================================================
   Utilities
   ========================================================================== */
KW.utils = {
  $(sel, root) { return (root || document).querySelector(sel); },
  $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); },

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  sample(arr, n) { return KW.utils.shuffle(arr).slice(0, n); },
  pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
  rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },

  esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },
  pad(n) { return String(n).padStart(2, '0'); },
  fmtTime(sec) { return Math.floor(sec / 60) + ':' + KW.utils.pad(sec % 60); },

  getCategory(id) { return KW.data.categories.find(c => c.id === id); },
  allItems() {
    return KW.data.categories.flatMap(c => c.items.map(i => Object.assign({}, i, { category: c })));
  },
  /** Deterministic "item of the day" so it stays the same all day. */
  dailyItem(offset) {
    const items = KW.utils.allItems();
    const day = Math.floor(Date.now() / 86400000) + (offset || 0);
    return items[day % items.length];
  },

  debounce(fn, ms) {
    let t;
    return function () { clearTimeout(t); const a = arguments; t = setTimeout(() => fn.apply(null, a), ms); };
  },
  wait(ms) { return new Promise(r => setTimeout(r, ms)); },

  /** Split a word into letter tiles, keeping spaces out of the game. */
  letters(word) { return word.toUpperCase().replace(/[^A-Z]/g, '').split(''); }
};
