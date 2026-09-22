/* ==========================================================================
   Game: Math Race – answer as many sums as you can in 60 seconds
   ========================================================================== */
KW.games.math = {
  id: 'math', name: 'Math Race', emoji: '🧮', desc: 'Solve as many sums as you can before time runs out!',
  c1: '#4FB3FF', c2: '#6C5CE7', usesCategory: false,

  start(container, opts) { this.container = container; this.opts = opts || {}; this.setup(); },

  setup() {
    KW.games.shared.setup(this.container, {
      emoji: this.emoji, title: this.name, desc: this.desc,
      groups: [
        { key: 'op', label: 'Operation', value: '+', options: [{ value: '+', label: '➕ Add' }, { value: '-', label: '➖ Subtract' }, { value: 'x', label: '✖️ Multiply' }, { value: 'mix', label: '🎲 Mixed' }] },
        { key: 'level', label: 'Level', value: '1', options: [{ value: '1', label: '🐣 Up to 10' }, { value: '2', label: '🙂 Up to 20' }, { value: '3', label: '🔥 Up to 50' }] }
      ],
      onStart: v => this.play(v.op, +v.level)
    });
  },

  question(op, level) {
    const U = KW.utils;
    if (op === 'mix') op = U.pick(['+', '-', 'x']);
    const max = level === 1 ? 10 : level === 2 ? 20 : 50;
    let a, b, ans, sym;
    if (op === '+') { a = U.rand(1, max); b = U.rand(1, max); ans = a + b; sym = '+'; }
    else if (op === '-') { a = U.rand(1, max); b = U.rand(1, a); ans = a - b; sym = '−'; }
    else { const m = level === 1 ? 5 : level === 2 ? 10 : 12; a = U.rand(1, m); b = U.rand(1, m); ans = a * b; sym = '×'; }
    const opts = new Set([ans]);
    let guard = 0;
    while (opts.size < 4 && guard++ < 50) {
      const d = ans + U.rand(-6, 6) * (ans > 30 ? 2 : 1);
      if (d >= 0 && d !== ans) opts.add(d);
    }
    while (opts.size < 4) opts.add(ans + opts.size * 3);
    return { a, b, ans, sym, options: U.shuffle(Array.from(opts)) };
  },

  play(op, level) {
    const U = KW.utils, S = KW.games.shared, c = this.container;
    this.stop();
    this.state = { op, level, score: 0, answered: 0, streak: 0, best: 0 };
    const st = this.state;
    const secs = KW.config.mathSeconds;

    c.innerHTML =
      S.hud([{ id: 'score', label: '🏅 Score', value: 0 }, { id: 'streak', label: '🔥 Streak', value: 0 }, { id: 'time', label: '⏱️', value: secs, danger: true }]) +
      '<div class="timer-bar"><span id="tbar" style="width:100%"></span></div>' +
      '<div id="math-area"></div>';
    S.quit(c, () => this.setup());

    this.timer = S.timer(secs, left => {
      S.setHud('time', left);
      const bar = U.$('#tbar', c); if (bar) bar.style.width = (left / secs * 100) + '%';
    }, () => this.finish());

    const area = U.$('#math-area', c);
    const ask = () => {
      const q = this.question(op, level);
      area.innerHTML =
        '<div class="math-q">' + q.a + '<span class="op">' + q.sym + '</span>' + q.b + '<span class="eq">=</span><span class="ans">?</span></div>' +
        '<div class="math-opts">' + q.options.map(o => '<button class="math-opt" data-v="' + o + '">' + o + '</button>').join('') + '</div>';
      let done = false;
      U.$('.math-opts', area).addEventListener('click', e => {
        const b = e.target.closest('.math-opt'); if (!b || done) return;
        done = true;
        U.$('.ans', area).textContent = q.ans;
        if (+b.dataset.v === q.ans) {
          b.classList.add('correct'); st.score++; st.streak++; st.best = Math.max(st.best, st.streak); KW.sound.correct();
        } else {
          b.classList.add('wrong'); st.streak = 0; KW.sound.wrong();
          U.$$('.math-opt', area).find(x => +x.dataset.v === q.ans).classList.add('correct');
        }
        st.answered++;
        S.setHud('score', st.score); S.setHud('streak', st.streak);
        setTimeout(ask, 500);
      });
    };
    ask();
  },

  finish() {
    this.stop();
    const st = this.state;
    const stars = st.score >= 15 ? 3 : st.score >= 8 ? 2 : st.score >= 3 ? 1 : 0;
    KW.games.shared.result(this.container, {
      gameId: this.id, emoji: stars >= 2 ? '🚀' : '🧮', title: stars === 3 ? 'Math genius!' : stars >= 1 ? 'Nice racing!' : 'Keep practising!',
      stars, score: st.score,
      lines: ['✅ ' + st.score + ' correct', '❓ ' + st.answered + ' answered', '🔥 Best streak ' + st.best],
      onReplay: () => this.play(st.op, st.level), onSetup: () => this.setup()
    });
  },

  stop() { if (this.timer) { this.timer.stop(); this.timer = null; } }
};
