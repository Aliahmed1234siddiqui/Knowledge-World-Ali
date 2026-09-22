/* ==========================================================================
   Page: Learn a world  (#/learn/:id)  – Explore · Quiz · Memory · Spell · Catch
   ========================================================================== */
KW.pages.learn = {
  title: 'Learn',

  render(p) {
    const c = KW.utils.getCategory(p.id);
    if (!c) return KW.pages.notFound.render();
    this.title = c.name;
    const learned = KW.store.learnedCount(c.id);
    return KW.ui.pageHead({
      emoji: c.emoji, c1: c.c1, c2: c.c2, title: c.name, desc: c.desc, back: '#/worlds', backLabel: 'All worlds',
      meta: '<span class="pill">' + c.items.length + ' words</span><span class="pill">⭐ ' + learned + '/' + c.items.length + ' learned</span>'
    }) +
    '<section class="section container">' +
    '<div class="learn-toolbar">' +
    '<div class="tabs" id="learn-tabs">' +
    '<button class="tab active" data-tab="explore">🔍 Explore</button>' +
    '<button class="tab" data-tab="quiz">🎯 Quiz</button>' +
    '<button class="tab" data-tab="memory">🧠 Memory</button>' +
    '<button class="tab" data-tab="spelling">🐝 Spell</button>' +
    '<button class="tab" data-tab="catch">⚡ Catch</button>' +
    '</div>' +
    '<div class="flex"><button class="btn btn-outline" id="slideshow">▶ Slideshow</button></div>' +
    '</div>' +
    '<div id="learn-body"></div>' +
    '</section>';
  },

  mount(root, p) {
    const c = KW.utils.getCategory(p.id); if (!c) return;
    KW.store.visit(c.id);
    this.cat = c;
    const body = root.querySelector('#learn-body');
    const tabs = root.querySelector('#learn-tabs');
    tabs.addEventListener('click', e => {
      const t = e.target.closest('.tab'); if (!t) return;
      KW.utils.$$('.tab', tabs).forEach(x => x.classList.toggle('active', x === t));
      KW.sound.click();
      this.show(t.dataset.tab, body);
    });
    root.querySelector('#slideshow').addEventListener('click', () => this.slideshow());
    document.addEventListener('kw:store', this._onStore = () => { if (this.tab === 'explore') this.renderExplore(body); });
    this.show('explore', body);
  },

  show(tab, body) {
    this.stopGame();
    this.tab = tab;
    if (tab === 'explore') return this.renderExplore(body);
    body.innerHTML = '<div class="game-wrap" id="learn-game"></div>';
    this.game = KW.games[tab];
    this.game.start(body.querySelector('#learn-game'), { categoryId: this.cat.id });
  },

  renderExplore(body) {
    const c = this.cat, U = KW.utils, S = KW.store;
    body.innerHTML = '<div class="items-grid stagger">' +
      c.items.map((it, i) => '<div class="item-card" data-i="' + i + '" style="--c1:' + c.c1 + '">' +
        (S.isLearned(c.id, it.name) ? '<span class="learned">⭐</span>' : '') +
        '<span class="emoji">' + it.emoji + '</span><b>' + U.esc(it.name) + '</b></div>').join('') +
      '</div>';
    body.querySelector('.items-grid').addEventListener('click', e => {
      const card = e.target.closest('.item-card'); if (!card) return;
      KW.sound.pop();
      KW.ui.showItem(c, c.items[+card.dataset.i]);
    });
  },

  /** Auto-play every card with voice. */
  slideshow() {
    const c = this.cat; let i = 0, playing = true;
    const next = () => {
      if (!playing || i >= c.items.length) { KW.ui.closeModal(); return; }
      const it = c.items[i++];
      KW.ui.modal({
        html: '<div class="item-detail"><div class="big-emoji emoji">' + it.emoji + '</div><h2>' + KW.utils.esc(it.name) + '</h2><div class="fact">💡 ' + KW.utils.esc(it.fact) + '</div>' +
          '<div class="actions"><span class="pill">' + i + ' / ' + c.items.length + '</span><button class="btn btn-secondary" id="slide-stop">⏹ Stop</button></div></div>',
        onMount(m) {
          KW.sound.speak(it.name + '. ' + it.fact);
          m.querySelector('#slide-stop').addEventListener('click', () => { playing = false; KW.ui.closeModal(); });
        },
        onClose() { playing = false; clearTimeout(t); }
      });
      var t = setTimeout(next, 5200);
    };
    next();
  },

  stopGame() { if (this.game && this.game.stop) this.game.stop(); this.game = null; },
  destroy() { this.stopGame(); document.removeEventListener('kw:store', this._onStore); }
};

KW.pages.notFound = {
  title: 'Not found',
  render() {
    return '<section class="section container"><div class="empty"><span class="emoji">🧭</span><h2>Oops, this page wandered off!</h2><p>Let\'s get you back to a world you know.</p><a class="btn btn-primary btn-lg" href="#/">🏠 Go home</a></div></section>';
  }
};
