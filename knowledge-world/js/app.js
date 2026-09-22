/* ==========================================================================
   App bootstrap – routes, nav behaviour, theme, sound, search, loader
   ========================================================================== */
(function () {
  const U = KW.utils;

  /* ---- Routes ---- */
  KW.router.add('/', KW.pages.home);
  KW.router.add('/worlds', KW.pages.worlds);
  KW.router.add('/learn/:id', KW.pages.learn);
  KW.router.add('/alphabet', KW.pages.alphabet);
  KW.router.add('/numbers', KW.pages.numbers);
  KW.router.add('/tables', KW.pages.tables);
  KW.router.add('/games', KW.pages.games);
  KW.router.add('/games/:id', KW.pages.game);
  KW.router.add('/progress', KW.pages.progress);
  KW.router.add('/about', KW.pages.about);
  KW.router.add('/404', KW.pages.notFound);

  /* ---- State ---- */
  const state = KW.store.load();

  /* ---- Theme ---- */
  const applyTheme = t => {
    document.documentElement.setAttribute('data-theme', t);
    document.getElementById('theme-toggle').textContent = t === 'dark' ? '☀️' : '🌙';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', t === 'dark' ? '#0E1128' : '#6C5CE7');
  };
  applyTheme(state.theme || 'light');
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const t = KW.store.get('theme') === 'dark' ? 'light' : 'dark';
    KW.store.set('theme', t); applyTheme(t); KW.sound.click();
  });

  /* ---- Sound ---- */
  KW.sound.enabled = state.sound !== false;
  document.getElementById('sound-toggle').textContent = KW.sound.enabled ? '🔊' : '🔇';
  document.getElementById('sound-toggle').addEventListener('click', () => {
    const on = KW.sound.toggle();
    if (on) KW.sound.click();
    KW.ui.toast(on ? '🔊 Sound on' : '🔇 Sound off');
  });
  // Unlock audio on first interaction (browser autoplay policy)
  document.addEventListener('pointerdown', () => KW.sound.init(), { once: true });

  /* ---- Nav chips (stars / avatar) ---- */
  const syncNav = () => {
    document.getElementById('star-count').textContent = KW.store.get('stars');
    document.getElementById('avatar-chip').textContent = KW.store.get('avatar');
  };
  syncNav();
  document.addEventListener('kw:store', syncNav);

  /* ---- Burger / scroll ---- */
  document.getElementById('nav-burger').addEventListener('click', () => document.getElementById('nav-links').classList.toggle('open'));
  window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 10), { passive: true });

  /* ---- Search ---- */
  const input = document.getElementById('search-input'), results = document.getElementById('search-results');
  const doSearch = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.classList.remove('open'); return; }
    const found = U.allItems().filter(it => it.name.toLowerCase().includes(q) || it.category.name.toLowerCase().includes(q)).slice(0, 8);
    const letters = KW.data.alphabet.filter(l => l.letter.toLowerCase() === q || l.word.toLowerCase().includes(q)).slice(0, 2);
    results.innerHTML =
      found.map((it, i) => '<div class="search-item" data-idx="' + i + '"><span class="emoji">' + it.emoji + '</span><div><b>' + U.esc(it.name) + '</b><small>' + it.category.name + '</small></div></div>').join('') +
      letters.map(l => '<div class="search-item" data-nav="#/alphabet"><span class="emoji">' + l.emoji + '</span><div><b>' + l.letter + ' is for ' + l.word + '</b><small>Alphabet</small></div></div>').join('') +
      (found.length || letters.length ? '' : '<div class="search-empty">No words found for "' + U.esc(q) + '" 🤔</div>');
    results.classList.add('open');
    U.$$('.search-item[data-idx]', results).forEach(el => el.addEventListener('click', () => {
      const it = found[+el.dataset.idx];
      results.classList.remove('open'); input.value = '';
      KW.ui.showItem(it.category, it.category.items.find(x => x.name === it.name));
    }));
    U.$$('.search-item[data-nav]', results).forEach(el => el.addEventListener('click', () => { results.classList.remove('open'); input.value = ''; location.hash = el.dataset.nav; }));
  };
  input.addEventListener('input', U.debounce(doSearch, 160));
  input.addEventListener('focus', doSearch);
  document.addEventListener('click', e => { if (!e.target.closest('.search')) results.classList.remove('open'); });

  /* ---- Keyboard: Escape closes modal ---- */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { KW.ui.closeModal(); results.classList.remove('open'); } });

  /* ---- Footer year ---- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- Go ---- */
  KW.router.start();
  // The app is fully interactive once this script runs; hide the loader shortly after
  // (don't wait for window.load, which stalls on slow font/CDN downloads).
  setTimeout(() => document.getElementById('loader').classList.add('hide-loader'), 700);
})();
