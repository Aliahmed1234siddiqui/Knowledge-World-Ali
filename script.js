/* ==========================================================================
   Knowledge World – landing page interactions
   - Memory Quest game (with win detection)
   - Button actions via data-action: login | signup | logout | explore | demo | plan
   - Login / sign-up modal (saved in localStorage – no server needed)
   - Toast notifications, reveal-on-scroll, active nav link
   ========================================================================== */

/* ---------- Config ---------- */
const APP_URL = 'knowledge-world/index.html'; // the full learning app (same repo)
const STORAGE_KEY = 'kw_user';

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function toast(message, type = 'info', ms = 2800) {
  const root = $('#toast-root');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  root.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, ms);
}

function loadUser() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null; } catch (e) { return null; }
}
function saveUser(user) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(user)); } catch (e) { /* private mode */ }
}
/** Logging out keeps the account on this device; it only ends the session. */
function endSession() {
  const user = loadUser();
  if (user) { user.loggedIn = false; saveUser(user); }
}
function isLoggedIn() {
  const user = loadUser();
  return !!(user && user.loggedIn);
}

/* ==========================================================================
   Memory Quest
   ========================================================================== */
const memoryGame = $('#memory-game');
const scoreElement = $('#score');
const restartButton = $('#restart-game');

const icons = ['🚀', '🎨', '🧠', '🔬', '🌍', '🎵'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let boardLocked = false;

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
  cards = shuffle(doubledIcons).map((icon, index) => ({ id: `${icon}-${index}`, icon, matched: false }));

  memoryGame.innerHTML = cards
    .map(
      (card, index) => `
        <button class="memory-card" data-index="${index}" aria-label="Memory card ${index + 1}">
          <div class="memory-inner">
            <div class="memory-face memory-front">?</div>
            <div class="memory-face memory-back">${card.icon}</div>
          </div>
        </button>`
    )
    .join('');

  flippedCards = [];
  matchedPairs = 0;
  score = 0;
  boardLocked = false;
  scoreElement.textContent = score;
}

function setCardsClass(indexes, className, add) {
  $$('.memory-card').forEach((element) => {
    if (indexes.includes(Number(element.dataset.index))) element.classList.toggle(className, add);
  });
}

function handleCardClick(cardElement) {
  const cardIndex = Number(cardElement.dataset.index);

  // Ignore clicks while two mismatched cards are being hidden, or on open/matched cards
  if (
    boardLocked ||
    flippedCards.includes(cardIndex) ||
    cardElement.classList.contains('is-flipped') ||
    cardElement.classList.contains('is-matched')
  ) {
    return;
  }

  cardElement.classList.add('is-flipped');
  flippedCards.push(cardIndex);
  if (flippedCards.length < 2) return;

  const [firstIndex, secondIndex] = flippedCards;
  const isMatch = cards[firstIndex].icon === cards[secondIndex].icon;

  if (isMatch) {
    score += 10;
    matchedPairs += 1;
    scoreElement.textContent = score;
    setCardsClass([firstIndex, secondIndex], 'is-matched', true);
    flippedCards = [];

    if (matchedPairs === icons.length) {
      score += 25;
      scoreElement.textContent = score;
      setTimeout(() => toast(`🎉 You matched them all! Final score: ${score}`, 'success', 4000), 350);
    }
  } else {
    boardLocked = true;
    setTimeout(() => {
      setCardsClass([firstIndex, secondIndex], 'is-flipped', false);
      flippedCards = [];
      boardLocked = false;
    }, 700);
  }
}

// One listener on the board (event delegation) – works for every rebuilt board
memoryGame.addEventListener('click', (event) => {
  const card = event.target.closest('.memory-card');
  if (card) handleCardClick(card);
});
restartButton.addEventListener('click', () => {
  buildMemoryBoard();
  toast('New board ready. Find all 6 pairs!', 'info', 1800);
});
buildMemoryBoard();

/** Quick preview used by "Watch demo": flip every card face-up for a moment. */
function demoPreview() {
  const all = $$('.memory-card');
  boardLocked = true;
  all.forEach((c, i) => setTimeout(() => c.classList.add('is-flipped'), i * 60));
  setTimeout(() => {
    all.forEach((c) => { if (!c.classList.contains('is-matched')) c.classList.remove('is-flipped'); });
    flippedCards = [];
    boardLocked = false;
    toast("Now it's your turn – remember where the pairs are!", 'info', 2600);
  }, all.length * 60 + 1600);
}

/* ==========================================================================
   Modal: login / sign up / choose plan
   ========================================================================== */
const modalRoot = $('#modal-root');
const form = $('#account-form');
const formError = $('#form-error');

function setMode(mode, plan) {
  $('#form-mode').value = mode;
  $('#form-plan').value = plan ? plan.name : '';
  const isLogin = mode === 'login';
  $('#field-name').classList.toggle('hidden', isLogin);
  $('#field-child').classList.toggle('hidden', isLogin);
  $('#modal-eyebrow').textContent = plan ? `${plan.name} plan · ${plan.price}` : isLogin ? 'Welcome back' : 'Welcome';
  $('#modal-title').textContent = plan ? `Start the ${plan.name} plan` : isLogin ? 'Log in to Knowledge World' : 'Create your free account';
  $('#modal-text').textContent = plan
    ? 'Create your account to activate this plan. You can change or cancel any time.'
    : isLogin
      ? 'Enter your email and password to continue.'
      : "Join Knowledge World and start your child's learning adventure.";
  $('#form-submit').textContent = plan ? `Choose ${plan.name}` : isLogin ? 'Log in' : 'Start free';
  $('#switch-text').textContent = isLogin ? 'New here?' : 'Already have an account?';
  $('#switch-mode').textContent = isLogin ? 'Create an account' : 'Log in';
  formError.textContent = '';
}

function openModal(mode, plan) {
  setMode(mode, plan);
  const user = loadUser();
  if (user) {
    $('#f-name').value = user.name || '';
    $('#f-child').value = user.child || '';
    $('#f-email').value = user.email || '';
  }
  modalRoot.classList.add('open');
  modalRoot.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => (mode === 'login' ? $('#f-email') : $('#f-name')).focus(), 60);
}

function closeModal() {
  modalRoot.classList.remove('open');
  modalRoot.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

$$('[data-close]', modalRoot).forEach((el) => el.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalRoot.classList.contains('open')) closeModal();
});
$('#switch-mode').addEventListener('click', () => setMode($('#form-mode').value === 'login' ? 'signup' : 'login'));

function showError(message) {
  formError.textContent = message;
  form.classList.remove('shake');
  void form.offsetWidth;
  form.classList.add('shake');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const mode = $('#form-mode').value;
  const plan = $('#form-plan').value;
  const name = $('#f-name').value.trim();
  const child = $('#f-child').value.trim();
  const email = $('#f-email').value.trim();
  const pass = $('#f-pass').value;

  if (mode !== 'login' && !name) return showError('Please enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError('Please enter a valid email address.');
  if (pass.length < 6) return showError('Password must be at least 6 characters.');

  const existing = loadUser();
  if (mode === 'login' && (!existing || existing.email.toLowerCase() !== email.toLowerCase())) {
    return showError('No account found for that email on this device. Create one instead.');
  }

  const user = mode === 'login'
    ? existing
    : { name, child, email, plan: plan || (existing && existing.plan) || 'Free', createdAt: Date.now() };
  if (plan) user.plan = plan;
  user.loggedIn = true;
  saveUser(user);
  $('#f-pass').value = '';
  closeModal();
  renderUser();

  if (plan) toast(`✅ ${plan} plan selected for ${user.child || user.name}. Enjoy the adventure!`, 'success', 3600);
  else if (mode === 'login') toast(`👋 Welcome back, ${user.name}!`, 'success');
  else toast(`🎉 Account created. Welcome, ${user.name}!`, 'success');
});

/** Update the nav buttons depending on whether someone is logged in. */
function renderUser() {
  const user = loadUser();
  const loginBtn = $('#nav-login');
  const signupBtn = $('#nav-signup');
  if (user && user.loggedIn) {
    loginBtn.textContent = `Hi, ${user.name.split(' ')[0]} · Log out`;
    loginBtn.dataset.action = 'logout';
    signupBtn.textContent = 'Open the app';
    signupBtn.dataset.action = 'explore';
  } else {
    loginBtn.textContent = 'Log in';
    loginBtn.dataset.action = 'login';
    signupBtn.textContent = 'Start free';
    signupBtn.dataset.action = 'signup';
  }
}

/* ==========================================================================
   Button actions (data-action="...")
   ========================================================================== */
const actions = {
  login: () => openModal('login'),
  signup: () => openModal('signup'),
  logout: () => { endSession(); renderUser(); toast('You are logged out. See you soon! 👋'); },
  explore: () => { window.location.href = `${APP_URL}#/worlds`; },
  demo: () => {
    $('#games').scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(demoPreview, 650);
  },
  plan: (btn) => openModal('signup', { name: btn.dataset.plan, price: btn.dataset.price })
};

document.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-action]');
  if (!btn) return;
  const handler = actions[btn.dataset.action];
  if (handler) handler(btn);
});

renderUser();

/* ==========================================================================
   Reveal on scroll + active nav link
   ========================================================================== */
const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }),
  { threshold: 0.18 }
);
$$('.reveal').forEach((item) => observer.observe(item));

const sections = $$('main section[id]');
const navLinks = $$('.nav-links a');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));
