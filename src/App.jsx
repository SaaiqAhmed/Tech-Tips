import { useState, useEffect } from 'react'
import { THEME, FONTS } from './theme.js'
import Header  from './components/Header.jsx'
import Footer  from './components/Footer.jsx'
import HomePage from './components/HomePage.jsx'
import WikiPage from './components/WikiPage.jsx'
import { preloadMarkdownImages } from './utils/preload.js'

/* ── Markdown content imported as raw strings via Vite's ?raw suffix ─────── */
import streamingMD     from './content/streaming.md?raw'
import selfhostingMD   from './content/selfhosting.md?raw'
import torrentingMD  from './content/torrenting.md?raw'
import computerMD  from './content/computer.md?raw'
import miscellaneousMD from './content/miscellaneous.md?raw'

/* Page registry — maps route key → markdown content */
const PAGES = {
  streaming:     streamingMD,
  selfhosting:   selfhostingMD,
  torrenting:    torrentingMD,
  computer:    computerMD,
  miscellaneous: miscellaneousMD,
}

/**
 * Root application component.
 * Manages:
 *  - Client-side routing via `page` state
 *  - Dark / light theme via `dark` state
 *  - Scroll-to-top on every page change
 *  - Eager image preloading: all pages' images are preloaded in the
 *    background shortly after the app first mounts, and individual pages
 *    are also preloaded on nav-button hover for instant feels.
 */
export default function App() {
  const [dark, setDark] = useState(true)
  const [page, setPage] = useState('home')

  const t = dark ? THEME.dark : THEME.light

  /* Scroll to top on page change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  /**
   * Background preload — fires once after the home page has painted.
   * Staggers each page by 300 ms so the initial render isn't competing
   * with a burst of image fetches.
   */
  useEffect(() => {
    const keys    = Object.keys(PAGES)
    const timers  = keys.map((key, i) =>
      setTimeout(() => preloadMarkdownImages(PAGES[key]), 800 + i * 300)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const renderPage = () => {
    if (page === 'home') {
      return <HomePage setPage={setPage} dark={dark} t={t} pages={PAGES} />
    }
    const content = PAGES[page]
    return content ? <WikiPage content={content} t={t} dark={dark} /> : null
  }

  return (
    <div
      style={{
        background:  t.bg,
        color:       t.text,
        minHeight:   '100vh',
        transition:  'background 0.3s, color 0.3s',
        fontFamily:  FONTS.body,
      }}
    >
      <Header currentPage={page} setPage={setPage} dark={dark} setDark={setDark} t={t} pages={PAGES} />

      <div key={page} className="page-enter">
        {renderPage()}
      </div>

      <Footer t={t} />
    </div>
  )
}