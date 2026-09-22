/* ==========================================================================
   Shared game helpers – setup screen, HUD, result screen, category picking
   Every game implements: { id, name, emoji, desc, c1, c2, usesCategory, start(container, opts), stop() }
   ========================================================================== */
KW.games.shared = {
  /** All registered games (objects with an id). */
  list() { return Object.values(KW.games).filter(g => g && g.id); },

  /** Resolve a category for a game: fixed id, 'mixed', or random. */
  category(id, minItems) {
    minItems = minItems || 4;
    if (id && id !== 'mixed') {
      const c = KW.utils.getCategory(id);
      if (c && c.items.length >= minItems) return c;
    }
    if (id === 'mixed') {
      return { id: 'mixed', name: 'Mixed', emoji: '🌈', c1: '#6C5CE7', c2: '#F368E0', items: KW.utils.allItems(), mixed: true };
    }
    return KW.utils.pick(KW.data.categories.filter(c => c.items.length >= minItems));
  },

  categoryOptions() {
    return [{ value: 'mixed', label: '🌈 Mixed' }].concat(KW.data.categories.map(c => ({ value: c.id, label: c.emoji + ' ' + c.name })));
  },

  /**
   * Setup screen with chip groups.
   * o = { emoji, title, desc, groups: [{ key, label, options:[{value,label}], value }], startLabel, onStart(values) }
   */
  setup(container, o) {
    const U = KW.utils;
    const values = {};
    o.groups.forEach(g => { values[g.key] = g.value; });
    container.innerHTML =
      '<div class="game-setup anim-pop">' +
      '<span class="setup-emoji emoji">' + o.emoji + '</span>' +
      '<h3>' + o.title + '</h3><p>' + o.desc + '</p>' +
      o.groups.map(g =>
        '<div class="opt-group" data-group="' + g.key + '"><label>' + g.label + '</label><div class="chips">' +
        g.options.map(op => '<button class="chip ' + (op.value === g.value ? 'active' : '') + '" data-value="' + U.esc(op.value) + '">' + op.label + '</button>').join('') +
        '</div></div>').join('') +
      '<button class="btn btn-primary btn-lg" id="game-start">' + (o.startLabel || '▶ Start') + '</button>' +
      '</div>';
    U.$$('.opt-group', container).forEach(grp => {
      grp.addEventListener('click', e => {
        const chip = e.target.closest('.chip'); if (!chip) return;
        U.$$('.chip', grp).forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        values[grp.dataset.group] = chip.dataset.value;
        KW.sound.click();
      });
    });
    U.$('#game-start', container).addEventListener('click', () => { KW.sound.click(); o.onStart(values); });
  },

  /** HUD html: stats = [{ id, label, value, danger }] */
  hud(stats, extra) {
    return '<div class="game-hud"><div class="flex flex-wrap">' +
      stats.map(s => '<span class="hud-stat ' + (s.danger ? 'danger' : '') + '" id="hud-' + s.id + '-wrap">' + s.label + ' <b id="hud-' + s.id + '">' + s.value + '</b></span>').join('') +
      '</div><div class="flex">' + (extra || '') + '<button class="btn btn-sm btn-outline" id="game-quit">✕ Quit</button></div></div>';
  },
  setHud(id, value) { const el = document.getElementById('hud-' + id); if (el) el.textContent = value; },

  /**
   * Result screen. o = { gameId, title, emoji, stars (0-3), score, lines:[string], onReplay, onSetup }
   * Awards stars = o.stars, records score, celebrates.
   */
  result(container, o) {
    const isBest = KW.store.recordScore(o.gameId, o.score);
    if (o.stars > 0) KW.store.addStars(o.stars, o.title);
    const lines = (o.lines || []).slice();
    if (isBest && o.score > 0) lines.unshift('🏆 New best score!');
    container.innerHTML =
      '<div class="game-result">' +
      '<span class="result-emoji emoji">' + o.emoji + '</span>' +
      '<h3>' + o.title + '</h3>' +
      KW.ui.stars(o.stars) +
      '<div class="result-lines">' + lines.map(l => '<span>' + l + '</span>').join('') + '</div>' +
      '<div class="actions">' +
      '<button class="btn btn-primary btn-lg" id="res-replay">🔁 Play again</button>' +
      (o.onSetup ? '<button class="btn btn-outline btn-lg" id="res-setup">⚙️ Change settings</button>' : '') +
      '<a class="btn btn-outline btn-lg" href="#/games">🎮 All games</a>' +
      '</div></div>';
    if (o.stars >= 2) { KW.ui.confetti(o.stars === 3 ? 220 : 120); KW.sound.win(); } else KW.sound.lose();
    KW.utils.$('#res-replay', container).addEventListener('click', o.onReplay);
    if (o.onSetup) KW.utils.$('#res-setup', container).addEventListener('click', o.onSetup);
  },

  /** Attach quit button → back to setup. */
  quit(container, fn) {
    const q = KW.utils.$('#game-quit', container);
    if (q) q.addEventListener('click', () => { KW.sound.click(); fn(); });
  },

  /** Countdown timer helper. Calls onTick(secLeft) each second and onEnd() at zero. */
  timer(seconds, onTick, onEnd) {
    let left = seconds;
    onTick(left);
    const id = setInterval(() => {
      left--;
      onTick(left);
      if (left <= 5 && left > 0) KW.sound.tick();
      if (left <= 0) { clearInterval(id); onEnd(); }
    }, 1000);
    return { stop: () => clearInterval(id), left: () => left };
  }
};
