/* ==========================================================================
   Pages: Games hub (#/games) and single game (#/games/:id)
   ========================================================================== */
KW.pages.games = {
  title: 'Games',
  render() {
    const games = KW.games.shared.list();
    return KW.ui.pageHead({
      emoji: '🎮', c1: '#6C5CE7', c2: '#FF6B81', title: 'Game Zone',
      desc: 'Every game earns stars. Beat your best score and unlock badges!',
      meta: '<span class="pill">' + games.length + ' games</span><span class="pill">🎯 ' + KW.store.get('played') + ' played</span><span class="pill">⭐ ' + KW.store.get('stars') + ' stars</span>'
    }) +
    '<section class="section container"><div class="grid grid-3 stagger">' + games.map((g, i) => KW.pages.home.gameCard(g, i)).join('') + '</div></section>';
  }
};

KW.pages.game = {
  title: 'Play',
  render(p) {
    const g = KW.games[p.id];
    if (!g || !g.id) return KW.pages.notFound.render();
    this.title = g.name;
    return KW.ui.pageHead({
      emoji: g.emoji, c1: g.c1, c2: g.c2, title: g.name, desc: g.desc, back: '#/games', backLabel: 'All games',
      meta: '<span class="pill">🏆 Best: ' + KW.store.best(g.id) + '</span>'
    }) +
    '<section class="section container"><div class="game-wrap" id="game-root"></div></section>';
  },
  mount(root, p) {
    this.game = KW.games[p.id];
    if (this.game && this.game.id) this.game.start(root.querySelector('#game-root'), {});
  },
  destroy() { if (this.game && this.game.stop) this.game.stop(); }
};
