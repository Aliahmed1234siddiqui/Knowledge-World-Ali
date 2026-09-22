# Knowledge World

Two parts, one static project, no build step:

| Path | What it is |
|---|---|
| `index.html` + `styles.css` + `script.js` | **Landing page** – hero, programs, Memory Quest mini-game, stories, plans, login / sign-up modal |
| `knowledge-world/` | **The full learning app** – 15 worlds, ABC / numbers / tables, 6 games, stars & badges (see its own README) |

The landing page's "Explore adventures", "Start free" (after login) and "More games" buttons open the app at
`knowledge-world/index.html`.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy to Vercel

1. Push this folder to GitHub (or use the Vercel CLI).
2. In Vercel: **Add New Project → Import** the repo.
3. Framework preset: **Other**. Build command: *(leave empty)*. Output directory: *(leave empty / root)*.
4. Deploy.

`vercel.json` already sets clean URLs and trailing slashes so that both `/` (landing) and
`/knowledge-world/` (app) work, including the app's `#/route` links.

With the CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## Accounts and plans

Login / sign-up and plan selection are **front-end only**: the account is saved in the browser's
`localStorage` (key `kw_user`). There is no server and no payment processing. To connect a real backend,
replace `saveUser` / `loadUser` in `script.js` with API calls.
