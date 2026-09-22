/* ==========================================================================
   Page: Numbers – 1 to 100 grid, skip counting, number stage, counting game
   ========================================================================== */
KW.pages.numbers = {
  title: 'Numbers',

  render() {
    return KW.ui.pageHead({
      emoji: '🔢', c1: '#4FB3FF', c2: '#6C5CE7', title: 'Number Land',
      desc: 'Count from 1 to 100, learn number names, skip count and play the counting game.',
      meta: '<span class="pill">1 – 100</span><span class="pill">⏭️ Skip counting</span><span class="pill">🎮 Counting game</span>'
    }) +
    '<section class="section container">' +
    '<div class="learn-toolbar"><div class="tabs" id="num-tabs">' +
    '<button class="tab active" data-tab="grid">🔢 Numbers</button><button class="tab" data-tab="count">🎮 Counting game</button></div>' +
    '<div class="flex"><button class="btn btn-secondary" id="count-song">🎵 Count to 20</button></div></div>' +
    '<div id="num-body"></div></section>';
  },

  mount(root) {
    this.body = root.querySelector('#num-body');
    root.querySelector('#num-tabs').addEventListener('click', e => {
      const t = e.target.closest('.tab'); if (!t) return;
      KW.utils.$$('.tab', root.querySelector('#num-tabs')).forEach(x => x.classList.toggle('active', x === t));
      KW.sound.click(); this.stopSong();
      t.dataset.tab === 'grid' ? this.renderGrid() : this.renderCounting();
    });
    root.querySelector('#count-song').addEventListener('click', () => this.song ? this.stopSong() : this.playSong());
    this.renderGrid();
  },

  renderGrid() {
    const U = KW.utils;
    this.body.innerHTML =
      '<div class="num-stage"><div class="num-big" id="num-big" style="--c1:#4FB3FF;--c2:#6C5CE7"></div>' +
      '<div class="num-facts" id="num-facts"></div></div>' +
      '<div class="chips mb-2" id="skip-chips">' +
      [['all', 'All numbers'], ['even', 'Even'], ['odd', 'Odd'], ['5', 'Count by 5'], ['10', 'Count by 10']].map(([v, l], i) => '<button class="chip ' + (i === 0 ? 'active' : '') + '" data-skip="' + v + '">' + l + '</button>').join('') +
      '</div>' +
      '<div class="num-grid" id="num-grid">' + Array.from({ length: 100 }, (_, i) => '<button class="num-tile" data-n="' + (i + 1) + '">' + (i + 1) + '</button>').join('') + '</div>';
    this.grid = this.body.querySelector('#num-grid');
    this.grid.addEventListener('click', e => { const t = e.target.closest('.num-tile'); if (t) this.select(+t.dataset.n, true); });
    this.body.querySelector('#skip-chips').addEventListener('click', e => {
      const c = e.target.closest('.chip'); if (!c) return;
      U.$$('.chip', this.body).forEach(x => x.classList.toggle('active', x === c));
      this.applySkip(c.dataset.skip); KW.sound.click();
    });
    this.select(this.current || 1, false);
  },

  applySkip(mode) {
    KW.utils.$$('.num-tile', this.grid).forEach(t => {
      const n = +t.dataset.n;
      let hl = false;
      if (mode === 'even') hl = n % 2 === 0; else if (mode === 'odd') hl = n % 2 === 1; else if (mode === '5') hl = n % 5 === 0; else if (mode === '10') hl = n % 10 === 0;
      t.classList.toggle('hl', hl); t.classList.toggle('dim', mode !== 'all' && !hl);
    });
  },

  select(n, speak) {
    this.current = n;
    const name = KW.data.numberName(n);
    const emoji = KW.data.countEmojis[n % KW.data.countEmojis.length];
    const big = this.body.querySelector('#num-big');
    if (!big) return;
    const dots = n <= 30 ? '<div class="num-dots">' + Array.from({ length: n }, (_, i) => '<span class="emoji" style="--i:' + i + '">' + emoji + '</span>').join('') + '</div>' : '<p class="mt-2">That\'s a big number! 🎉</p>';
    big.innerHTML = '<div class="digit anim-pop">' + n + '</div><div class="name">' + name + '</div>' + dots +
      '<button class="btn btn-ghost btn-sm mt-2" data-speak="' + n + '. ' + name + '">🔊 Hear it</button>';
    KW.ui.enhance(big);
    this.body.querySelector('#num-facts').innerHTML =
      '<h3>About ' + n + '</h3>' +
      '<div class="row"><span>Number name</span><b style="text-transform:capitalize">' + name + '</b></div>' +
      '<div class="row"><span>Even or odd?</span><b>' + (n % 2 ? 'Odd' : 'Even') + '</b></div>' +
      '<div class="row"><span>Before</span><b>' + (n - 1) + '</b></div>' +
      '<div class="row"><span>After</span><b>' + (n + 1) + '</b></div>' +
      '<div class="row"><span>Double</span><b>' + (n * 2) + '</b></div>' +
      '<div class="row"><span>Plus 10</span><b>' + (n + 10) + '</b></div>' +
      (n % 2 === 0 ? '<div class="row"><span>Half</span><b>' + (n / 2) + '</b></div>' : '') +
      '<div class="row"><span>Tens and ones</span><b>' + Math.floor(n / 10) + ' tens, ' + (n % 10) + ' ones</b></div>';
    KW.utils.$$('.num-tile', this.grid).forEach(t => t.classList.toggle('active', +t.dataset.n === n));
    if (speak) { KW.sound.pop(); KW.sound.speak(n + '. ' + name); }
  },

  playSong() {
    let i = 1; const btn = document.getElementById('count-song'); btn.textContent = '⏹ Stop';
    const step = () => {
      if (i > 20) { this.stopSong(); KW.ui.toast('🎉 You counted to 20!', 'success'); KW.store.addStars(2, 'Counting to 20'); return; }
      if (this.grid) this.select(i, false);
      KW.sound.speak(String(i)); i++;
      this.song = setTimeout(step, 1000);
    };
    step();
  },
  stopSong() { clearTimeout(this.song); this.song = null; KW.sound.stopSpeaking(); const b = document.getElementById('count-song'); if (b) b.textContent = '🎵 Count to 20'; },

  /* ---- Counting game ---- */
  renderCounting() {
    const U = KW.utils;
    this.grid = null;
    const st = { round: 0, score: 0, total: 8 };
    const body = this.body;
    const ask = () => {
      if (st.round >= st.total) {
        const stars = st.score === st.total ? 3 : st.score >= 5 ? 2 : st.score >= 3 ? 1 : 0;
        return KW.games.shared.result(body.querySelector('#count-wrap'), {
          gameId: 'counting', emoji: '🔢', title: stars === 3 ? 'Counting champion!' : 'Well counted!', stars, score: st.score,
          lines: ['✅ ' + st.score + '/' + st.total + ' correct'], onReplay: () => this.renderCounting()
        });
      }
      const n = U.rand(1, st.round < 3 ? 5 : st.round < 6 ? 10 : 15);
      const emoji = U.pick(KW.data.countEmojis);
      const opts = new Set([n]); while (opts.size < 4) { const d = n + U.rand(-3, 3); if (d >= 1) opts.add(d); }
      const wrap = body.querySelector('#count-wrap');
      wrap.innerHTML =
        KW.games.shared.hud([{ id: 'q', label: '❓', value: (st.round + 1) + '/' + st.total }, { id: 'score', label: '🏅 Score', value: st.score }]) +
        '<div class="count-stage"><h3>How many ' + emoji + ' can you count?</h3>' +
        '<div class="count-items">' + Array.from({ length: n }, (_, i) => '<span class="emoji" style="--i:' + i + '">' + emoji + '</span>').join('') + '</div>' +
        '<div class="math-opts">' + U.shuffle(Array.from(opts)).map(o => '<button class="math-opt" data-v="' + o + '">' + o + '</button>').join('') + '</div></div>';
      KW.games.shared.quit(wrap, () => { location.hash = '#/numbers'; KW.router.resolve(); });
      KW.sound.speak('How many can you count?');
      let done = false;
      wrap.querySelector('.math-opts').addEventListener('click', e => {
        const b = e.target.closest('.math-opt'); if (!b || done) return; done = true;
        if (+b.dataset.v === n) { b.classList.add('correct'); st.score++; KW.sound.correct(); KW.sound.speak(n + '! Correct!'); }
        else { b.classList.add('wrong'); KW.sound.wrong(); U.$$('.math-opt', wrap).find(x => +x.dataset.v === n).classList.add('correct'); }
        st.round++;
        setTimeout(ask, 1100);
      });
    };
    body.innerHTML = '<div class="game-wrap" id="count-wrap"></div>';
    ask();
  },

  destroy() { this.stopSong(); }
};
