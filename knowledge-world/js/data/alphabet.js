/* ==========================================================================
   ALPHABET, NUMBER NAMES & MISC DATA
   ========================================================================== */
KW.data.alphabet = [
  { letter: 'A', word: 'Apple', emoji: '🍎', c1: '#FF6B81', c2: '#FF9F43' },
  { letter: 'B', word: 'Ball', emoji: '⚽', c1: '#4FB3FF', c2: '#6C5CE7' },
  { letter: 'C', word: 'Cat', emoji: '🐱', c1: '#FF9F43', c2: '#FFC940' },
  { letter: 'D', word: 'Dog', emoji: '🐶', c1: '#00D2A8', c2: '#4FB3FF' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', c1: '#6C5CE7', c2: '#F368E0' },
  { letter: 'F', word: 'Fish', emoji: '🐟', c1: '#4FB3FF', c2: '#00D2A8' },
  { letter: 'G', word: 'Grapes', emoji: '🍇', c1: '#F368E0', c2: '#6C5CE7' },
  { letter: 'H', word: 'House', emoji: '🏠', c1: '#FF6B81', c2: '#F368E0' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', c1: '#FFC940', c2: '#FF6B81' },
  { letter: 'J', word: 'Jellyfish', emoji: '🪼', c1: '#6C5CE7', c2: '#4FB3FF' },
  { letter: 'K', word: 'Kite', emoji: '🪁', c1: '#00D2A8', c2: '#7ED957' },
  { letter: 'L', word: 'Lion', emoji: '🦁', c1: '#FF9F43', c2: '#FF6B81' },
  { letter: 'M', word: 'Moon', emoji: '🌙', c1: '#1F2544', c2: '#6C5CE7' },
  { letter: 'N', word: 'Nest', emoji: '🪺', c1: '#7ED957', c2: '#FFC940' },
  { letter: 'O', word: 'Orange', emoji: '🍊', c1: '#FF9F43', c2: '#FFC940' },
  { letter: 'P', word: 'Penguin', emoji: '🐧', c1: '#4FB3FF', c2: '#1F2544' },
  { letter: 'Q', word: 'Queen', emoji: '👸', c1: '#F368E0', c2: '#FF6B81' },
  { letter: 'R', word: 'Rocket', emoji: '🚀', c1: '#FF6B81', c2: '#6C5CE7' },
  { letter: 'S', word: 'Sun', emoji: '☀️', c1: '#FFC940', c2: '#FF9F43' },
  { letter: 'T', word: 'Tiger', emoji: '🐯', c1: '#FF9F43', c2: '#1F2544' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', c1: '#6C5CE7', c2: '#4FB3FF' },
  { letter: 'V', word: 'Violin', emoji: '🎻', c1: '#FF9F43', c2: '#FF6B81' },
  { letter: 'W', word: 'Whale', emoji: '🐳', c1: '#4FB3FF', c2: '#00D2A8' },
  { letter: 'X', word: 'Xylophone', emoji: '🎼', c1: '#F368E0', c2: '#FFC940' },
  { letter: 'Y', word: 'Yo-yo', emoji: '🪀', c1: '#00D2A8', c2: '#6C5CE7' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', c1: '#1F2544', c2: '#4FB3FF' }
];

KW.data.numberNames = {
  0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
  11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
  20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety', 100: 'one hundred'
};

KW.data.numberName = function (n) {
  const names = KW.data.numberNames;
  if (names[n]) return names[n];
  if (n < 100) return names[Math.floor(n / 10) * 10] + '-' + names[n % 10];
  if (n < 1000) return names[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + KW.data.numberName(n % 100) : '');
  return String(n);
};

/* Emoji used to draw counting dots / groups */
KW.data.countEmojis = ['🍎', '⭐', '🐥', '🎈', '🍪', '🚗', '🐟', '🌸', '🧸', '🍓'];
