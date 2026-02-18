import { useState, useEffect } from 'react'
import { THEME, FONTS } from './theme.js'
import Header  from './components/Header.jsx'
import Footer  from './components/Footer.jsx'
import HomePage from './components/HomePage.jsx'
import WikiPage from './components/WikiPage.jsx'

/* ── Markdown content imported as raw strings via Vite's ?raw suffix ─────── */
import streamingMD     from './content/streaming.md?raw'
import selfhostingMD   from './content/selfhosting.md?raw'
import applicationsMD  from './content/applications.md?raw'
import miscellaneousMD from './content/miscellaneous.md?raw'

/* Page registry — maps route key → markdown content */
const PAGES = {
  streaming:     streamingMD,
  selfhosting:   selfhostingMD,
  applications:  applicationsMD,
  miscellaneous: miscellaneousMD,
}

/**
 * Root application component.
 * Manages:
 *  - Client-side routing via `page` state
 *  - Dark / light theme via `dark` state
 *  - Scroll-to-top on every page change
 */
export default function App() {
  const [dark, setDark] = useState(true)
  const [page, setPage] = useState('home')

  const t = dark ? THEME.dark : THEME.light

  /* Scroll to top whenever the user navigates to a new page */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  /* Render current page */
  const renderPage = () => {
    if (page === 'home') {
      return <HomePage setPage={setPage} dark={dark} t={t} />
    }
    const content = PAGES[page]
    return content ? <WikiPage content={content} t={t} dark={dark} /> : null
  }

  return (
    <div
      style={{
        background: t.bg,
        color: t.text,
        minHeight: '100vh',
        transition: 'background 0.3s, color 0.3s',
        fontFamily: FONTS.body,
      }}
    >
      <Header currentPage={page} setPage={setPage} dark={dark} setDark={setDark} t={t} />

      {/* key forces re-mount (and fade-in animation) on route change */}
      <div key={page} className="page-enter">
        {renderPage()}
      </div>

      <Footer t={t} />
    </div>
  )
}
