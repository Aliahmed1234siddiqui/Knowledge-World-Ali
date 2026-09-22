/* ==========================================================================
   Game: Spelling Bee – tap letter tiles to spell the word
   ========================================================================== */
KW.games.spelling = {
  id: 'spelling', name: 'Spelling Bee', emoji: '🐝', desc: 'Tap the letters in the right order to spell the word!',
  c1: '#FFC940', c2: '#FF9F43', usesCategory: true,

  start(container, opts) { this.container = container; this.opts = opts || {}; this.setup(); },

  setup() {
    const S = KW.games.shared;
    const groups = [{ key: 'len', label: 'Word length', value: 'short', options: [{ value: 'short', label: '🐣 Short (up to 5 letters)' }, { value: 'medium', label: '🙂 Medium (up to 8)' }, { value: 'long', label: '🔥 Any length' }] }];
    if (!this.opts.categoryId) groups.unshift({ key: 'cat', label: 'World', value: 'mixed', options: S.categoryOptions() });
    S.setup(this.container, { emoji: this.emoji, title: this.name, desc: this.desc, groups, onStart: v => this.play(v.len, v.cat || this.opts.categoryId) });
  },

  play(len, catId) {
    const U = KW.utils, S = KW.games.shared;
    const max = len === 'short' ? 5 : len === 'medium' ? 8 : 12;
    let cat = S.category(catId, 4);
    let words = cat.items.filter(it => { const n = U.letters(it.name).length; return n >= 3 && n <= max; });
    if (words.length < 4) { words = cat.items.filter(it => U.letters(it.name).length >= 3); }
    const pool = U.sample(words, KW.config.spellingWords);
    this.state = { len, catId: cat.id, cat, pool, i: 0, score: 0, correct: 0, hints: 0 };
    this.next();
  },

  next() {
    const st = this.state, U = KW.utils, S = KW.games.shared, c = this.container;
    if (st.i >= st.pool.length) return this.finish();
    const item = st.pool[st.i];
    const letters = U.letters(item.name);
    let tiles = U.shuffle(letters.map((ch, i) => ({ ch, id: i })));
    if (letters.length > 2 && tiles.map(t => t.ch).join('') === letters.join('')) tiles = tiles.reverse();
    const slots = new Array(letters.length).fill(null); // holds tile id
    let hintsUsed = 0;

    c.innerHTML =
      S.hud([{ id: 'q', label: '📝 Word', value: (st.i + 1) + '/' + st.pool.length }, { id: 'score', label: '🏅 Score', value: st.score }]) +
      '<div class="spell-stage">' +
      '<div class="s-emoji emoji">' + item.emoji + '</div>' +
      '<div class="mt-2"><button class="btn btn-sm btn-outline" data-speak="' + U.esc(item.name) + '">🔊 Hear the word</button></div>' +
      '<div class="spell-slots" id="slots">' + letters.map((_, i) => '<div class="spell-slot" data-slot="' + i + '"></div>').join('') + '</div>' +
      '<div class="spell-tiles" id="tiles">' + tiles.map(t => '<button class="spell-tile" data-id="' + t.id + '" data-ch="' + t.ch + '">' + t.ch + '</button>').join('') + '</div>' +
      '<div class="flex center flex-wrap">' +
      '<button class="btn btn-outline" id="sp-hint">💡 Hint</button>' +
      '<button class="btn btn-outline" id="sp-clear">🧹 Clear</button>' +
      '<button class="btn btn-primary" id="sp-check">✅ Check</button>' +
      '</div></div>';
    KW.ui.enhance(c);
    S.quit(c, () => this.setup());
    KW.sound.speak(item.name);

    const slotEls = U.$$('.spell-slot', c), tileEls = U.$$('.spell-tile', c);
    const tileById = id => tileEls.find(t => +t.dataset.id === id);
    const render = () => {
      slotEls.forEach((s, i) => {
        const id = slots[i];
        s.textContent = id == null ? '' : tileById(id).dataset.ch;
        s.classList.toggle('filled', id != null);
      });
      tileEls.forEach(t => t.classList.toggle('used', slots.includes(+t.dataset.id)));
    };

    U.$('#tiles', c).addEventListener('click', e => {
      const t = e.target.closest('.spell-tile'); if (!t || t.classList.contains('used')) return;
      const free = slots.indexOf(null); if (free < 0) return;
      slots[free] = +t.dataset.id; KW.sound.pop(); render();
      if (!slots.includes(null)) check();
    });
    U.$('#slots', c).addEventListener('click', e => {
      const s = e.target.closest('.spell-slot'); if (!s) return;
      const i = +s.dataset.slot; if (slots[i] == null || s.classList.contains('hint')) return;
      slots[i] = null; KW.sound.click(); render();
    });
    U.$('#sp-clear', c).addEventListener('click', () => { slotEls.forEach((s, i) => { if (!s.classList.contains('hint')) slots[i] = null; }); KW.sound.click(); render(); });
    U.$('#sp-hint', c).addEventListener('click', () => {
      // reveal the first wrong/empty slot with the right letter
      for (let i = 0; i < letters.length; i++) {
        const cur = slots[i] == null ? null : tileById(slots[i]).dataset.ch;
        if (cur !== letters[i]) {
          // find an unused tile with that letter (or steal one from a wrong slot)
          let tile = tileEls.find(t => t.dataset.ch === letters[i] && !slots.includes(+t.dataset.id));
          if (!tile) { const stolenIdx = slots.findIndex((id, k) => id != null && tileById(id).dataset.ch === letters[i] && k !== i); if (stolenIdx >= 0) { tile = tileById(slots[stolenIdx]); slots[stolenIdx] = null; } }
          if (tile) { slots[i] = +tile.dataset.id; slotEls[i].classList.add('hint'); hintsUsed++; st.hints++; KW.sound.flip(); render(); }
          break;
        }
      }
      if (!slots.includes(null)) check();
    });
    U.$('#sp-check', c).addEventListener('click', check);

    const self = this;
    function check() {
      if (slots.includes(null)) { KW.ui.toast('Fill all the letters first! ✏️'); return; }
      const attempt = slots.map(id => tileById(id).dataset.ch).join('');
      const box = U.$('#slots', c);
      if (attempt === letters.join('')) {
        box.classList.add('correct'); KW.sound.correct(); KW.sound.speak(item.name);
        const pts = Math.max(2, 10 - hintsUsed * 3); st.score += pts; st.correct++;
        S.setHud('score', st.score);
        KW.ui.toast('🎉 ' + item.name + '! +' + pts + ' points', 'success', 1400);
        st.i++;
        setTimeout(() => self.next(), 1200);
      } else {
        box.classList.remove('wrong'); void box.offsetWidth; box.classList.add('wrong');
        KW.sound.wrong();
        KW.ui.toast('Not quite, try again! 💪', 'error', 1400);
      }
    }
  },

  finish() {
    const st = this.state, total = st.pool.length;
    const stars = st.hints === 0 ? 3 : st.hints <= total ? 2 : 1;
    KW.games.shared.result(this.container, {
      gameId: this.id, emoji: '🐝', title: 'Spelling champion!', stars, score: st.score,
      lines: ['📝 ' + st.correct + ' words spelled', '💡 ' + st.hints + ' hints used', '🏅 Score ' + st.score, st.cat.emoji + ' ' + st.cat.name],
      onReplay: () => this.play(st.len, st.catId), onSetup: () => this.setup()
    });
  },

  stop() {}
};
