import { useMemo } from 'react'
import { parseInlineMD } from '../utils/markdown.js'
import { FONTS } from '../theme.js'

/**
 * Renders inline markdown tokens (bold, italic, code, links, plain text)
 * as React elements.  Accepts the raw inline text string and the current
 * theme token object `t`.
 */
export default function InlineContent({ text, t }) {
  const parts = useMemo(() => parseInlineMD(text), [text])

  return (
    <>
      {parts.map((p, i) => {
        switch (p.t) {
          case 'code':
            return (
              <code
                key={i}
                style={{
                  fontFamily: FONTS.code,
                  fontSize: '0.875em',
                  color: t.inlineCode,
                  background: t.inlineCodeBg,
                  padding: '2px 6px',
                  borderRadius: 4,
                  whiteSpace: 'nowrap',
                }}
              >
                {p.s}
              </code>
            )

          case 'link':
            return (
              <a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: t.accent, textDecoration: 'underline', textDecorationColor: t.accent + '88' }}
              >
                {p.s}
              </a>
            )

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
