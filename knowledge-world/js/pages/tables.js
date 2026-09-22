/* ==========================================================================
   Page: Multiplication tables 1–20 with visual groups and a quick test
   ========================================================================== */
KW.pages.tables = {
  title: 'Tables',

  render() {
    return KW.ui.pageHead({
      emoji: '✖️', c1: '#00D2A8', c2: '#7ED957', title: 'Times Tables',
      desc: 'Pick a number, watch the table build, hear it read aloud, then test yourself!',
      meta: '<span class="pill">Tables 1 – 20</span><span class="pill">👀 Visual groups</span><span class="pill">📝 Table test</span>'
    }) +
    '<section class="section container">' +
    '<div class="table-picker" id="table-picker">' + Array.from({ length: 20 }, (_, i) => '<button data-n="' + (i + 1) + '">' + (i + 1) + '</button>').join('') + '</div>' +
    '<div class="learn-toolbar"><div class="tabs" id="tbl-tabs"><button class="tab active" data-tab="learn">📖 Learn</button><button class="tab" data-tab="test">📝 Test me</button></div>' +
    '<div class="flex"><button class="btn btn-secondary" id="tbl-hear">🔊 Read the table</button></div></div>' +
    '<div id="tbl-body"></div></section>';
  },

  mount(root) {
    this.n = 2; this.body = root.querySelector('#tbl-body');
    root.querySelector('#table-picker').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      this.n = +b.dataset.n; KW.sound.click(); this.stopReading();
      this.markPicker(); this.tab === 'test' ? this.renderTest() : this.renderLearn();
    });
    root.querySelector('#tbl-tabs').addEventListener('click', e => {
      const t = e.target.closest('.tab'); if (!t) return;
      KW.utils.$$('.tab', root.querySelector('#tbl-tabs')).forEach(x => x.classList.toggle('active', x === t));
      this.tab = t.dataset.tab; KW.sound.click(); this.stopReading();
      this.tab === 'test' ? this.renderTest() : this.renderLearn();
    });
    root.querySelector('#tbl-hear').addEventListener('click', () => this.reading ? this.stopReading() : this.readTable());
    this.tab = 'learn'; this.markPicker(); this.renderLearn();
  },

  markPicker() { KW.utils.$$('#table-picker button').forEach(b => b.classList.toggle('active', +b.dataset.n === this.n)); },

  renderLearn() {
    const n = this.n;
    this.body.innerHTML =
      '<div class="table-stage"><div class="table-list" id="tbl-list">' +
      Array.from({ length: 10 }, (_, i) => '<div class="table-row" data-i="' + (i + 1) + '" style="--i:' + i + '"><span class="a">' + n + '</span><span class="op">×</span><span class="b">' + (i + 1) + '</span><span class="eq">=</span><span class="r">' + (n * (i + 1)) + '</span></div>').join('') +
      '</div><div class="table-viz" id="tbl-viz"></div></div>';
    this.body.querySelector('#tbl-list').addEventListener('click', e => {
      const r = e.target.closest('.table-row'); if (!r) return;
      this.showViz(+r.dataset.i, true);
    });
    this.showViz(1, false);
  },

  showViz(i, speak) {
    const n = this.n, emoji = KW.data.countEmojis[n % KW.data.countEmojis.length];
    KW.utils.$$('.table-row', this.body).forEach(r => r.classList.toggle('active', +r.dataset.i === i));
    const viz = this.body.querySelector('#tbl-viz');
    const groups = Array.from({ length: i }, (_, g) => '<div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap">' + Array.from({ length: n }, (_, k) => '<span class="emoji" style="--i:' + (g * n + k) + '">' + emoji + '</span>').join('') + '</div>').join('');
    viz.innerHTML = '<h3>' + i + ' group' + (i > 1 ? 's' : '') + ' of ' + n + '</h3>' +
      '<div class="viz-dots">' + (n * i <= 120 ? groups : '<p class="muted">Too many to draw, but that\'s ' + (n * i) + '!</p>') + '</div>' +
      '<div class="viz-eq">' + n + ' × ' + i + ' = ' + (n * i) + '</div>' +
      '<button class="btn btn-outline btn-sm mt-2" data-speak="' + n + ' times ' + i + ' is ' + (n * i) + '">🔊 Hear it</button>';
    KW.ui.enhance(viz);
    if (speak) { KW.sound.pop(); KW.sound.speak(n + ' times ' + i + ' is ' + (n * i)); }
  },

  readTable() {
    if (this.tab !== 'learn') return;
    const n = this.n; let i = 1; const btn = document.getElementById('tbl-hear'); btn.textContent = '⏹ Stop';
    const step = () => {
      if (i > 10) { this.stopReading(); KW.store.addStars(1, 'Table of ' + n); return; }
      this.showViz(i, false); KW.sound.speak(n + ' times ' + i + ' is ' + (n * i)); i++;
      this.reading = setTimeout(step, 2100);
    };
    step();
  },
  stopReading() { clearTimeout(this.reading); this.reading = null; KW.sound.stopSpeaking(); const b = document.getElementById('tbl-hear'); if (b) b.textContent = '🔊 Read the table'; },

  renderTest() {
    const U = KW.utils, n = this.n, body = this.body;
    const st = { i: 0, score: 0, qs: U.shuffle(Array.from({ length: 10 }, (_, k) => k + 1)) };
    body.innerHTML = '<div class="game-wrap" id="tbl-test"></div>';
    const wrap = body.querySelector('#tbl-test');
    const ask = () => {
      if (st.i >= 10) {
        const stars = st.score === 10 ? 3 : st.score >= 7 ? 2 : st.score >= 4 ? 1 : 0;
        return KW.games.shared.result(wrap, {
          gameId: 'tables', emoji: '✖️', title: stars === 3 ? 'Table master!' : 'Good practice!', stars, score: st.score,
          lines: ['✅ ' + st.score + '/10 correct', '📖 Table of ' + n], onReplay: () => this.renderTest()
        });
      }
      const b = st.qs[st.i], ans = n * b;
      const opts = new Set([ans]); while (opts.size < 4) { const d = n * U.rand(1, 10); if (d !== ans) opts.add(d); }
      wrap.innerHTML = KW.games.shared.hud([{ id: 'q', label: '❓', value: (st.i + 1) + '/10' }, { id: 'score', label: '🏅 Score', value: st.score }]) +
        '<div class="math-q">' + n + '<span class="op">×</span>' + b + '<span class="eq">=</span><span class="ans">?</span></div>' +
        '<div class="math-opts">' + U.shuffle(Array.from(opts)).map(o => '<button class="math-opt" data-v="' + o + '">' + o + '</button>').join('') + '</div>';
      KW.games.shared.quit(wrap, () => { this.tab = 'learn'; KW.utils.$$('#tbl-tabs .tab').forEach(x => x.classList.toggle('active', x.dataset.tab === 'learn')); this.renderLearn(); });
      let done = false;
      wrap.querySelector('.math-opts').addEventListener('click', e => {
        const btn = e.target.closest('.math-opt'); if (!btn || done) return; done = true;
        wrap.querySelector('.ans').textContent = ans;
        if (+btn.dataset.v === ans) { btn.classList.add('correct'); st.score++; KW.sound.correct(); }
        else { btn.classList.add('wrong'); KW.sound.wrong(); U.$$('.math-opt', wrap).find(x => +x.dataset.v === ans).classList.add('correct'); }
        st.i++; setTimeout(ask, 700);
      });
    };
    ask();
  },

  destroy() { this.stopReading(); }
};
