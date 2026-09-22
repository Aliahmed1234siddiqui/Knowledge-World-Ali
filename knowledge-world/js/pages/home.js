/* ==========================================================================
   Page: Home
   ========================================================================== */
KW.pages.home = {
  title: 'Home',

  render() {
    const U = KW.utils, S = KW.store;
    const cats = KW.data.categories;
    const totalWords = U.allItems().length;
    const games = KW.games.shared.list();
    const wod = U.dailyItem(0), fact = U.dailyItem(7);

    const floaters = [
      ['🚀', 8, 18, 56, 7], ['🍎', 82, 12, 44, 6], ['🦁', 88, 62, 58, 8], ['🔤', 6, 70, 46, 6.5], ['⭐', 70, 30, 34, 5], ['🎈', 55, 78, 40, 7.5], ['🧠', 92, 38, 36, 6], ['🎨', 16, 45, 40, 8.5]
    ].map(([e, x, y, s, d], i) => '<span class="emoji" style="left:' + x + '%;top:' + y + '%;--s:' + s + 'px;--d:' + d + 's;--delay:' + (i * 0.4) + 's">' + e + '</span>').join('');

    return (
      '<section class="hero">' +
      '<canvas id="hero-canvas"></canvas>' +
      '<div class="hero-floaters">' + floaters + '</div>' +
      '<div class="container hero-content">' +
      '<span class="hero-kicker">🌟 A magical 3D learning world for kids</span>' +
      '<h1 class="hero-title">Learn. <span class="grad">Play.</span><br>Explore!</h1>' +
      '<p class="hero-sub">Discover animals, fruits, letters, numbers and much more through colourful cards, fun facts, sounds and exciting games. Earn stars and unlock badges as you go!</p>' +
      '<div class="hero-actions">' +
      '<a class="btn btn-accent btn-lg" href="#/worlds">🚀 Start Exploring</a>' +
      '<a class="btn btn-ghost btn-lg" href="#/games">🎮 Play Games</a>' +
      '</div>' +
      '<div class="hero-stats">' +
      '<div><b>' + cats.length + '</b><span>Learning worlds</span></div>' +
      '<div><b>' + totalWords + '+</b><span>Words & facts</span></div>' +
      '<div><b>' + games.length + '</b><span>Fun games</span></div>' +
      '<div><b>' + KW.data.badges.length + '</b><span>Badges to earn</span></div>' +
      '</div></div>' +
      '<div class="scroll-hint">↓ scroll</div>' +
      '<div class="hero-wave"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"/></svg></div>' +
      '</section>' +

      // Marquee
      '<div class="marquee"><div class="marquee-track">' +
      [0, 1].map(() => cats.map(c => '<span><span class="emoji">' + c.emoji + '</span>' + c.name + '</span>').join('')).join('') +
      '</div></div>' +

      // Worlds
      '<section class="section container">' +
      '<div class="section-head reveal"><span class="kicker">Learning worlds</span><h2>Pick a world to <span class="grad-text">explore</span></h2><p>Every world is full of colourful cards, fun facts and a voice that says each word out loud.</p></div>' +
      '<div class="grid cat-grid">' +
      cats.slice(0, 8).map((c, i) => this.catCard(c, i)).join('') +
      '</div>' +
      '<div class="text-center mt-4 reveal"><a class="btn btn-primary btn-lg" href="#/worlds">See all ' + cats.length + ' worlds →</a></div>' +
      '</section>' +

      // Tools
      '<section class="section section-alt"><div class="container">' +
      '<div class="section-head reveal"><span class="kicker">Basics</span><h2>ABC, 123 and Tables</h2><p>The building blocks of reading and maths, made playful.</p></div>' +
      '<div class="grid grid-3">' +
      '<a href="#/alphabet" class="tool-card tilt reveal" style="--c1:#FF6B81;--c2:#F368E0"><div class="tool-icon">🔤</div><div><h3>Alphabet</h3><p>A to Z with words, sounds and letter tracing</p></div><span class="arrow">→</span></a>' +
      '<a href="#/numbers" class="tool-card tilt reveal" data-delay="1" style="--c1:#4FB3FF;--c2:#6C5CE7"><div class="tool-icon">🔢</div><div><h3>Numbers</h3><p>Count 1 to 100, skip counting and a counting game</p></div><span class="arrow">→</span></a>' +
      '<a href="#/tables" class="tool-card tilt reveal" data-delay="2" style="--c1:#00D2A8;--c2:#7ED957"><div class="tool-icon">✖️</div><div><h3>Tables</h3><p>Multiplication tables 1 to 20 with a quick test</p></div><span class="arrow">→</span></a>' +
      '</div></div></section>' +

      // Games
      '<section class="section container">' +
      '<div class="section-head reveal"><span class="kicker">Playground</span><h2>Games that make you <span class="grad-text">smarter</span></h2><p>Memory, quizzes, spelling, maths and quick reflexes. Earn up to 3 stars per game!</p></div>' +
      '<div class="grid grid-3">' + games.map((g, i) => this.gameCard(g, i)).join('') + '</div>' +
      '</section>' +

      // Daily
      '<section class="section section-alt"><div class="container">' +
      '<div class="daily">' +
      '<div class="daily-card tilt reveal" style="--c1:' + wod.category.c1 + ';--c2:' + wod.category.c2 + '" id="wod-card">' +
      '<div class="d-emoji emoji">' + wod.emoji + '</div><div><span class="label">📅 Word of the day</span><h3>' + U.esc(wod.name) + '</h3><p>From the ' + wod.category.name + ' world. Tap to hear it and learn a fact!</p></div></div>' +
      '<div class="daily-card tilt reveal" data-delay="1" style="--c1:#1F2544;--c2:#6C5CE7">' +
      '<div class="d-emoji emoji">💡</div><div><span class="label">Fun fact of the day</span><h3>Did you know?</h3><p>' + U.esc(fact.fact) + '</p></div></div>' +
      '</div></div></section>' +

      // Features
      '<section class="section container">' +
      '<div class="section-head reveal"><span class="kicker">Why kids love it</span><h2>Built for curious minds</h2></div>' +
      '<div class="grid grid-4">' +
      [['🎨', 'Colourful & 3D', 'Cards tilt, pop and float. Learning feels like a game.', '#FF6B81', '#F368E0'],
       ['🔊', 'Hear every word', 'A friendly voice reads words and facts out loud.', '#4FB3FF', '#6C5CE7'],
       ['⭐', 'Stars & badges', 'Collect stars, level up and unlock ' + KW.data.badges.length + ' badges.', '#FFC940', '#FF9F43'],
       ['🛡️', 'Safe & offline', 'No ads, no sign-up. Progress saves on your device.', '#00D2A8', '#7ED957']]
        .map((f, i) => '<div class="card feature reveal" data-delay="' + i + '" style="--c1:' + f[3] + ';--c2:' + f[4] + '"><div class="f-icon">' + f[0] + '</div><h3>' + f[1] + '</h3><p>' + f[2] + '</p></div>').join('') +
      '</div></section>' +

      // CTA
      '<section class="section container"><div class="cta-band reveal">' +
      '<h2>Ready for an adventure' + (S.get('name') ? ', ' + U.esc(S.get('name')) : '') + '? 🚀</h2>' +
      '<p>You have <b>' + S.get('stars') + ' ⭐</b> so far. Every word you learn and every game you win earns more!</p>' +
      '<div class="flex center flex-wrap mt-2"><a class="btn btn-accent btn-lg" href="#/worlds">Explore worlds</a><a class="btn btn-ghost btn-lg" href="#/progress">My progress</a></div>' +
      '</div></section>'
    );
  },

  catCard(c, i) {
    const S = KW.store;
    const learned = S.learnedCount(c.id), pct = Math.round(learned / c.items.length * 100);
    return '<a href="#/learn/' + c.id + '" class="cat-card tilt reveal" data-delay="' + (i % 4) + '" style="--c1:' + c.c1 + ';--c2:' + c.c2 + '">' +
      '<div class="cat-emoji emoji">' + c.emoji + '</div><h3>' + c.name + '</h3><p>' + c.desc + '</p>' +
      '<div class="cat-meta"><span class="pill">' + c.items.length + ' words</span><div class="progress"><span style="width:' + pct + '%"></span></div><span>' + pct + '%</span></div></a>';
  },

  gameCard(g, i) {
    const best = KW.store.best(g.id);
    return '<a href="#/games/' + g.id + '" class="game-card tilt reveal" data-delay="' + (i % 3) + '" style="--c1:' + g.c1 + ';--c2:' + g.c2 + '">' +
      '<div class="game-icon emoji">' + g.emoji + '</div><h3>' + g.name + '</h3><p>' + g.desc + '</p>' +
      '<div class="game-foot"><span class="best">' + (best ? '🏆 Best: ' + best : '✨ New!') + '</span><span class="btn btn-sm btn-primary">Play ▶</span></div></a>';
  },

  mount(root) {
    const canvas = root.querySelector('#hero-canvas');
    if (canvas) KW.hero3d.init(canvas);
    const wod = KW.utils.dailyItem(0);
    root.querySelector('#wod-card').addEventListener('click', () => KW.ui.showItem(wod.category, wod.category.items.find(i => i.name === wod.name)));
  },

  destroy() { KW.hero3d.destroy(); }
};
