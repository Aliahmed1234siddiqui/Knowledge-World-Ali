/* ==========================================================================
   Game: Memory Match – flip cards and find pairs
   ========================================================================== */
KW.games.memory = {
  id: 'memory', name: 'Memory Match', emoji: '🧠', desc: 'Flip the cards and find all the matching pairs!',
  c1: '#6C5CE7', c2: '#8E7CFF', usesCategory: true,

  start(container, opts) {
    this.container = container; this.opts = opts || {};
    this.setup();
  },

  setup() {
    const S = KW.games.shared;
    const groups = [{ key: 'pairs', label: 'Difficulty', value: '6', options: [{ value: '4', label: '🐣 Easy · 4 pairs' }, { value: '6', label: '🙂 Medium · 6 pairs' }, { value: '8', label: '🔥 Hard · 8 pairs' }, { value: '10', label: '🚀 Expert · 10 pairs' }] }];
    if (!this.opts.categoryId) groups.unshift({ key: 'cat', label: 'World', value: 'mixed', options: S.categoryOptions() });
    S.setup(this.container, {
      emoji: this.emoji, title: this.name, desc: this.desc, groups,
      onStart: v => this.play(parseInt(v.pairs, 10), v.cat || this.opts.categoryId)
    });
  },

  play(pairs, catId) {
    const U = KW.utils, S = KW.games.shared, c = this.container;
    this.stop();
    const cat = S.category(catId, pairs);
    const items = U.sample(cat.items, pairs);
    const cards = U.shuffle(items.concat(items).map((it, i) => ({ item: it, uid: i })));
    let first = null, lock = false, moves = 0, matched = 0, seconds = 0;

    c.innerHTML =
      S.hud([{ id: 'moves', label: '🔄 Moves', value: 0 }, { id: 'time', label: '⏱️', value: '0:00' }, { id: 'pairs', label: '✅ Pairs', value: '0/' + pairs }]) +
      '<div class="memory-board ' + (pairs >= 8 ? 'cols-5' : '') + '">' +
      cards.map((cd, i) => '<button class="mem-card" data-i="' + i + '" aria-label="card"><div class="mem-inner"><div class="mem-front"></div><div class="mem-back"><span class="emoji" style="font-size:inherit">' + cd.item.emoji + '</span><span>' + U.esc(cd.item.name) + '</span></div></div></button>').join('') +
      '</div>';
    S.quit(c, () => this.setup());

    this.timer = setInterval(() => { seconds++; S.setHud('time', U.fmtTime(seconds)); }, 1000);

    const board = U.$('.memory-board', c);
    board.addEventListener('click', e => {
      const el = e.target.closest('.mem-card');
      if (!el || lock || el.classList.contains('flipped') || el.classList.contains('matched')) return;
      KW.sound.flip();
      el.classList.add('flipped');
      const card = cards[+el.dataset.i];
      if (!first) { first = { el, card }; return; }
      moves++; S.setHud('moves', moves);
      if (first.card.item.name === card.item.name) {
        el.classList.add('matched'); first.el.classList.add('matched');
        matched++; S.setHud('pairs', matched + '/' + pairs);
        KW.sound.correct(); KW.sound.speak(card.item.name);
        first = null;
        if (matched === pairs) setTimeout(() => this.win(pairs, moves, seconds, cat), 700);
      } else {
        lock = true;
        const a = first.el; first = null;
        setTimeout(() => { a.classList.remove('flipped'); el.classList.remove('flipped'); lock = false; KW.sound.wrong(); }, 750);
      }
    });
  },

  win(pairs, moves, seconds, cat) {
    this.stop();
    const stars = moves <= pairs + 2 ? 3 : moves <= pairs * 2 ? 2 : 1;
    const score = Math.max(10, 1000 - (moves - pairs) * 40 - seconds * 3);
    KW.games.shared.result(this.container, {
      gameId: this.id, title: 'You found them all!', emoji: '🎉', stars, score,
      lines: ['🔄 ' + moves + ' moves', '⏱️ ' + KW.utils.fmtTime(seconds), '🏅 Score ' + score, cat.emoji + ' ' + cat.name],
      onReplay: () => this.play(pairs, cat.id), onSetup: () => this.setup()
    });
  },

  stop() { clearInterval(this.timer); }
};
