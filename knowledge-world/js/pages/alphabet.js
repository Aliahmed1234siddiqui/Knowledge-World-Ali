/* ==========================================================================
   Page: Alphabet – A–Z tiles, big letter stage, song mode, letter tracing
   ========================================================================== */
KW.pages.alphabet = {
  title: 'Alphabet',

  render() {
    const A = KW.data.alphabet;
    return KW.ui.pageHead({
      emoji: '🔤', c1: '#FF6B81', c2: '#F368E0', title: 'Alphabet Adventure',
      desc: 'Tap a letter to hear it, see a word and trace it with your finger or mouse.',
      meta: '<span class="pill">26 letters</span><span class="pill">🎵 ABC song</span><span class="pill">✏️ Tracing</span>'
    }) +
    '<section class="section container">' +
    '<div class="learn-toolbar"><div class="tabs"><button class="tab active" data-case="upper">ABC</button><button class="tab" data-case="lower">abc</button></div>' +
    '<div class="flex"><button class="btn btn-secondary" id="abc-song">🎵 Play ABC song</button></div></div>' +
    '<div class="abc-stage">' +
    '<div class="abc-big" id="abc-big"></div>' +
    '<div class="trace-box"><div class="flex between"><b>✏️ Trace the letter</b><div class="flex"><button class="btn btn-sm btn-outline" id="trace-clear">🧹 Clear</button></div></div><canvas id="trace" width="480" height="300"></canvas><small class="muted">Draw over the faded letter with your mouse or finger.</small></div>' +
    '</div>' +
    '<div class="abc-grid stagger" id="abc-grid">' +
    A.map((l, i) => '<button class="abc-tile" data-i="' + i + '" style="--c1:' + l.c1 + ';--c2:' + l.c2 + '"><span class="letter">' + l.letter + '</span><span class="emoji">' + l.emoji + '</span><small>' + l.word + '</small></button>').join('') +
    '</div></section>';
  },

  mount(root) {
    const U = KW.utils, A = KW.data.alphabet;
    this.caseMode = 'upper'; this.index = 0;
    this.big = root.querySelector('#abc-big');
    this.grid = root.querySelector('#abc-grid');
    this.canvas = root.querySelector('#trace');
    this.setupTrace();

    this.grid.addEventListener('click', e => {
      const t = e.target.closest('.abc-tile'); if (!t) return;
      this.stopSong();
      this.select(+t.dataset.i, true);
    });
    U.$$('.tab', root).forEach(t => t.addEventListener('click', () => {
      U.$$('.tab', root).forEach(x => x.classList.toggle('active', x === t));
      this.caseMode = t.dataset.case;
      U.$$('.abc-tile .letter', root).forEach((el, i) => { el.textContent = this.caseMode === 'upper' ? A[i].letter : A[i].letter.toLowerCase(); });
      this.select(this.index, false);
    }));
    root.querySelector('#abc-song').addEventListener('click', () => this.song ? this.stopSong() : this.playSong());
    root.querySelector('#trace-clear').addEventListener('click', () => this.drawTraceBase());
    this.select(0, false);
  },

  select(i, speak) {
    const A = KW.data.alphabet, l = A[i]; this.index = i;
    const letter = this.caseMode === 'upper' ? l.letter : l.letter.toLowerCase();
    this.big.style.setProperty('--c1', l.c1); this.big.style.setProperty('--c2', l.c2);
    this.big.innerHTML = '<div class="letters anim-pop">' + l.letter + l.letter.toLowerCase() + '</div>' +
      '<div class="word"><span class="emoji">' + l.emoji + '</span><b>' + l.word + '</b><p>' + l.letter + ' is for ' + l.word + '</p>' +
      '<button class="btn btn-ghost btn-sm mt-1" data-speak="' + l.letter + '. ' + l.letter + ' is for ' + l.word + '">🔊 Hear it</button></div>';
    KW.ui.enhance(this.big);
    KW.utils.$$('.abc-tile', this.grid).forEach((t, k) => t.classList.toggle('active', k === i));
    this.drawTraceBase(letter);
    if (speak) { KW.sound.speak(l.letter + '. ' + l.letter + ' is for ' + l.word); KW.store.heardLetter(l.letter); }
  },

  playSong() {
    const A = KW.data.alphabet; let i = 0;
    const btn = document.getElementById('abc-song'); btn.textContent = '⏹ Stop song';
    const step = () => {
      if (i >= A.length) { this.stopSong(); KW.ui.toast('🎉 You sang the whole alphabet!', 'success'); KW.store.addStars(2, 'ABC song'); return; }
      this.select(i, false);
      KW.sound.speak(A[i].letter); KW.store.heardLetter(A[i].letter);
      i++;
      this.song = setTimeout(step, 1100);
    };
    step();
  },
  stopSong() {
    clearTimeout(this.song); this.song = null; KW.sound.stopSpeaking();
    const btn = document.getElementById('abc-song'); if (btn) btn.textContent = '🎵 Play ABC song';
  },

  /* ---- Tracing canvas ---- */
  setupTrace() {
    const cv = this.canvas, ctx = cv.getContext('2d');
    let drawing = false, last = null;
    const pos = e => {
      const r = cv.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return { x: (p.clientX - r.left) * cv.width / r.width, y: (p.clientY - r.top) * cv.height / r.height };
    };
    const start = e => { drawing = true; last = pos(e); e.preventDefault(); };
    const move = e => {
      if (!drawing) return; e.preventDefault();
      const p = pos(e);
      ctx.strokeStyle = '#6C5CE7'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      last = p;
    };
    const end = () => { drawing = false; };
    cv.addEventListener('mousedown', start); cv.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
    cv.addEventListener('touchstart', start, { passive: false }); cv.addEventListener('touchmove', move, { passive: false }); cv.addEventListener('touchend', end);
    this._traceCleanup = () => window.removeEventListener('mouseup', end);
  },
  drawTraceBase(letter) {
    if (letter) this._traceLetter = letter;
    const cv = this.canvas, ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.font = '700 230px Fredoka, Nunito, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(108, 92, 231, 0.16)';
    ctx.fillText(this._traceLetter || 'A', cv.width / 2, cv.height / 2 + 10);
    ctx.setLineDash([10, 10]); ctx.strokeStyle = 'rgba(108, 92, 231, 0.5)'; ctx.lineWidth = 3;
    ctx.strokeText(this._traceLetter || 'A', cv.width / 2, cv.height / 2 + 10);
    ctx.setLineDash([]);
  },

  destroy() { this.stopSong(); if (this._traceCleanup) this._traceCleanup(); }
};
