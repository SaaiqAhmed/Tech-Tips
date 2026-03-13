import { useMemo, useCallback } from 'react'
import { parseInlineMD } from '../utils/markdown.js'
import { FONTS } from '../theme.js'

/**
 * Renders inline markdown tokens (bold, italic, code, links, plain text)
 * as React elements.
 *
 * Link handling:
 *   - href starting with "#" → smooth-scroll to the element with that id
 *     (same behaviour as the Table of Contents). The id is derived from the
 *     href by stripping the leading "#".
 *   - all other hrefs → open in a new tab as before.
 */
export default function InlineContent({ text, t }) {
  const parts = useMemo(() => parseInlineMD(text), [text])

  /* Scroll to an in-page anchor without a full navigation */
  const handleAnchorClick = useCallback((e, href) => {
    e.preventDefault()
    const id = href.slice(1) // strip the leading "#"
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      {parts.map((p, i) => {
        switch (p.t) {
          case 'code':
            return (
              <code
                key={i}
                style={{
                  fontFamily:  FONTS.code,
                  fontSize:    '0.875em',
                  color:       t.inlineCode,
                  background:  t.inlineCodeBg,
                  padding:     '2px 6px',
                  borderRadius: 4,
                  whiteSpace:  'nowrap',
                }}
              >
                {p.s}
              </code>
            )

          case 'link': {
            const isAnchor = p.href.startsWith('#')
            return isAnchor ? (
              /* In-page anchor — intercept click and smooth-scroll */
              <a
                key={i}
                href={p.href}
                onClick={(e) => handleAnchorClick(e, p.href)}
                style={{
                  color:              t.accent,
                  textDecoration:     'underline',
                  textDecorationColor: t.accent + '88',
                  cursor:             'pointer',
                }}
              >
                {p.s}
              </a>
            ) : (
              /* External link — open in new tab */
              <a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color:              t.accent,
                  textDecoration:     'underline',
                  textDecorationColor: t.accent + '88',
                }}
              >
                {p.s}
              </a>
            )
          }

          case 'bold':
            return <strong key={i} style={{ fontWeight: 600, color: t.text }}>{p.s}</strong>

          case 'boldEm':
            return <strong key={i} style={{ fontWeight: 600, fontStyle: 'italic', color: t.text }}>{p.s}</strong>

          case 'em':
            return <em key={i}>{p.s}</em>

          default:
            return <span key={i}>{p.s}</span>
        }
      })}
    </>
  )
}