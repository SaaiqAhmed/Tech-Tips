import { useState, useEffect, useRef } from 'react'
import { FONTS } from '../theme.js'
import { preloadPage } from '../utils/preload.js'

const NAV_ITEMS = [
  { key: 'streaming',     label: 'Streaming'    },
  { key: 'selfhosting',   label: 'Self Hosting' },
  { key: 'torrenting',  label: 'Torrenting' },
  { key: 'computer',  label: 'Computer Setup' },
  { key: 'miscellaneous', label: 'Misc' },
]

/**
 * Persistent header — visible on every page.
 *
 * Wide viewport (>= 768px):
 *   Logo | nav links | theme toggle — all inline, standard layout.
 *
 * Narrow viewport (< 768px):
 *   Logo on the left, hamburger button on the right.
 *   Tapping the hamburger opens a dropdown panel containing all nav
 *   links and the theme toggle.
 *
 * Preloading:
 *   Hovering any nav link triggers image preloading for that page so
 *   images are in the browser cache before the user finishes clicking.
 *   On mobile, focus events trigger the same preload since hover isn't
 *   reliable on touch devices.
 */
export default function Header({ currentPage, setPage, dark, setDark, t, pages }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [narrow,   setNarrow]   = useState(window.innerWidth < 768)
  const menuRef                 = useRef(null)

  useEffect(() => {
    const onResize = () => {
      const isNarrow = window.innerWidth < 768
      setNarrow(isNarrow)
      if (!isNarrow) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [menuOpen])

  const navigate = (key) => {
    setPage(key)
    setMenuOpen(false)
  }

  /* Trigger image preload on hover/focus — deduped inside preloadPage */
  const handleNavHover = (key) => {
    if (pages) preloadPage(key, pages)
  }

  const navBtn = (key) => {
    const active = currentPage === key
    return {
      background:   active ? t.accentDim : 'transparent',
      border:       'none',
      cursor:       'pointer',
      borderRadius: 6,
      fontFamily:   FONTS.body,
      fontSize:     '0.9rem',
      fontWeight:   active ? 600 : 400,
      color:        active ? t.accent : t.textMuted,
      transition:   'background 0.2s, color 0.2s',
    }
  }

  return (
    <div ref={menuRef} style={{ position: 'sticky', top: 0, zIndex: 300 }}>

      {/* ── Main header bar ── */}
      <header
        style={{
          background:     t.headerBg,
          backdropFilter: 'blur(12px)',
          borderBottom:   `1px solid ${t.border}`,
          padding:        '0 1.25rem',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          height:         58,
          transition:     'background 0.3s, border-color 0.3s',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          style={{
            background:    'none',
            border:        'none',
            cursor:        'pointer',
            fontFamily:    FONTS.heading,
            fontWeight:    800,
            fontSize:      '1.05rem',
            color:         t.accent,
            letterSpacing: '-0.01em',
            padding:       0,
            flexShrink:    0,
          }}
        >
          Saaiq's Tech Tips
        </button>

        {/* Wide nav — hover triggers preload */}
        {!narrow && (
          <nav style={{ display: 'flex', gap: '0.25rem' }}>
            {NAV_ITEMS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => navigate(key)}
                onMouseEnter={() => handleNavHover(key)}
                className="nav-link"
                style={{ ...navBtn(key), padding: '6px 12px' }}
              >
                {label}
              </button>
            ))}
          </nav>
        )}

        {/* Wide: theme toggle / Narrow: hamburger */}
        {!narrow ? (
          <button
            onClick={() => setDark(d => !d)}
            className="theme-btn"
            style={{
              background:   t.bgSecondary,
              border:       `1px solid ${t.border}`,
              borderRadius: 8,
              padding:      '6px 10px',
              cursor:       'pointer',
              fontSize:     16,
              lineHeight:   1,
              color:        t.text,
            }}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? '☀️' : '🌙'}
          </button>
        ) : (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              background:   menuOpen ? t.accentDim : t.bgSecondary,
              border:       `1px solid ${menuOpen ? t.accent : t.border}`,
              borderRadius: 8,
              padding:      '6px 10px',
              cursor:       'pointer',
              lineHeight:   1,
              color:        menuOpen ? t.accent : t.text,
              fontSize:     18,
              transition:   'background 0.2s, border-color 0.2s, color 0.2s',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}
      </header>

      {/* ── Mobile dropdown ── */}
      {narrow && (
        <div
          style={{
            overflow:       'hidden',
            maxHeight:      menuOpen ? 320 : 0,
            transition:     'max-height 0.28s cubic-bezier(.4,0,.2,1)',
            background:     t.headerBg,
            backdropFilter: 'blur(12px)',
            borderBottom:   menuOpen ? `1px solid ${t.border}` : 'none',
          }}
        >
          <div style={{ padding: '0.5rem 1rem 1rem' }}>
            {NAV_ITEMS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => navigate(key)}
                onMouseEnter={() => handleNavHover(key)}
                onFocus={() => handleNavHover(key)}
                style={{
                  ...navBtn(key),
                  display:      'block',
                  width:        '100%',
                  textAlign:    'left',
                  padding:      '10px 12px',
                  marginBottom: 2,
                  borderRadius: 8,
                }}
              >
                {label}
              </button>
            ))}

            <div style={{ borderTop: `1px solid ${t.border}`, margin: '0.6rem 0' }} />

            <button
              onClick={() => setDark(d => !d)}
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          10,
                width:        '100%',
                textAlign:    'left',
                background:   'transparent',
                border:       'none',
                cursor:       'pointer',
                padding:      '10px 12px',
                borderRadius: 8,
                fontFamily:   FONTS.body,
                fontSize:     '0.9rem',
                color:        t.textMuted,
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>{dark ? '☀️' : '🌙'}</span>
              {dark ? 'Switch to light mode' : 'Switch to dark mode'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}