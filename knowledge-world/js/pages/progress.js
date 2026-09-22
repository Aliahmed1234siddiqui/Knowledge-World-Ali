/* ==========================================================================
   Page: My Stars – profile, level, stats, badges, per-world progress
   ========================================================================== */
KW.pages.progress = {
  title: 'My Stars',

  render() {
    const S = KW.store, U = KW.utils, st = S.state;
    const level = S.level(), pct = Math.round(S.levelProgress());
    const games = KW.games.shared.list();
    return KW.ui.pageHead({
      emoji: st.avatar, c1: '#FFC940', c2: '#FF9F43', title: (st.name ? st.name + '\'s' : 'My') + ' Progress',
      desc: 'Level ' + level + ' explorer with ' + st.stars + ' stars. Keep learning to reach the next level!',
      meta: '<span class="pill">⭐ ' + st.stars + ' stars</span><span class="pill">🏅 ' + st.badges.length + '/' + KW.data.badges.length + ' badges</span><span class="pill">📚 ' + S.totalLearned() + ' words</span>'
    }) +
    '<section class="section container">' +
    '<div class="grid grid-2">' +
    '<div class="card profile-card">' +
    '<div class="profile-avatar emoji" id="avatar-btn" title="Change avatar">' + st.avatar + '</div>' +
    '<div style="flex:1;min-width:200px"><label class="muted" style="font-weight:800;font-size:.85rem">YOUR NAME</label>' +
    '<input class="input" id="name-input" maxlength="20" placeholder="Type your name…" value="' + U.esc(st.name) + '">' +
    '<div class="avatar-picker mt-2" id="avatar-picker">' + KW.config.avatars.map(a => '<button class="emoji ' + (a === st.avatar ? 'active' : '') + '" data-a="' + a + '">' + a + '</button>').join('') + '</div></div>' +
    '</div>' +
    '<div class="card flex" style="gap:22px">' +
    '<div class="level-ring" style="--p:' + pct + '"><div><b>' + level + '</b><small>LEVEL</small></div></div>' +
    '<div style="flex:1"><h3>Level ' + level + ' Explorer</h3><p class="muted" style="margin:0 0 8px">' + (25 - st.stars % 25) + ' more stars to reach level ' + (level + 1) + '</p><div class="progress"><span style="width:' + pct + '%"></span></div></div>' +
    '</div></div>' +

    '<div class="grid grid-4 mt-3">' +
    '<div class="stat-tile"><div class="stat-icon">⭐</div><b>' + st.stars + '</b><span>Stars</span></div>' +
    '<div class="stat-tile"><div class="stat-icon">📚</div><b>' + S.totalLearned() + '</b><span>Words learned</span></div>' +
    '<div class="stat-tile"><div class="stat-icon">🎮</div><b>' + st.played + '</b><span>Games played</span></div>' +
    '<div class="stat-tile"><div class="stat-icon">🌍</div><b>' + st.visited.length + '/' + KW.data.categories.length + '</b><span>Worlds visited</span></div>' +
    '</div>' +

    '<h2 class="mt-4">🏅 Badges</h2>' +
    '<div class="grid grid-4">' + KW.data.badges.map(b => {
      const has = st.badges.includes(b.id);
      return '<div class="badge-tile ' + (has ? 'unlocked' : 'locked') + '"><span class="badge-icon emoji">' + b.emoji + '</span><b>' + b.name + '</b><small>' + (has ? '✅ ' : '🔒 ') + b.desc + '</small></div>';
    }).join('') + '</div>' +

    '<div class="grid grid-2 mt-4">' +
    '<div class="card"><h3>🌍 World progress</h3>' + KW.data.categories.map(c => {
      const n = S.learnedCount(c.id), pc = Math.round(n / c.items.length * 100);
      return '<a href="#/learn/' + c.id + '" class="cat-progress"><span class="emoji">' + c.emoji + '</span><b>' + c.name + '</b><div class="progress"><span style="width:' + pc + '%;background:linear-gradient(90deg,' + c.c1 + ',' + c.c2 + ')"></span></div><span class="count">' + n + '/' + c.items.length + '</span></a>';
    }).join('') + '</div>' +
    '<div class="card"><h3>🏆 Best scores</h3>' + games.map(g =>
      '<a href="#/games/' + g.id + '" class="cat-progress"><span class="emoji">' + g.emoji + '</span><b>' + g.name + '</b><div style="flex:1"></div><span class="count">' + (S.best(g.id) || '—') + '</span></a>').join('') +
    '<div class="mt-3"><button class="btn btn-outline btn-sm" id="reset-btn">🗑️ Reset all progress</button></div>' +
    '</div></div>' +
    '</section>';
  },

  mount(root) {
    const S = KW.store;
    const nameInput = root.querySelector('#name-input');
    nameInput.addEventListener('change', () => { S.set('name', nameInput.value.trim()); KW.ui.toast('👋 Hi ' + (nameInput.value.trim() || 'explorer') + '!', 'success'); });
    const picker = root.querySelector('#avatar-picker');
    picker.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      S.set('avatar', b.dataset.a);
      KW.utils.$$('button', picker).forEach(x => x.classList.toggle('active', x === b));
      root.querySelector('#avatar-btn').textContent = b.dataset.a;
      root.querySelector('.head-emoji').textContent = b.dataset.a;
      KW.sound.pop();
    });
    root.querySelector('#avatar-btn').addEventListener('click', () => picker.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    root.querySelector('#reset-btn').addEventListener('click', () => {
      KW.ui.modal({
        title: 'Reset everything?', html: '<p>This will remove all stars, badges and learned words. This cannot be undone.</p><div class="flex"><button class="btn btn-secondary" id="reset-yes">Yes, reset</button><button class="btn btn-outline" id="reset-no">Keep my stars</button></div>',
        onMount(m) {
          m.querySelector('#reset-no').addEventListener('click', () => KW.ui.closeModal());
          m.querySelector('#reset-yes').addEventListener('click', () => { S.reset(); KW.ui.closeModal(); KW.router.resolve(); KW.ui.toast('Progress reset. A fresh start! 🌱'); });
        }
      });
    });
  }
};
