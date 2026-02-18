import { useState, useCallback } from 'react'
import { FONTS } from '../theme.js'

/**
 * Table of Contents — two rendering modes controlled by the `inline` prop:
 *
 * inline={true}  — wide viewport
 *   Renders as a sticky left column beside the article. Always visible,
 *   no toggle or hover logic needed.
 *
 * inline={false} — narrow viewport
 *   Renders as a fixed overlay anchored to the left edge. Hidden by default;
 *   expands on hover of the entire sidebar area or on click of the handle tab
 *   to pin it open. Collapses when the mouse leaves.
 */
export default function TableOfContents({ headings, t, inline }) {
  /* Overlay-mode state — unused in inline mode */
  const [pinned,   setPinned]   = useState(false)
  const [hovering, setHovering] = useState(false)

  const overlayVisible = pinned || hovering

  /** Smooth-scroll to a heading anchor */
  const handleClick = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (!inline) setPinned(false)
  }, [inline])

  /** Style rules per heading level (shared between both modes) */
  const levelStyles = {
    1: { paddingLeft: 16, fontSize: '0.85rem', fontWeight: 600, color: t.accent },
    2: { paddingLeft: 28, fontSize: '0.8rem',  fontWeight: 400, color: t.textMuted },
    3: { paddingLeft: 40, fontSize: '0.75rem', fontWeight: 400, color: t.textFaint },
  }

  /* ── Heading link list (shared JSX) ──────────────────────────────────── */
  const headingLinks = (
    <nav style={{ overflowY: 'auto', padding: '8px 0' }}>
      {headings.map((h, i) => (
        <button
          key={i}
          onClick={() => handleClick(h.id)}
          className="toc-link"
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: `6px 12px 6px ${levelStyles[h.level].paddingLeft}px`,
            fontSize: levelStyles[h.level].fontSize,
            fontWeight: levelStyles[h.level].fontWeight,
            color: levelStyles[h.level].color,
            fontFamily: FONTS.body,
            lineHeight: 1.5,
          }}
        >
          {h.text}
        </button>
      ))}
    </nav>
  )

  /* ════════════════════════════════════════════════════════════════════════
     INLINE MODE — sticky column in the normal document flow
  ═══════════════════════════════════════════════════════════════════════ */
  if (inline) {
    return (
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          position: 'sticky',
          top: 78, // clears the 58px header + a little breathing room
          alignSelf: 'flex-start',
          maxHeight: 'calc(100vh - 100px)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '2rem',
          paddingLeft: '1rem',
        }}
      >
        {/* Section label */}
        <div
          style={{
            padding: '0 16px 10px',
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: t.textMuted,
            borderBottom: `1px solid ${t.border}`,
            marginBottom: 4,
          }}
        >
          Contents
        </div>

        {headingLinks}
      </aside>
    )
  }

  /* ════════════════════════════════════════════════════════════════════════
     OVERLAY MODE — fixed handle + slide-out panel
  ═══════════════════════════════════════════════════════════════════════ */
  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Sliding panel */}
      <div
        style={{
          width: overlayVisible ? 240 : 0,
          opacity: overlayVisible ? 1 : 0,
          overflow: 'hidden',
          transition: 'width 0.3s cubic-bezier(.4,0,.2,1), opacity 0.28s ease',
          background: t.sidebarBg,
          border: overlayVisible ? `1px solid ${t.border}` : 'none',
          borderRight: 'none',
          borderRadius: '0 10px 10px 0',
          boxShadow: overlayVisible ? t.shadow : 'none',
          maxHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '14px 16px',
            borderBottom: `1px solid ${t.border}`,
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: t.textMuted,
            flexShrink: 0,
          }}
        >
          Contents
        </div>

        {headingLinks}
      </div>

      {/* Edge handle tab — click to pin/unpin */}
      <div
        onClick={() => setPinned(p => !p)}
        style={{
          width: 22,
          minHeight: 64,
          background: t.bgSecondary,
          border: `1px solid ${t.border}`,
          borderLeft: 'none',
          borderRadius: '0 8px 8px 0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: t.accent,
          fontSize: 14,
          userSelect: 'none',
          transition: 'background 0.2s',
        }}
        title={pinned ? 'Unpin sidebar' : 'Pin sidebar open'}
      >
        {overlayVisible ? '‹' : '›'}
      </div>
    </div>
  )
}