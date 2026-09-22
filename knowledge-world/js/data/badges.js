/* ==========================================================================
   BADGES – each has a check(state) function evaluated after every change.
   Add a new badge here and it appears on the My Stars page automatically.
   ========================================================================== */
KW.data.badges = [
  { id: 'first-star', name: 'First Star', emoji: '⭐', desc: 'Earn your very first star', check: s => s.stars >= 1 },
  { id: 'star-10', name: 'Star Collector', emoji: '🌟', desc: 'Collect 10 stars', check: s => s.stars >= 10 },
  { id: 'star-50', name: 'Star Master', emoji: '💫', desc: 'Collect 50 stars', check: s => s.stars >= 50 },
  { id: 'star-100', name: 'Super Nova', emoji: '🌠', desc: 'Collect 100 stars', check: s => s.stars >= 100 },
  { id: 'star-250', name: 'Galaxy Hero', emoji: '🌌', desc: 'Collect 250 stars', check: s => s.stars >= 250 },
  { id: 'explorer', name: 'Explorer', emoji: '🧭', desc: 'Visit 5 different worlds', check: s => (s.visited || []).length >= 5 },
  { id: 'world-traveller', name: 'World Traveller', emoji: '🌍', desc: 'Visit every world', check: s => (s.visited || []).length >= KW.data.categories.length },
  { id: 'animal-friend', name: 'Animal Friend', emoji: '🦁', desc: 'Learn every animal', check: s => (s.learned.animals || []).length >= KW.data.categories.find(c => c.id === 'animals').items.length },
  { id: 'fruit-fan', name: 'Fruit Fan', emoji: '🍓', desc: 'Learn every fruit', check: s => (s.learned.fruits || []).length >= KW.data.categories.find(c => c.id === 'fruits').items.length },
  { id: 'word-wizard', name: 'Word Wizard', emoji: '🧙', desc: 'Learn 50 words', check: s => Object.values(s.learned).reduce((a, b) => a + b.length, 0) >= 50 },
  { id: 'memory-master', name: 'Memory Master', emoji: '🧠', desc: 'Win a Memory Match game', check: s => (s.scores.memory || 0) > 0 },
  { id: 'quiz-whiz', name: 'Quiz Whiz', emoji: '🎯', desc: 'Score 100 in Quiz Blitz', check: s => (s.scores.quiz || 0) >= 100 },
  { id: 'speller', name: 'Spelling Bee', emoji: '🐝', desc: 'Finish a Spelling Bee round', check: s => (s.scores.spelling || 0) > 0 },
  { id: 'math-whiz', name: 'Math Whiz', emoji: '🧮', desc: 'Score 15+ in Math Race', check: s => (s.scores.math || 0) >= 15 },
  { id: 'detective', name: 'Detective', emoji: '🕵️', desc: 'Score 8+ in Odd One Out', check: s => (s.scores.oddone || 0) >= 8 },
  { id: 'quick-hands', name: 'Quick Hands', emoji: '⚡', desc: 'Score 12+ in Catch It', check: s => (s.scores.catch || 0) >= 12 },
  { id: 'gamer', name: 'Game Champion', emoji: '🏆', desc: 'Play 10 games', check: s => s.played >= 10 },
  { id: 'abc-star', name: 'ABC Star', emoji: '🔤', desc: 'Hear every letter of the alphabet', check: s => (s.abcHeard || []).length >= 26 },
  { id: 'counter', name: 'Counting Champ', emoji: '🔢', desc: 'Win the counting game', check: s => (s.scores.counting || 0) >= 5 },
  { id: 'table-pro', name: 'Table Pro', emoji: '✖️', desc: 'Score 10/10 in a Table Test', check: s => (s.scores.tables || 0) >= 10 }
];
