/* ==========================================================================
   Knowledge World – global namespace & configuration
   Everything hangs off window.KW so files can be loaded as plain scripts
   (no build step, works from file:// and any static host like Firebase).
   ========================================================================== */
window.KW = {
  version: '1.0.0',
  config: {
    siteName: 'Knowledge World',
    tagline: 'Learn • Play • Explore',
    storageKey: 'kw_progress_v1',
    // Stars awarded
    starsPerLearn: 1,          // marking a word as learned
    quizQuestions: 10,
    spellingWords: 8,
    mathSeconds: 60,
    catchSeconds: 45,
    oddRounds: 10,
    avatars: ['🦊', '🐼', '🦁', '🐸', '🦄', '🐧', '🐯', '🐰', '🐨', '🦖', '🤖', '👽', '🧑‍🚀', '🧚', '🐙', '🦋']
  },
  data: {},
  pages: {},
  games: {}
};
