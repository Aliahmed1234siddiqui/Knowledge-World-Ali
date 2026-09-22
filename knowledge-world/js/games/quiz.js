/* ==========================================================================
   Game: Quiz Blitz – pick the right name / picture
   ========================================================================== */
KW.games.quiz = {
  id: 'quiz', name: 'Quiz Blitz', emoji: '🎯', desc: 'Pick the right answer before the timer runs out!',
  c1: '#FF6B81', c2: '#FF9F43', usesCategory: true,

  start(container, opts) { this.container = container; this.opts = opts || {}; this.setup(); },

  setup() {
    const S = KW.games.shared;
    const groups = [{ key: 'mode', label: 'Question style', value: 'both', options: [{ value: 'name', label: '🖼️ See picture → pick name' }, { value: 'emoji', label: '🔤 Read name → pick picture' }, { value: 'both', label: '🎲 Both' }] }];
    if (!this.opts.categoryId) groups.unshift({ key: 'cat', label: 'World', value: 'mixed', options: S.categoryOptions() });
    S.setup(this.container, { emoji: this.emoji, title: this.name, desc: this.desc, groups, onStart: v => this.play(v.mode, v.cat || this.opts.categoryId) });
  },

  play(mode, catId) {
    const U = KW.utils, S = KW.games.shared, c = this.container;
    this.stop();
    const total = KW.config.quizQuestions;
    const cat = S.category(catId, 4);
    const pool = U.shuffle(cat.items).slice(0, total);
    while (pool.length < total) pool.push(U.pick(cat.items));
    this.state = { mode, catId: cat.id, cat, pool, i: 0, score: 0, correct: 0, streak: 0 };
    this.next();
  },

  next() {
    const st = this.state, U = KW.utils, S = KW.games.shared, c = this.container;
    if (st.i >= st.pool.length) return this.finish();
    const item = st.pool[st.i];
    // Distractors come from the same category as the answer, so mixed mode stays fair.
    const sameCat = item.category || st.cat;
    const others = U.sample(sameCat.items.filter(x => x.name !== item.name), 3);
    const options = U.shuffle(others.concat([item]));
    const type = st.mode === 'both' ? (st.i % 2 ? 'emoji' : 'name') : st.mode;

    c.innerHTML =
      S.hud([{ id: 'q', label: '❓', value: (st.i + 1) + '/' + st.pool.length }, { id: 'score', label: '🏅 Score', value: st.score }, { id: 'streak', label: '🔥 Streak', value: st.streak }, { id: 'time', label: '⏱️', value: 15, danger: true }]) +
      '<div class="timer-bar"><span id="tbar" style="width:100%"></span></div>' +
      '<div class="quiz-q">' +
      (type === 'name'
        ? '<div class="q-emoji emoji">' + item.emoji + '</div><h3>What is this?</h3>'
        : '<div class="q-word">' + U.esc(item.name) + '</div><h3>Find the picture! <button class="btn btn-sm btn-outline" data-speak="' + U.esc(item.name) + '">🔊</button></h3>') +
      '</div>' +
      '<div class="quiz-opts">' + options.map(o =>
        '<button class="quiz-opt" data-name="' + U.esc(o.name) + '">' + (type === 'name' ? U.esc(o.name) : '<span class="emoji">' + o.emoji + '</span>') + '</button>').join('') +
      '</div>';
    KW.ui.enhance(c);
    S.quit(c, () => this.setup());
    if (type === 'name') KW.sound.speak('What is this?'); else KW.sound.speak(item.name);

    let answered = false;
    const secs = 15;
    this.timer = S.timer(secs, left => {
      S.setHud('time', left);
      const bar = U.$('#tbar', c); if (bar) bar.style.width = (left / secs * 100) + '%';
    }, () => { if (!answered) reveal(null); });

    const reveal = (chosenEl) => {
      answered = true; this.timer.stop();
      const opts = U.$$('.quiz-opt', c);
      opts.forEach(b => { b.disabled = true; if (b.dataset.name === item.name) b.classList.add('correct'); });
      const isRight = chosenEl && chosenEl.dataset.name === item.name;
      if (isRight) {
        st.streak++; st.correct++; st.score += 10 + Math.min(st.streak - 1, 5) * 2;
        KW.sound.correct();
      } else {
        if (chosenEl) chosenEl.classList.add('wrong');
        st.streak = 0; KW.sound.wrong();
      }
      S.setHud('score', st.score); S.setHud('streak', st.streak);
      st.i++;
      setTimeout(() => this.next(), 1000);
    };
    U.$('.quiz-opts', c).addEventListener('click', e => {
      const b = e.target.closest('.quiz-opt');
      if (b && !answered) reveal(b);
    });
  },

  finish() {
    const st = this.state, total = st.pool.length;
    const stars = st.correct === total ? 3 : st.correct >= total * 0.7 ? 2 : st.correct >= total * 0.4 ? 1 : 0;
    KW.games.shared.result(this.container, {
      gameId: this.id, emoji: stars === 3 ? '🏆' : stars >= 1 ? '🎉' : '💪',
      title: stars === 3 ? 'Perfect score!' : stars >= 1 ? 'Great job!' : 'Keep practising!',
      stars, score: st.score,
      lines: ['✅ ' + st.correct + '/' + total + ' correct', '🏅 Score ' + st.score, st.cat.emoji + ' ' + st.cat.name],
      onReplay: () => this.play(st.mode, st.catId), onSetup: () => this.setup()
    });
  },

  stop() { if (this.timer) this.timer.stop(); }
};
