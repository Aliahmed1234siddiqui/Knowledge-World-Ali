/* ==========================================================================
   Sound – synthesised effects (Web Audio) + text-to-speech
   No audio files needed, so the site stays tiny and works offline.
   ========================================================================== */
KW.sound = {
  ctx: null,
  enabled: true,

  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  tone(freq, dur, type, vol, delay) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    dur = dur || 0.15; type = type || 'sine'; vol = vol == null ? 0.2 : vol; delay = delay || 0;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  },

  click() { this.tone(620, 0.07, 'triangle', 0.1); },
  flip() { this.tone(420, 0.09, 'sine', 0.14); this.tone(640, 0.09, 'sine', 0.1, 0.05); },
  pop() { this.tone(900, 0.06, 'square', 0.06); },
  tick() { this.tone(1000, 0.04, 'square', 0.04); },
  correct() { [523, 659, 784].forEach((f, i) => this.tone(f, 0.18, 'triangle', 0.18, i * 0.09)); },
  wrong() { this.tone(210, 0.22, 'sawtooth', 0.1); this.tone(160, 0.3, 'sawtooth', 0.09, 0.12); },
  star() { this.tone(880, 0.12, 'sine', 0.15); this.tone(1320, 0.22, 'sine', 0.15, 0.09); },
  win() { [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => this.tone(f, 0.24, 'triangle', 0.2, i * 0.11)); },
  lose() { [392, 349, 311, 262].forEach((f, i) => this.tone(f, 0.3, 'triangle', 0.15, i * 0.18)); },

  /** Speak text out loud using the browser's voice. */
  speak(text, opts) {
    if (!this.enabled || !('speechSynthesis' in window)) return;
    opts = opts || {};
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = opts.rate || 0.88;
      u.pitch = opts.pitch || 1.15;
      u.lang = 'en-US';
      const voices = speechSynthesis.getVoices();
      const v = voices.find(v => /en/i.test(v.lang) && /female|zira|samantha|google us|aria|jenny/i.test(v.name))
        || voices.find(v => /^en/i.test(v.lang));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) { /* speech not available */ }
  },
  stopSpeaking() { if ('speechSynthesis' in window) speechSynthesis.cancel(); },

  setEnabled(on) {
    this.enabled = !!on;
    if (!on) this.stopSpeaking();
    KW.store.set('sound', this.enabled);
    const btn = document.getElementById('sound-toggle');
    if (btn) btn.textContent = this.enabled ? '🔊' : '🔇';
  },
  toggle() { this.setEnabled(!this.enabled); return this.enabled; }
};

// Some browsers load voices asynchronously.
if ('speechSynthesis' in window) { speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices(); }
