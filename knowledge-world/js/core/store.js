/* ==========================================================================
   Store – progress saved in localStorage (stars, learned words, scores, badges)
   ========================================================================== */
KW.store = {
  state: null,

  defaults() {
    return {
      name: '', avatar: '🦊', theme: 'light', sound: true,
      stars: 0, learned: {}, scores: {}, badges: [], played: 0, visited: [], abcHeard: [],
      createdAt: Date.now()
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(KW.config.storageKey);
      this.state = raw ? Object.assign(this.defaults(), JSON.parse(raw)) : this.defaults();
    } catch (e) { this.state = this.defaults(); }
    return this.state;
  },

  save() {
    try { localStorage.setItem(KW.config.storageKey, JSON.stringify(this.state)); } catch (e) { /* private mode */ }
    document.dispatchEvent(new CustomEvent('kw:store', { detail: this.state }));
  },

  get(k) { return this.state[k]; },
  set(k, v) { this.state[k] = v; this.save(); },

  /* ---- Stars ---- */
  addStars(n, reason) {
    this.state.stars += n;
    this.save();
    KW.ui.starPop(n, reason);
    KW.sound.star();
    this.checkBadges();
  },

  /* ---- Learned words ---- */
  markLearned(catId, name) {
    const list = this.state.learned[catId] || (this.state.learned[catId] = []);
    if (list.includes(name)) return false;
    list.push(name);
    this.save();
    this.addStars(KW.config.starsPerLearn, 'Learned ' + name);
    return true;
  },
  isLearned(catId, name) { return (this.state.learned[catId] || []).includes(name); },
  learnedCount(catId) { return (this.state.learned[catId] || []).length; },
  totalLearned() { return Object.values(this.state.learned).reduce((a, b) => a + b.length, 0); },

  /* ---- Alphabet ---- */
  heardLetter(letter) {
    if (!this.state.abcHeard.includes(letter)) { this.state.abcHeard.push(letter); this.save(); this.checkBadges(); }
  },

  /* ---- Visits ---- */
  visit(catId) {
    if (!this.state.visited.includes(catId)) { this.state.visited.push(catId); this.save(); this.checkBadges(); }
  },

  /* ---- Game scores ---- */
  recordScore(gameId, score) {
    this.state.played++;
    const best = this.state.scores[gameId] || 0;
    const isBest = score > best;
    if (isBest) this.state.scores[gameId] = score;
    this.save();
    this.checkBadges();
    return isBest;
  },
  best(gameId) { return this.state.scores[gameId] || 0; },

  /* ---- Level (every 25 stars) ---- */
  level() { return Math.floor(this.state.stars / 25) + 1; },
  levelProgress() { return (this.state.stars % 25) / 25 * 100; },

  /* ---- Badges ---- */
  checkBadges() {
    KW.data.badges.forEach(b => {
      let ok = false;
      try { ok = b.check(this.state); } catch (e) { ok = false; }
      if (ok && !this.state.badges.includes(b.id)) {
        this.state.badges.push(b.id);
        this.save();
        KW.ui.toast('🏅 Badge unlocked: <b>' + b.name + '</b>!', 'success', 3200);
        KW.sound.win();
      }
    });
  },

  reset() {
    const keep = { theme: this.state.theme, sound: this.state.sound };
    this.state = Object.assign(this.defaults(), keep);
    this.save();
  }
};
