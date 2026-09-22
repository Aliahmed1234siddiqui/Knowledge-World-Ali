const memoryGame = document.querySelector('#memory-game');
const scoreElement = document.querySelector('#score');
const restartButton = document.querySelector('#restart-game');

const icons = ['🚀', '🎨', '🧠', '🔬', '🌍', '🎵'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildMemoryBoard() {
  const doubledIcons = [...icons, ...icons];
  cards = shuffle(doubledIcons).map((icon, index) => ({
    id: `${icon}-${index}`,
    icon,
    matched: false,
  }));

  memoryGame.innerHTML = cards
    .map(
      (card, index) => `
        <button class="memory-card" data-index="${index}" aria-label="Memory card ${index + 1}">
          <div class="memory-inner">
            <div class="memory-face memory-front">?</div>
            <div class="memory-face memory-back">${card.icon}</div>
          </div>
        </button>
      `
    )
    .join('');

  flippedCards = [];
  matchedPairs = 0;
  score = 0;
  scoreElement.textContent = score;

  document.querySelectorAll('.memory-card').forEach((cardElement) => {
    cardElement.addEventListener('click', () => handleCardClick(cardElement));
  });
}

function handleCardClick(cardElement) {
  const cardIndex = Number(cardElement.dataset.index);
  const selectedCard = cards[cardIndex];

  if (
    flippedCards.includes(cardIndex) ||
    cardElement.classList.contains('is-flipped') ||
    cardElement.classList.contains('is-matched')
  ) {
    return;
  }

  cardElement.classList.add('is-flipped');
  flippedCards.push(cardIndex);

  if (flippedCards.length === 2) {
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.icon === secondCard.icon) {
      score += 10;
      scoreElement.textContent = score;
      matchedPairs += 1;

      document
        .querySelectorAll('.memory-card')
        .forEach((element) => {
          const dataIndex = Number(element.dataset.index);
          if (dataIndex === firstIndex || dataIndex === secondIndex) {
            element.classList.add('is-matched');
          }
        });

      flippedCards = [];

      if (matchedPairs === icons.length) {
        score += 25;
        scoreElement.textContent = score;
      }
    } else {
      setTimeout(() => {
        document.querySelectorAll('.memory-card').forEach((element) => {
          const dataIndex = Number(element.dataset.index);
          if (dataIndex === firstIndex || dataIndex === secondIndex) {
            element.classList.remove('is-flipped');
          }
        });
        flippedCards = [];
      }, 700);
    }
  }
}

restartButton.addEventListener('click', buildMemoryBoard);

buildMemoryBoard();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.18,
  }
);

document.querySelectorAll('.reveal').forEach((item) => {
  observer.observe(item);
});
