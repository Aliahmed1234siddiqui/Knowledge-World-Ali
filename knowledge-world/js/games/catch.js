/* ==========================================================================
   Game: Catch It! – whack-a-mole style: tap only the target word
   ========================================================================== */
KW.games.catch = {
  id: 'catch', name: 'Catch It!', emoji: '⚡', desc: 'Things pop out of the holes. Tap only the one we ask for!',
  c1: '#FF9F43', c2: '#FFC940', usesCategory: true,

  start(container, opts) { this.container = container; this.opts = opts || {}; this.setup(); },

  setup() {
    const S = KW.games.shared;
    const groups = [{ key: 'speed', label: 'Speed', value: 'normal', options: [{ value: 'slow', label: '🐢 Slow' }, { value: 'normal', label: '🐇 Normal' }, { value: 'fast', label: '⚡ Fast' }] }];
    if (!this.opts.categoryId) groups.unshift({ key: 'cat', label: 'World', value: 'mixed', options: S.categoryOptions() });
    S.setup(this.container, { emoji: this.emoji, title: this.name, desc: this.desc, groups, onStart: v => this.play(v.speed, v.cat || this.opts.categoryId) });
  },

  play(speed, catId) {
    const U = KW.utils, S = KW.games.shared, c = this.container;
    this.stop();
    const cat = S.category(catId, 6);
    const spawnMs = speed === 'slow' ? 1100 : speed === 'fast' ? 600 : 850;
    const upMs = speed === 'slow' ? 1500 : speed === 'fast' ? 950 : 1200;
    const secs = KW.config.catchSeconds;
    const st = this.state = { speed, catId: cat.id, cat, score: 0, hits: 0, misses: 0, target: null };

    c.innerHTML =
      S.hud([{ id: 'score', label: '🏅 Score', value: 0 }, { id: 'hits', label: '🎯 Hits', value: 0 }, { id: 'time', label: '⏱️', value: secs, danger: true }]) +
      '<div class="timer-bar"><span id="tbar" style="width:100%"></span></div>' +
      '<div class="catch-target">Tap the <b id="target-name"></b> <span class="emoji" id="target-emoji"></span></div>' +
      '<div class="catch-grid">' + Array.from({ length: 9 }, (_, i) => '<div class="hole" data-i="' + i + '"><span class="mole emoji"></span></div>').join('') + '</div>';
    S.quit(c, () => this.setup());

    const holes = U.$$('.hole', c);
    const holeItem = new Array(9).fill(null);
    const holeTimers = new Array(9).fill(null);

    const newTarget = () => {
      st.target = U.pick(cat.items.filter(it => !st.target || it.name !== st.target.name));
      U.$('#target-name', c).textContent = st.target.name;
      U.$('#target-emoji', c).textContent = st.target.emoji;
      KW.sound.speak('Tap the ' + st.target.name);
    };
    newTarget();

    const hide = i => { holes[i].classList.remove('up', 'hit', 'miss'); holeItem[i] = null; clearTimeout(holeTimers[i]); };
    const spawn = () => {
      const free = holes.map((_, i) => i).filter(i => !holeItem[i]);
      if (!free.length) return;
      const i = U.pick(free);
      const isTarget = Math.random() < 0.35;
      const item = isTarget ? st.target : U.pick(cat.items.filter(it => it.name !== st.target.name));
      holeItem[i] = item;
      holes[i].querySelector('.mole').textContent = item.emoji;
      holes[i].classList.add('up');
      holeTimers[i] = setTimeout(() => hide(i), upMs);
    };
    this.spawner = setInterval(spawn, spawnMs);
    spawn();

    U.$('.catch-grid', c).addEventListener('click', e => {
      const h = e.target.closest('.hole'); if (!h) return;
      const i = +h.dataset.i; const item = holeItem[i];
      if (!item || !h.classList.contains('up')) return;
      if (item.name === st.target.name) {
        st.score += 1; st.hits++; h.classList.add('hit'); KW.sound.correct();
        setTimeout(() => hide(i), 200);
        newTarget();
      } else {
        st.score = Math.max(0, st.score - 1); st.misses++; h.classList.add('miss'); KW.sound.wrong();
        setTimeout(() => h.classList.remove('miss'), 400);
      }
      S.setHud('score', st.score); S.setHud('hits', st.hits);
    });

    this.timer = S.timer(secs, left => {
      S.setHud('time', left);
      const bar = U.$('#tbar', c); if (bar) bar.style.width = (left / secs * 100) + '%';
    }, () => this.finish());
  },

  finish() {
    this.stop();
    const st = this.state;
    const stars = st.score >= 12 ? 3 : st.score >= 7 ? 2 : st.score >= 3 ? 1 : 0;
    KW.games.shared.result(this.container, {
      gameId: this.id, emoji: '⚡', title: stars === 3 ? 'Lightning fast!' : stars >= 1 ? 'Nice catching!' : 'Keep trying!',
      stars, score: st.score,
      lines: ['🎯 ' + st.hits + ' hits', '❌ ' + st.misses + ' misses', st.cat.emoji + ' ' + st.cat.name],
      onReplay: () => this.play(st.speed, st.catId), onSetup: () => this.setup()
    });
  },

  stop() {
    clearInterval(this.spawner);
    if (this.timer) { this.timer.stop(); this.timer = null; }
  }
};
