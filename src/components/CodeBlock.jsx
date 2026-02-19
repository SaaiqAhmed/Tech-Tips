import { useMemo, useState, useCallback } from 'react'
import { tokenizeSyntax } from '../utils/syntax.js'
import { FONTS, SYN } from '../theme.js'

/**
 * Renders a fenced code block with:
 *  - a language label in the top-left of the header bar
 *  - a copy-to-clipboard button in the top-right that shows a tick
 *    for 2 seconds after a successful copy, then resets to the icon
 *  - per-token colour highlighting via the tokenizeSyntax utility
 *  - horizontal scroll for long lines
 */
export default function CodeBlock({ code, lang, t, dark }) {
  const syn = dark ? SYN.dark : SYN.light

  /* 'idle' | 'copied' | 'error' */
  const [copyState, setCopyState] = useState('idle')

  const tokens = useMemo(() => tokenizeSyntax(code, lang), [code, lang])

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

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopyState('copied')
    } catch {
      /* Fallback for browsers/contexts where clipboard API is unavailable */
      try {
        const ta = document.createElement('textarea')
        ta.value = code
        ta.style.position = 'fixed'
        ta.style.opacity  = '0'
        document.body.appendChild(ta)
        ta.focus()
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        setCopyState('copied')
      } catch {
        setCopyState('error')
      }
    }
    setTimeout(() => setCopyState('idle'), 2000)
  }, [code])

  /* Icon SVGs — kept inline so there's no extra import */
  const CopyIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )

  const TickIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )

  const ErrorIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )

  const copyColour = copyState === 'copied' ? '#4ade80'
                   : copyState === 'error'  ? '#f87171'
                   : t.textMuted

  const copyLabel  = copyState === 'copied' ? 'Copied!'
                   : copyState === 'error'  ? 'Failed'
                   : 'Copy'

  return (
    <div
      style={{
        margin:       '1.25rem 0',
        borderRadius: 10,
        overflow:     'hidden',
        border:       `1px solid ${t.codeBorder}`,
        boxShadow:    t.shadow,
      }}
    >
      {/* ── Header bar: language label + copy button ── */}
      <div
        style={{
          background:     t.bgTertiary,
          borderBottom:   `1px solid ${t.codeBorder}`,
          padding:        '5px 8px 5px 16px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            8,
        }}
      >
        {/* Language label */}
        <span
          style={{
            fontFamily:    FONTS.code,
            fontSize:      11,
            color:         t.textMuted,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {lang || 'code'}
        </span>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          title={copyLabel}
          style={{
            display:        'flex',
            alignItems:     'center',
            gap:            5,
            background:     'transparent',
            border:         `1px solid ${copyState === 'idle' ? t.border : copyColour}`,
            borderRadius:   6,
            padding:        '3px 9px',
            cursor:         copyState === 'idle' ? 'pointer' : 'default',
            color:          copyColour,
            fontSize:       11,
            fontFamily:     FONTS.body,
            fontWeight:     500,
            lineHeight:     1,
            transition:     'color 0.2s, border-color 0.2s, background 0.2s',
            whiteSpace:     'nowrap',
          }}
          onMouseEnter={e => {
            if (copyState === 'idle') e.currentTarget.style.background = t.accentDim
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          {copyState === 'copied' ? <TickIcon  /> :
           copyState === 'error'  ? <ErrorIcon /> :
                                    <CopyIcon  />}
          {copyLabel}
        </button>
      </div>

      {/* ── Highlighted code ── */}
      <pre
        style={{
          margin:     0,
          padding:    '1rem 1.25rem',
          background: t.codeBg,
          overflowX:  'auto',
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