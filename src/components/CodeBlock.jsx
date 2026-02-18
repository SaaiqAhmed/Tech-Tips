import { useMemo } from 'react'
import { tokenizeSyntax } from '../utils/syntax.js'
import { FONTS, SYN } from '../theme.js'

/**
 * Renders a fenced code block with:
 *  - a language label bar at the top
 *  - per-token colour highlighting via the tokenizeSyntax utility
 *  - horizontal scroll for long lines
 */
export default function CodeBlock({ code, lang, t, dark }) {
  const syn = dark ? SYN.dark : SYN.light

  /* Tokenise once per (code, lang) combination */
  const tokens = useMemo(() => tokenizeSyntax(code, lang), [code, lang])

  /* Map token type → colour */
  const colourOf = (type) =>
    ({
      comment:  syn.comment,
      string:   syn.string,
      keyword:  syn.keyword,
      number:   syn.number,
      variable: syn.variable,
      type:     syn.type,
      operator: syn.operator,
      attr:     syn.attr,
      tag:      syn.tag,
      plain:    syn.plain,
    })[type] ?? syn.plain

  return (
    <div
      style={{
        margin: '1.25rem 0',
        borderRadius: 10,
        overflow: 'hidden',
        border: `1px solid ${t.codeBorder}`,
        boxShadow: t.shadow,
      }}
    >
      {/* ── Language label bar ── */}
      <div
        style={{
          background: t.bgTertiary,
          borderBottom: `1px solid ${t.codeBorder}`,
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.code,
            fontSize: 11,
            color: t.textMuted,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {lang || 'code'}
        </span>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.accent, opacity: 0.7 }} />
      </div>

      {/* ── Highlighted code ── */}
      <pre
        style={{
          margin: 0,
          padding: '1rem 1.25rem',
          background: t.codeBg,
          overflowX: 'auto',
          lineHeight: 1.65,
        }}
      >
        <code style={{ fontFamily: FONTS.code, fontSize: '0.85rem' }}>
          {tokens.map((tok, i) => (
            <span key={i} style={{ color: colourOf(tok.type) }}>
              {tok.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
