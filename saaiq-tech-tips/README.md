# Saaiq's Tech Tips

A fast, modern wiki site for streaming, self-hosting, applications, and miscellaneous tech tips — built with React + Vite, zero external UI libraries.

---

## Folder Structure

```
saaiq-tech-tips/
├── index.html                    ← Entry HTML (loads fonts, mounts #root)
├── package.json
├── vite.config.js
│
└── src/
    ├── main.jsx                  ← React entry point; injects global CSS
    ├── App.jsx                   ← Root: routing + theme state
    ├── theme.js                  ← All colour tokens + font constants (THEME, SYN, FONTS)
    │
    ├── content/                  ← Raw markdown articles (one per wiki page)
    │   ├── streaming.md
    │   ├── selfhosting.md
    │   ├── applications.md
    │   └── miscellaneous.md
    │
    ├── utils/
    │   ├── markdown.js           ← Block + inline markdown parser (no deps)
    │   └── syntax.js             ← Regex-based syntax highlighter tokeniser
    │
    └── components/
        ├── Header.jsx            ← Sticky header with nav + theme toggle
        ├── Footer.jsx            ← Simple footer
        ├── HomePage.jsx          ← Hero landing page with animated background
        ├── WikiPage.jsx          ← Article page: skeleton → markdown render
        ├── TableOfContents.jsx   ← Collapsible floating ToC sidebar
        ├── MarkdownRenderer.jsx  ← Renders parsed blocks → themed JSX
        ├── CodeBlock.jsx         ← Syntax-highlighted fenced code
        ├── InlineContent.jsx     ← Bold, italic, inline-code, links
        ├── AnimatedBackground.jsx← Canvas particles + CSS gradient orbs
        └── SkeletonLoader.jsx    ← Shimmer placeholder while page loads
```

---

## Prerequisites

- **Node.js** 18 or later — download from [nodejs.org](https://nodejs.org)
- **npm** (comes with Node) or **pnpm** / **yarn** if you prefer

Check your version:

```bash
node -v   # should print v18.x.x or higher
npm  -v   # should print 9.x.x or higher
```

---

## Local Setup

### 1 — Clone or copy the project

```bash
# If you have it as a zip, unzip it first, then:
cd saaiq-tech-tips
```

### 2 — Install dependencies

```bash
npm install
```

This installs React, React-DOM, Vite, and the Vite React plugin — the only four packages needed.

### 3 — Start the development server

```bash
npm run dev
```

Vite will print something like:

```
  VITE v5.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open **http://localhost:5173** in your browser. The page hot-reloads whenever you save a file.

---

## Adding or Editing Content

Each wiki page maps to a plain Markdown file in `src/content/`:

| Page           | File                            |
|----------------|---------------------------------|
| Streaming      | `src/content/streaming.md`      |
| Self Hosting   | `src/content/selfhosting.md`    |
| Applications   | `src/content/applications.md`   |
| Miscellaneous  | `src/content/miscellaneous.md`  |

### Adding a New Page

1. Create `src/content/mypage.md`
2. In `src/App.jsx`, add `import mypageMD from './content/mypage.md?raw'` and add `mypage: mypageMD` to the `PAGES` object
3. In `src/components/Header.jsx`, add `{ key: 'mypage', label: 'My Page' }` to `NAV_ITEMS`

---

## Changing the Theme

Open `src/theme.js`. Every colour is defined in the `THEME.dark` and `THEME.light` objects. Edit values there — no hunting through component files.

Font families are defined in the `FONTS` constant at the bottom of the same file.

---

## Production Build

```bash
npm run build
```

Output goes to `dist/`. Serve it with any static host:

```bash
# Preview the production build locally
npm run preview

# Deploy to e.g. Cloudflare Pages, Netlify, or Vercel
# Just point the build command to `npm run build` and publish dir to `dist`
```

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Dev server + bundler |

| Font | Description |
|------|-------------|
| Bricolage Grotesque | Display/heading font |
| IBM Plex Sans | Body text font |
| Fira Code | Monospace / code font |

Zero runtime dependencies beyond React itself.
