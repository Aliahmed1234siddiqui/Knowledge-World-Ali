/* ==========================================================================
   Game: Odd One Out – which picture doesn't belong?
   ========================================================================== */
KW.games.oddone = {
  id: 'oddone', name: 'Odd One Out', emoji: '🕵️', desc: 'Three belong together, one does not. Can you spot it?',
  c1: '#00D2A8', c2: '#7ED957', usesCategory: false,

  start(container, opts) { this.container = container; this.opts = opts || {}; this.setup(); },

  setup() {
    KW.games.shared.setup(this.container, {
      emoji: this.emoji, title: this.name, desc: this.desc,
      groups: [{ key: 'rounds', label: 'Rounds', value: '10', options: [{ value: '5', label: '5 rounds' }, { value: '10', label: '10 rounds' }, { value: '15', label: '15 rounds' }] }],
      onStart: v => this.play(+v.rounds)
    });
  },

  play(rounds) {
    this.state = { rounds, i: 0, score: 0 };
    this.next();
  },

  next() {
    const st = this.state, U = KW.utils, S = KW.games.shared, c = this.container;
    if (st.i >= st.rounds) return this.finish();
    const cats = KW.data.categories.filter(x => x.items.length >= 3);
    const catA = U.pick(cats);
    const catB = U.pick(cats.filter(x => x.id !== catA.id));
    const same = U.sample(catA.items, 3).map(it => ({ it, cat: catA }));
    // avoid an odd item that also appears (same emoji) in catA
    const oddPool = catB.items.filter(it => !catA.items.some(a => a.emoji === it.emoji));
    const odd = { it: U.pick(oddPool.length ? oddPool : catB.items), cat: catB, odd: true };
    const options = U.shuffle(same.concat([odd]));

    c.innerHTML =
      S.hud([{ id: 'q', label: '🔎 Round', value: (st.i + 1) + '/' + st.rounds }, { id: 'score', label: '🏅 Score', value: st.score }]) +
      '<div class="quiz-q"><h3>Which one doesn\'t belong?</h3></div>' +
      '<div class="odd-grid">' + options.map((o, i) => '<button class="odd-opt emoji" data-i="' + i + '" title="' + U.esc(o.it.name) + '">' + o.it.emoji + '</button>').join('') + '</div>' +
      '<p class="text-center muted mt-3" id="odd-msg"></p>';
    S.quit(c, () => this.setup());
    KW.sound.speak('Which one does not belong?');

    let done = false;
    U.$('.odd-grid', c).addEventListener('click', e => {
      const b = e.target.closest('.odd-opt'); if (!b || done) return;
      done = true;
      const chosen = options[+b.dataset.i];
      U.$$('.odd-opt', c).forEach((el, i) => { el.disabled = true; if (options[i].odd) el.classList.add('correct'); });
      if (chosen.odd) { st.score++; KW.sound.correct(); }
      else { b.classList.add('wrong'); KW.sound.wrong(); }
      S.setHud('score', st.score);
      U.$('#odd-msg', c).innerHTML = odd.it.emoji + ' <b>' + U.esc(odd.it.name) + '</b> is from <b>' + catB.name + '</b>. The others are <b>' + catA.name + '</b>!';
      st.i++;
      setTimeout(() => this.next(), 1600);
    });
  },

  finish() {
    const st = this.state;
    const ratio = st.score / st.rounds;
    const stars = ratio === 1 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.4 ? 1 : 0;
    KW.games.shared.result(this.container, {
      gameId: this.id, emoji: '🕵️', title: stars === 3 ? 'Super detective!' : 'Case closed!', stars, score: st.score,
      lines: ['✅ ' + st.score + '/' + st.rounds + ' spotted'],
      onReplay: () => this.play(st.rounds), onSetup: () => this.setup()
    });
  },

  stop() {}
};
