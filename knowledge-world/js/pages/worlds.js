/* ==========================================================================
   Page: All worlds
   ========================================================================== */
KW.pages.worlds = {
  title: 'Worlds',
  render() {
    const cats = KW.data.categories;
    const total = KW.utils.allItems().length, learned = KW.store.totalLearned();
    return KW.ui.pageHead({
      emoji: '🌍', c1: '#6C5CE7', c2: '#4FB3FF', title: 'Learning Worlds',
      desc: 'Choose a world. Tap any card to see it big, hear the word and read a fun fact.',
      meta: '<span class="pill">' + cats.length + ' worlds</span><span class="pill">' + total + ' words</span><span class="pill">⭐ ' + learned + ' learned</span>'
    }) +
    '<section class="section container"><div class="grid cat-grid stagger">' +
    cats.map((c, i) => KW.pages.home.catCard(c, i)).join('') +
    '</div></section>';
  }
};
