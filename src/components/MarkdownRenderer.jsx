import { useMemo } from 'react'
import { parseBlocksMD, slugify } from '../utils/markdown.js'
import { FONTS } from '../theme.js'
import InlineContent from './InlineContent.jsx'
import CodeBlock from './CodeBlock.jsx'

/* ─── Recursive list renderer ──────────────────────────────────────────────
   Renders a nested list tree produced by buildListTree in markdown.js.

   Each node: { text, isOl, children[] }

   The wrapper element (<ul> or <ol>) is chosen from the `isOl` flag of the
   first item in the current group — all siblings at the same level should be
   the same type, matching standard markdown behaviour.
──────────────────────────────────────────────────────────────────────── */
function NestedList({ items, t, depth = 0 }) {
  if (!items || items.length === 0) return null

  const isOl  = items[0].isOl
  const Tag   = isOl ? 'ol' : 'ul'

  return (
    <Tag
      style={{
        margin:     depth === 0 ? '0.75rem 0' : '0.3rem 0 0.1rem',
        paddingLeft: depth === 0 ? '1.5rem' : '1.25rem',
        lineHeight: 1.8,
        color:      t.text,
        listStyleType: isOl
          ? (depth === 0 ? 'decimal' : depth === 1 ? 'lower-alpha' : 'lower-roman')
          : (depth === 0 ? 'disc'    : depth === 1 ? 'circle'      : 'square'),
      }}
    >
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: item.children.length ? '0.2rem' : '0.15rem' }}>
          <InlineContent text={item.text} t={t} />
          {/* Recurse for any nested children */}
          {item.children.length > 0 && (
            <NestedList items={item.children} t={t} depth={depth + 1} />
          )}
        </li>
      ))}
    </Tag>
  )
}

/**
 * Converts a raw markdown string into themed React elements.
 * Handles: H1–H3, paragraphs, blockquotes, nested bullet & ordered lists,
 *          fenced code blocks, responsive tables, and images.
 */
export default function MarkdownRenderer({ content, t, dark }) {
  const blocks = useMemo(() => parseBlocksMD(content), [content])

  const renderBlock = (block, idx) => {
    switch (block.type) {

      /* ── Headings ──────────────────────────────────────────────────────── */
      case 'h1':
        return (
          <h1
            key={idx}
            id={slugify(block.content)}
            style={{
              fontFamily:    FONTS.heading,
              fontSize:      'clamp(1.7rem, 4vw, 2.3rem)',
              fontWeight:    800,
              color:         t.text,
              margin:        '2rem 0 0.75rem',
              lineHeight:    1.15,
              letterSpacing: '-0.01em',
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
              fontFamily:    FONTS.heading,
              fontSize:      'clamp(1.25rem, 3vw, 1.65rem)',
              fontWeight:    700,
              color:         t.text,
              margin:        '1.75rem 0 0.6rem',
              borderBottom:  `1px solid ${t.border}`,
              paddingBottom: '0.4rem',
              letterSpacing: '-0.005em',
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
              fontFamily:    FONTS.heading,
              fontSize:      'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight:    700,
              color:         t.textMuted,
              margin:        '1.5rem 0 0.5rem',
              scrollMarginTop: 80,
            }}
          >
            <InlineContent text={block.content} t={t} />
          </h3>
        )

      /* ── Paragraph ─────────────────────────────────────────────────────── */
      case 'p':
        return (
          <p key={idx} style={{ margin: '0.75rem 0', lineHeight: 1.8, color: t.text }}>
            <InlineContent text={block.content} t={t} />
          </p>
        )

      /* ── Blockquote ────────────────────────────────────────────────────── */
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

      /* ── Nested list (bullet or numbered, any depth) ───────────────────── */
      case 'list':
        return <NestedList key={idx} items={block.items} t={t} depth={0} />

      /* ── Fenced code block ─────────────────────────────────────────────── */
      case 'code':
        return <CodeBlock key={idx} code={block.content} lang={block.lang} t={t} dark={dark} />

      /* ── Image ─────────────────────────────────────────────────────────── */
      case 'image':
        return (
          <div key={idx} style={{ margin: '1.5rem 0', textAlign: 'center' }}>
            <img
              src={block.src}
              alt={block.alt}
              style={{ maxWidth: '100%', borderRadius: 12, boxShadow: t.shadow }}
            />
            {block.alt && (
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.8rem', color: t.textMuted, fontStyle: 'italic' }}>
                {block.alt}
              </p>
            )}
          </div>
        )

      /* ── Table ─────────────────────────────────────────────────────────── */
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
                          padding:       '10px 16px',
                          textAlign:     'left',
                          borderBottom:  `1px solid ${t.border}`,
                          color:         t.text,
                          fontWeight:    600,
                          fontFamily:    FONTS.body,
                          whiteSpace:    'nowrap',
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