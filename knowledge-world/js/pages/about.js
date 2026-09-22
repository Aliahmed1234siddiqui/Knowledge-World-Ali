/* ==========================================================================
   Page: About + notes for parents / teachers / developers
   ========================================================================== */
KW.pages.about = {
  title: 'About',
  render() {
    return KW.ui.pageHead({
      emoji: '💜', c1: '#6C5CE7', c2: '#F368E0', title: 'About Knowledge World',
      desc: 'A joyful, safe place where imagination and learning go hand in hand.'
    }) +
    '<section class="section container about-content">' +
    '<div class="card"><h3>🌟 Our idea</h3><p>Children learn best when they are having fun. Knowledge World mixes colourful 3D visuals, a friendly voice, fun facts and quick games so every minute feels like play and every minute teaches something new.</p></div>' +
    '<div class="card" id="parents"><h3>👨‍👩‍👧 For parents & teachers</h3>' +
    '<ul><li><b>No ads, no accounts.</b> Progress is saved only on this device in the browser.</li>' +
    '<li><b>Sound & speech</b> use the browser\'s built-in voice. Use the 🔊 button in the top bar to mute.</li>' +
    '<li><b>Stars</b> are earned for learning words, singing the ABC, reading tables and winning games. <b>Badges</b> unlock automatically.</li>' +
    '<li><b>Tip:</b> the Slideshow button on any world reads every card aloud, perfect for younger kids.</li></ul></div>' +
    '<div class="card"><h3>🧑‍💻 For developers – how to update</h3>' +
    '<p>Everything is plain HTML, CSS and JavaScript with no build step. Content lives in small data files:</p>' +
    '<ul><li><code>js/data/categories.js</code> – add a world or a word (name, emoji, fact). Games, quizzes and progress pick it up automatically.</li>' +
    '<li><code>js/data/alphabet.js</code> – letters, example words, number names.</li>' +
    '<li><code>js/data/badges.js</code> – badge rules.</li>' +
    '<li><code>js/games/*.js</code> – one file per game; register a new one on <code>KW.games</code> and it appears everywhere.</li>' +
    '<li><code>css/variables.css</code> – colours, fonts and spacing.</li></ul>' +
    '<pre>{ name: \'Parrot\', emoji: \'🦜\', fact: \'Parrots can copy human words!\' }</pre>' +
    '<p class="muted" style="margin:0">Version ' + KW.version + '</p></div>' +
    '</section>';
  }
};
