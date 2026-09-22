# 🌍 Knowledge World

A professional, 3D, multi-feature learning playground for kids. Inspired by
[knowledgeworlda.web.app](https://knowledgeworlda.web.app/) and rebuilt from scratch with a
creative UI, games, sounds, progress tracking and a data-driven structure that is easy to update.

No build step, no framework, no backend. Plain HTML + CSS + JavaScript, so it runs anywhere
(Vercel, GitHub Pages, Netlify, a school laptop).

## ✨ Features

| Area | What kids get |
|---|---|
| 🌍 **15 learning worlds** | Animals, Fruits, Vegetables, Transport, Clothes, Body Parts, Colours, Shapes, Space, Jobs, Weather, Sports, Bugs, Food, Music, 200+ words with fun facts |
| 🔊 **Voice** | Every word, letter, number and fact is read aloud (browser speech, no audio files) |
| 🔤 **Alphabet** | A–Z tiles, upper/lower case, ABC song, letter tracing canvas |
| 🔢 **Numbers** | 1–100 grid, number names, skip counting (even/odd/5s/10s), number facts, counting game |
| ✖️ **Tables** | Tables 1–20, visual groups, read-aloud mode, 10-question test |
| 🎮 **6 games** | Memory Match, Quiz Blitz, Spelling Bee, Math Race, Odd One Out, Catch It! (whack-a-mole) |
| ⭐ **Progress** | Stars, levels, 20 badges, per-world progress, best scores, avatar & name, saved in localStorage |
| 🎨 **3D & motion** | Three.js hero planet with rings, moons, floating shapes and starfield; 3D tilt cards; confetti |
| 🌙 **Day / night theme**, 🔍 **search**, 📅 **word & fact of the day**, 📱 fully responsive, ♿ keyboard focus styles |

## 🚀 Run it

Just open `index.html` in a browser, or serve the folder:

```bash
# any static server works
npx serve knowledge-world
# or
python -m http.server 8080 --directory knowledge-world
```

### Deploy

This folder is deployed together with the landing page at the repository root on **Vercel** (see the root README).
It is a plain static folder, so it also works on GitHub Pages, Netlify or any static host. Because routing uses
`#/hash` URLs, no server rewrites are needed.

## 🗂️ Project structure

```
knowledge-world/
├── index.html              # shell: nav, footer, script order
├── css/
│   ├── variables.css       # 🎨 design tokens (colours, fonts, radius, dark theme)
│   ├── base.css            # reset, buttons, cards, chips, tabs, grid
│   ├── animations.css      # keyframes + reveal/stagger helpers
│   ├── components.css      # nav, search, modal, toast, cards, page header
│   ├── pages.css           # hero, home, alphabet, numbers, tables, progress
│   └── games.css           # game boards
└── js/
    ├── config.js           # global KW namespace + settings
    ├── data/
    │   ├── categories.js   # ✏️ WORLDS & WORDS  (edit this most)
    │   ├── alphabet.js     # letters, number names
    │   └── badges.js       # badge rules
    ├── core/
    │   ├── utils.js        # helpers
    │   ├── sound.js        # Web Audio effects + speech
    │   ├── store.js        # localStorage progress
    │   ├── ui.js           # modal, toast, confetti, tilt, item detail
    │   ├── router.js       # hash router
    │   └── hero3d.js       # Three.js hero scene
    ├── games/
    │   ├── _shared.js      # setup / HUD / result helpers
    │   ├── memory.js  quiz.js  spelling.js  math.js  oddone.js  catch.js
    ├── pages/
    │   ├── home.js  worlds.js  learn.js  alphabet.js  numbers.js
    │   ├── tables.js  games.js  progress.js  about.js
    └── app.js              # routes, theme, sound, search, boot
```

## ✏️ How to update content

### Add a word
Open `js/data/categories.js`, find the world, add one line:

```js
{ name: 'Parrot', emoji: '🦜', fact: 'Parrots can copy human words!' }
```

### Add a whole new world
Copy any category block and change `id`, `name`, `emoji`, `c1`/`c2` (two gradient colours), `desc`, `items`.
It automatically appears on Home, Worlds, all games' world pickers, search, progress and badges.

### Add a game
Create `js/games/mygame.js`:

```js
KW.games.mygame = {
  id: 'mygame', name: 'My Game', emoji: '🎲', desc: 'What it does', c1: '#6C5CE7', c2: '#F368E0',
  usesCategory: true,                       // show a world picker?
  start(container, opts) { /* opts.categoryId when launched from a world page */ },
  stop() { /* clear timers */ }
};
```

Add a `<script>` tag for it in `index.html` after `_shared.js`. It shows up on Home, the Game Zone,
and (if `usesCategory`) can be added as a tab in `js/pages/learn.js`.
Use `KW.games.shared.setup / hud / result` for a consistent look and automatic stars & scores.

### Add a badge
One line in `js/data/badges.js`:

```js
{ id: 'night-owl', name: 'Night Owl', emoji: '🦉', desc: 'Use night mode', check: s => s.theme === 'dark' }
```

### Change the look
All colours, fonts, radii and shadows are CSS variables in `css/variables.css`.
Fonts come from Google Fonts (Fredoka + Nunito); swap the `<link>` in `index.html`.

## 🧩 Tech notes

- Scripts are classic (non-module) files loaded in order so the site works from `file://` as well as any host.
- Three.js r128 is loaded from cdnjs; if WebGL is unavailable the hero gracefully falls back to the gradient.
- Progress is stored under the key `kw_progress_v1`. Bump `storageKey` in `js/config.js` if the shape changes.
- Speech uses `speechSynthesis`; sound effects are synthesised with the Web Audio API.
