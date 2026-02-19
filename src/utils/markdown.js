/* ═══════════════════════════════════════════════════════════════════════════
   MARKDOWN UTILITIES
   Pure functions for parsing markdown into block/inline tokens.
   No dependencies — just strings in, arrays of tokens out.
══════════════════════════════════════════════════════════════════════════ */

/** Convert a heading string to a URL-safe anchor id */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Extract all H1/H2/H3 headings from a markdown string.
 * Lines inside fenced code blocks are ignored so that comment characters
 * like `# this is a comment` inside code samples are never mistaken for
 * real headings.
 */
export function parseHeadings(md) {
  const headings = []
  let inCode = false

  for (const line of md.split('\n')) {
    if (line.match(/^```/)) { inCode = !inCode; continue }
    if (inCode) continue
    const m = line.match(/^(#{1,3})\s+(.+)/)
    if (m) headings.push({ level: m[1].length, text: m[2].trim(), id: slugify(m[2].trim()) })
  }

  return headings
}

/* ─── Inline token types ───────────────────────────────────────────────────
   Each token: { t: 'text'|'code'|'link'|'bold'|'boldEm'|'em', s, href? }
──────────────────────────────────────────────────────────────────────── */
export function parseInlineMD(text) {
  const parts = []
  let rem = text
  while (rem.length > 0) {
    let m
    if ((m = rem.match(/^`([^`]+)`/)))               { parts.push({ t: 'code',   s: m[1] });             rem = rem.slice(m[0].length); continue }
    if ((m = rem.match(/^\[([^\]]+)\]\(([^)]+)\)/))) { parts.push({ t: 'link',   s: m[1], href: m[2] }); rem = rem.slice(m[0].length); continue }
    if ((m = rem.match(/^\*\*\*([^*]+)\*\*\*/)))     { parts.push({ t: 'boldEm', s: m[1] });             rem = rem.slice(m[0].length); continue }
    if ((m = rem.match(/^\*\*([^*]+)\*\*/)))         { parts.push({ t: 'bold',   s: m[1] });             rem = rem.slice(m[0].length); continue }
    if ((m = rem.match(/^\*([^*]+)\*/)))             { parts.push({ t: 'em',     s: m[1] });             rem = rem.slice(m[0].length); continue }
    if ((m = rem.match(/^[^`\[*]+/)))               { parts.push({ t: 'text',   s: m[0] });             rem = rem.slice(m[0].length); continue }
    parts.push({ t: 'text', s: rem[0] }); rem = rem.slice(1)
  }
  return parts
}

/* ─── Nested list helpers ──────────────────────────────────────────────────
   buildListTree converts a flat array of raw list lines into a nested tree.
   Each node: { text: string, isOl: boolean, children: node[] }
──────────────────────────────────────────────────────────────────────── */
function buildListTree(lines) {
  const entries = []
  for (const line of lines) {
    const ulM = line.match(/^(\s*)([-*])\s+(.+)/)
    const olM = line.match(/^(\s*)(\d+)\.\s+(.+)/)
    if (ulM) entries.push({ indent: ulM[1].length, isOl: false, text: ulM[3] })
    else if (olM) entries.push({ indent: olM[1].length, isOl: true,  text: olM[3] })
  }

  if (!entries.length) return []

  const root  = { children: [] }
  const stack = [{ node: root, indent: -1 }]

  for (const entry of entries) {
    while (stack.length > 1 && stack[stack.length - 1].indent >= entry.indent) {
      stack.pop()
    }
    const item = { text: entry.text, isOl: entry.isOl, children: [] }
    stack[stack.length - 1].node.children.push(item)
    stack.push({ node: item, indent: entry.indent })
  }

  return root.children
}

/* ─── Block token types ────────────────────────────────────────────────────
   Possible types: h1, h2, h3, p, blockquote, list, code, image, table

   'list' blocks carry:
     items  — nested tree from buildListTree
     start  — the number the first item was written with in the source.
              For bullet lists this is always 1 (unused).
              For ordered lists interrupted by images/blockquotes/etc. this
              lets the renderer continue from the right number rather than
              always resetting to 1.

   Continuation detection:
     After emitting a non-list block we remember the last ordered-list block
     we saw.  If the very next list block is ordered AND its first item's
     number is greater than 1 (i.e. the author wrote "3." not "1."), we treat
     it as a continuation — its CSS counter starts at that number so the
     rendered sequence stays unbroken.
──────────────────────────────────────────────────────────────────────── */
export function parseBlocksMD(md) {
  const lines  = md.split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    /* Fenced code block -------------------------------------------------- */
    if (line.match(/^```/)) {
      const lang = line.slice(3).trim()
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].match(/^```/)) { codeLines.push(lines[i]); i++ }
      blocks.push({ type: 'code', lang, content: codeLines.join('\n') })
      i++; continue
    }

    /* ATX headings ------------------------------------------------------- */
    const hm = line.match(/^(#{1,3})\s+(.+)/)
    if (hm) { blocks.push({ type: `h${hm[1].length}`, content: hm[2].trim() }); i++; continue }

    /* Blockquote --------------------------------------------------------- */
    if (line.startsWith('> ')) {
      const bq = []
      while (i < lines.length && lines[i].startsWith('> ')) { bq.push(lines[i].slice(2)); i++ }
      blocks.push({ type: 'blockquote', content: bq.join(' ') }); continue
    }

    /* Table -------------------------------------------------------------- */
    if (line.startsWith('|') && i + 1 < lines.length && lines[i + 1].match(/^\|[\s\-:|]+\|/)) {
      const rows = []
      rows.push({ header: true, cells: line.split('|').slice(1, -1).map(c => c.trim()) })
      i += 2
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push({ header: false, cells: lines[i].split('|').slice(1, -1).map(c => c.trim()) })
        i++
      }
      blocks.push({ type: 'table', rows }); continue
    }

    /* Standalone image --------------------------------------------------- */
    const imgm = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
    if (imgm) { blocks.push({ type: 'image', alt: imgm[1], src: imgm[2] }); i++; continue }

    /* List (bullet or numbered, any nesting) ----------------------------- */
    if (line.match(/^\s*([-*]|\d+\.)\s/)) {
      /* Read the number the author wrote on this first item */
      const firstNumM = line.match(/^\s*(\d+)\./)
      const start     = firstNumM ? parseInt(firstNumM[1], 10) : 1

      const listLines = []
      while (
        i < lines.length &&
        lines[i].trim() !== '' &&
        lines[i].match(/^\s*([-*]|\d+\.)\s/)
      ) {
        listLines.push(lines[i])
        i++
      }
      blocks.push({ type: 'list', start, items: buildListTree(listLines) })
      continue
    }

    /* Blank line --------------------------------------------------------- */
    if (line.trim() === '') { i++; continue }

    /* Paragraph ---------------------------------------------------------- */
    const paraLines = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].match(/^#{1,3}\s/) &&
      !lines[i].match(/^```/) &&
      !lines[i].startsWith('> ') &&
      !lines[i].match(/^\s*([-*]|\d+\.)\s/) &&
      !lines[i].startsWith('|') &&
      !lines[i].match(/^!/)
    ) { paraLines.push(lines[i]); i++ }
    if (paraLines.length) blocks.push({ type: 'p', content: paraLines.join(' ') })
  }

  return blocks
}