/* ==========================================================================
   UI helpers – toast, modal, confetti, star pop, 3D tilt, reveal on scroll
   ========================================================================== */
KW.ui = {
  /* ---- Toast ---- */
  toast(msg, type, ms) {
    const root = document.getElementById('toast-root');
    const t = document.createElement('div');
    t.className = 'toast toast-' + (type || 'info');
    t.innerHTML = msg;
    root.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, ms || 2600);
  },

  /* ---- Modal ---- */
  modal(opts) {
    opts = opts || {};
    this.closeModal();
    const root = document.getElementById('modal-root');
    root.innerHTML =
      '<div class="modal-backdrop"><div class="modal ' + (opts.size || '') + '" role="dialog" aria-modal="true">' +
      '<button class="modal-close" aria-label="Close">✕</button>' +
      (opts.title ? '<h3 class="modal-title">' + opts.title + '</h3>' : '') +
      '<div class="modal-body">' + (opts.html || '') + '</div></div></div>';
    root.classList.add('open');
    const bd = root.querySelector('.modal-backdrop');
    bd.addEventListener('click', e => { if (e.target === bd) KW.ui.closeModal(); });
    root.querySelector('.modal-close').addEventListener('click', () => KW.ui.closeModal());
    document.body.style.overflow = 'hidden';
    const m = root.querySelector('.modal');
    this.enhance(m);
    if (opts.onMount) opts.onMount(m);
    this._onClose = opts.onClose;
    return m;
  },
  closeModal() {
    const root = document.getElementById('modal-root');
    if (!root.classList.contains('open')) return;
    root.classList.remove('open');
    root.innerHTML = '';
    document.body.style.overflow = '';
    KW.sound.stopSpeaking();
    if (this._onClose) { const f = this._onClose; this._onClose = null; f(); }
  },

  /* ---- Floating "+N ⭐" ---- */
  starPop(n, reason) {
    const el = document.createElement('div');
    el.className = 'star-pop';
    el.innerHTML = '<span>+' + n + ' ⭐</span>' + (reason ? '<small>' + KW.utils.esc(reason) + '</small>' : '');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
    const chip = document.getElementById('star-chip');
    if (chip) { chip.classList.remove('bump'); void chip.offsetWidth; chip.classList.add('bump'); }
  },

  /* ---- Confetti ---- */
  confetti(count) {
    const c = document.getElementById('confetti-canvas');
    const ctx = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    c.style.display = 'block';
    const colors = ['#6C5CE7', '#FF6B81', '#FFC940', '#00D2A8', '#4FB3FF', '#F368E0', '#FF9F43', '#7ED957'];
    const ps = Array.from({ length: count || 180 }, () => ({
      x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.6,
      w: 6 + Math.random() * 8, h: 8 + Math.random() * 10,
      c: colors[Math.floor(Math.random() * colors.length)],
      vy: 2.5 + Math.random() * 4, vx: (Math.random() - 0.5) * 3,
      r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.25
    }));
    const start = performance.now();
    cancelAnimationFrame(this._raf);
    const tick = (t) => {
      ctx.clearRect(0, 0, c.width, c.height);
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (t - start < 3600) this._raf = requestAnimationFrame(tick);
      else { ctx.clearRect(0, 0, c.width, c.height); c.style.display = 'none'; }
    };
    this._raf = requestAnimationFrame(tick);
  },

  /* ---- 3D tilt on hover ---- */
  tilt(el, max) {
    max = max || 12;
    if (window.matchMedia('(hover: none)').matches) return;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = 'perspective(900px) rotateX(' + (-y * max) + 'deg) rotateY(' + (x * max) + 'deg) translateY(-6px) scale(1.02)';
      el.style.setProperty('--gx', ((x + 0.5) * 100) + '%');
      el.style.setProperty('--gy', ((y + 0.5) * 100) + '%');
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  },

  /* ---- Reveal on scroll ---- */
  reveal(root) {
    const els = KW.utils.$$('.reveal', root);
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach(e => io.observe(e));
  },

  /** Wire up generic behaviours inside a freshly rendered container. */
  enhance(root) {
    KW.utils.$$('.tilt', root).forEach(el => this.tilt(el));
    KW.utils.$$('[data-speak]', root).forEach(el => {
      el.addEventListener('click', () => KW.sound.speak(el.getAttribute('data-speak')));
    });
    KW.utils.$$('[data-nav]', root).forEach(el => {
      el.addEventListener('click', () => { location.hash = el.getAttribute('data-nav'); });
    });
    this.reveal(root);
  },

  /* ---- Shared HTML snippets ---- */
  pageHead(o) {
    return '<section class="page-head" style="--c1:' + o.c1 + ';--c2:' + o.c2 + '"><div class="container">' +
      '<div class="head-emoji emoji">' + o.emoji + '</div><div>' +
      (o.back ? '<a class="back-link" href="' + o.back + '">← ' + (o.backLabel || 'Back') + '</a>' : '') +
      '<h1>' + o.title + '</h1><p>' + o.desc + '</p>' +
      (o.meta ? '<div class="head-meta">' + o.meta + '</div>' : '') +
      '</div></div></section>';
  },
  stars(n) {
    return '<div class="stars">' + [1, 2, 3].map(i => '<span class="' + (i <= n ? '' : 'off') + '">⭐</span>').join('') + '</div>';
  },

  /** Open the "word detail" modal used by worlds, search and daily word. */
  showItem(cat, item, list) {
    const S = KW.store, U = KW.utils;
    list = list || cat.items;
    const idx = list.indexOf(item);
    const learned = S.isLearned(cat.id, item.name);
    const letters = item.name.toUpperCase().split('').map((ch, i) => ch === ' ' ? '<i style="width:12px"></i>' : '<span style="animation-delay:' + (i * 60) + 'ms">' + ch + '</span>').join('');
    this.modal({
      html:
        '<div class="item-detail">' +
        '<div class="big-emoji emoji">' + item.emoji + '</div>' +
        '<h2>' + U.esc(item.name) + '</h2>' +
        '<div class="letters">' + letters + '</div>' +
        '<div class="fact">💡 ' + U.esc(item.fact) + '</div>' +
        '<div class="actions">' +
        '<button class="btn btn-primary" data-speak="' + U.esc(item.name) + '">🔊 Hear it</button>' +
        '<button class="btn btn-outline" id="hear-fact">📖 Read fact</button>' +
        '<button class="btn ' + (learned ? 'btn-mint' : 'btn-accent') + '" id="mark-learned">' + (learned ? '✅ Learned!' : '⭐ I learned it') + '</button>' +
        '</div>' +
        '<div class="item-nav">' +
        '<button class="btn btn-sm btn-outline" id="prev-item" ' + (idx <= 0 ? 'disabled' : '') + '>← Previous</button>' +
        '<span class="pill">' + (idx + 1) + ' / ' + list.length + '</span>' +
        '<button class="btn btn-sm btn-outline" id="next-item" ' + (idx >= list.length - 1 ? 'disabled' : '') + '>Next →</button>' +
        '</div></div>',
      onMount(m) {
        KW.sound.speak(item.name);
        m.querySelector('#hear-fact').addEventListener('click', () => KW.sound.speak(item.fact));
        m.querySelector('#mark-learned').addEventListener('click', function () {
          if (S.markLearned(cat.id, item.name)) {
            this.className = 'btn btn-mint'; this.textContent = '✅ Learned!';
            KW.ui.confetti(80);
          } else KW.ui.toast('You already learned this one! 🎉');
        });
        m.querySelector('#prev-item').addEventListener('click', () => KW.ui.showItem(cat, list[idx - 1], list));
        m.querySelector('#next-item').addEventListener('click', () => KW.ui.showItem(cat, list[idx + 1], list));
      }
    });
  }
};
