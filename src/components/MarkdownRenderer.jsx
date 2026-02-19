import { useMemo } from 'react'
import { parseBlocksMD, slugify } from '../utils/markdown.js'
import { FONTS } from '../theme.js'
import InlineContent from './InlineContent.jsx'
import CodeBlock from './CodeBlock.jsx'

/* ─── CSS counter styles for nested ordered lists ──────────────────────────
   counters() with a "." separator produces "1.", "1.1.", "1.1.1." etc.
   counter-reset is set via a CSS custom property (--md-start) so the React
   component can pass through the start number without needing ::before access.
──────────────────────────────────────────────────────────────────────── */
const _counterStyle = document.createElement('style')
_counterStyle.textContent = `
  ol.md-ol {
    list-style: none;
    counter-reset: md-item var(--md-start, 0);
  }
  ol.md-ol > li {
    counter-increment: md-item;
    display: flex;
    align-items: baseline;
  }
  ol.md-ol > li::before {
    content: counters(md-item, ".") ". ";
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    margin-right: 0.35em;
    flex-shrink: 0;
  }
  ol.md-ol > li > .md-li-body {
    flex: 1;
    min-width: 0;
  }
`
document.head.appendChild(_counterStyle)

/* ─── Recursive list renderer ──────────────────────────────────────────────
   `start` is forwarded to the CSS custom property --md-start as (start - 1)
   because counter-reset initialises to the value *before* the first increment.
   So for a list starting at 3, we set --md-start to 2.
──────────────────────────────────────────────────────────────────────── */
function NestedList({ items, t, depth = 0, start = 1 }) {
  if (!items || items.length === 0) return null

  const isOl = items[0].isOl

  if (isOl) {
    return (
      <ol
        className="md-ol"
        style={{
          margin:       depth === 0 ? '0.75rem 0' : '0.3rem 0 0.1rem',
          paddingLeft:  depth === 0 ? '0.25rem'   : '1rem',
          lineHeight:   1.8,
          color:        t.text,
          /* Pass start - 1 so the first counter-increment lands on `start` */
          '--md-start': depth === 0 ? start - 1 : 0,
        }}
      >
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: item.children.length ? '0.2rem' : '0.15rem', color: t.text }}>
            <span className="md-li-body">
              <InlineContent text={item.text} t={t} />
              {item.children.length > 0 && (
                <NestedList items={item.children} t={t} depth={depth + 1} />
              )}
            </span>
          </li>
        ))}
      </ol>
    )
  }

  /* Unordered list */
  const bulletStyle = depth === 0 ? 'disc' : depth === 1 ? 'circle' : 'square'
  return (
    <ul
      style={{
        margin:        depth === 0 ? '0.75rem 0' : '0.3rem 0 0.1rem',
        paddingLeft:   depth === 0 ? '1.5rem'    : '1.25rem',
        lineHeight:    1.8,
        color:         t.text,
        listStyleType: bulletStyle,
      }}
    >
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: item.children.length ? '0.2rem' : '0.15rem' }}>
          <InlineContent text={item.text} t={t} />
          {item.children.length > 0 && (
            <NestedList items={item.children} t={t} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  )
}

/**
 * Converts a raw markdown string into themed React elements.
 */
export default function MarkdownRenderer({ content, t, dark }) {
  const blocks = useMemo(() => parseBlocksMD(content), [content])

  const renderBlock = (block, idx) => {
    switch (block.type) {

      case 'h1':
        return (
          <h1
            key={idx}
            id={slugify(block.content)}
            style={{
              fontFamily:      FONTS.heading,
              fontSize:        'clamp(1.7rem, 4vw, 2.3rem)',
              fontWeight:      800,
              color:           t.text,
              margin:          '2rem 0 0.75rem',
              lineHeight:      1.15,
              letterSpacing:   '-0.01em',
              scrollMarginTop: 80,
            }}
          >
            <InlineContent text={block.content} t={t} />
          </h1>
        )

      case 'h2':
        return (
          <h2
            key={idx}
            id={slugify(block.content)}
            style={{
              fontFamily:      FONTS.heading,
              fontSize:        'clamp(1.25rem, 3vw, 1.65rem)',
              fontWeight:      700,
              color:           t.text,
              margin:          '1.75rem 0 0.6rem',
              borderBottom:    `1px solid ${t.border}`,
              paddingBottom:   '0.4rem',
              letterSpacing:   '-0.005em',
              scrollMarginTop: 80,
            }}
          >
            <InlineContent text={block.content} t={t} />
          </h2>
        )

      case 'h3':
        return (
          <h3
            key={idx}
            id={slugify(block.content)}
            style={{
              fontFamily:      FONTS.heading,
              fontSize:        'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight:      700,
              color:           t.textMuted,
              margin:          '1.5rem 0 0.5rem',
              scrollMarginTop: 80,
            }}
          >
            <InlineContent text={block.content} t={t} />
          </h3>
        )

      case 'h4':
        return (
          <h4
            key={idx}
            id={slugify(block.content)}
            style={{
              fontFamily:      FONTS.heading,
              fontSize:        'clamp(0.75rem, 2vw, 1.25rem)',
              fontWeight:      500,
              color:           t.textMuted,
              margin:          '1.25rem 0 0.4rem',
              scrollMarginTop: 80,
            }}
          >
            <InlineContent text={block.content} t={t} />
          </h4>
        )

      case 'p':
        return (
          <p
            key={idx}
            style={{
              margin:       '0.75rem 0',
              lineHeight:   1.8,
              color:        t.text,
              textAlign:    'justify',
              textJustify:  'inter-word',
              hyphens:      'auto',
              overflowWrap: 'break-word',
            }}
          >
            <InlineContent text={block.content} t={t} />
          </p>
        )

      case 'blockquote':
        return (
          <blockquote
            key={idx}
            style={{
              margin:       '1.25rem 0',
              padding:      '0.75rem 1.25rem',
              borderLeft:   `3px solid ${t.blockquoteBorder}`,
              background:   t.blockquoteBg,
              borderRadius: '0 8px 8px 0',
              fontStyle:    'italic',
              color:        t.textMuted,
            }}
          >
            <InlineContent text={block.content} t={t} />
          </blockquote>
        )

      /* Pass the parsed `start` number through to NestedList */
      case 'list':
        return <NestedList key={idx} items={block.items} t={t} depth={0} start={block.start} />

      case 'code':
        return <CodeBlock key={idx} code={block.content} lang={block.lang} t={t} dark={dark} />

      case 'image':
        return (
          <div key={idx} style={{ margin: '1.5rem 0', textAlign: 'center' }}>
            <img
              src={block.src}
              alt={block.alt}
              style={{ maxWidth: '100%', borderRadius: 12, boxShadow: t.shadow }}
            />
            {block.alt && (
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.8rem', color: t.textMuted, fontStyle: 'italic', textAlign: 'center' }}>
                {block.alt}
              </p>
            )}
          </div>
        )

      case 'table':
        return (
          <div
            key={idx}
            style={{
              margin:       '1.25rem 0',
              overflowX:    'auto',
              borderRadius: 10,
              border:       `1px solid ${t.border}`,
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                {block.rows.filter(r => r.header).map((row, ri) => (
                  <tr key={ri} style={{ background: t.tableHeader }}>
                    {row.cells.map((cell, ci) => (
                      <th
                        key={ci}
                        style={{
                          padding:      '10px 16px',
                          textAlign:    'left',
                          borderBottom: `1px solid ${t.border}`,
                          color:        t.text,
                          fontWeight:   600,
                          fontFamily:   FONTS.body,
                          whiteSpace:   'nowrap',
                        }}
                      >
                        <InlineContent text={cell} t={t} />
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {block.rows.filter(r => !r.header).map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 1 ? t.tableAlt : 'transparent' }}>
                    {row.cells.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding:      '9px 16px',
                          borderBottom: `1px solid ${t.border}`,
                          color:        t.textMuted,
                        }}
                      >
                        <InlineContent text={cell} t={t} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      default:
        return null
    }
  }

  return <div>{blocks.map(renderBlock)}</div>
}