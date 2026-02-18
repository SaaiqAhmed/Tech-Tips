import { useState, useEffect, useMemo } from 'react'
import { parseHeadings } from '../utils/markdown.js'
import MarkdownRenderer from './MarkdownRenderer.jsx'
import TableOfContents from './TableOfContents.jsx'
import SkeletonLoader from './SkeletonLoader.jsx'

/** Minimum viewport width (px) at which the ToC is shown inline */
const INLINE_BREAKPOINT = 1200

/**
 * Renders a single wiki article.
 *
 * Layout (wide viewport >= 1200px):
 *   A centred max-width wrapper holds both the ToC column and the article
 *   side-by-side. The group is centred as a unit, so the article stays
 *   visually centred on the page with the ToC sitting naturally to its left.
 *
 *   max-width = 240 (ToC) + 32 (gap) + 840 (article) = 1112px
 *
 * Layout (narrow viewport < 1200px):
 *   The article is centred on its own (max-width 840px) and the ToC
 *   falls back to the fixed overlay/handle mode on the left edge.
 */
export default function WikiPage({ content, t, dark }) {
  const [loading, setLoading] = useState(true)
  const [width,   setWidth]   = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const headings   = useMemo(() => parseHeadings(content), [content])
  const inlineMode = width >= INLINE_BREAKPOINT

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 380)
    return () => clearTimeout(timer)
  }, [content])

  return (
    <div style={{ minHeight: 'calc(100vh - 58px)' }}>

      {/*
        Centred wrapper — its max-width expands to include the ToC column
        when in inline mode, keeping the article visually centred on the page.
      */}
      <div
        style={{
          maxWidth:      inlineMode ? 1112 : 840,
          margin:        '0 auto',
          padding:       '0 1.5rem',
          display:       'flex',
          flexDirection: 'row',
          alignItems:    'flex-start',
          gap:           inlineMode ? 32 : 0,
        }}
      >
        {/* Inline ToC column — only rendered in the flow when wide enough */}
        {inlineMode && <TableOfContents headings={headings} t={t} inline={true} />}

        {/* Article — fills the remaining space, max ~840px */}
        <main style={{ flex: 1, minWidth: 0, paddingBottom: '4rem' }}>
          {loading ? (
            <SkeletonLoader t={t} />
          ) : (
            <div className="page-enter" style={{ paddingTop: '2rem' }}>
              <MarkdownRenderer content={content} t={t} dark={dark} />
            </div>
          )}
        </main>
      </div>

      {/* Overlay ToC — fixed to left edge, only present on narrow viewports */}
      {!inlineMode && <TableOfContents headings={headings} t={t} inline={false} />}
    </div>
  )
}