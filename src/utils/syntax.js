/* ═══════════════════════════════════════════════════════════════════════════
   SYNTAX HIGHLIGHTING UTILITIES
   A lightweight regex-based tokeniser — no external libraries needed.
   Supports: bash, yaml, javascript/typescript, python, lua, sql, json.
══════════════════════════════════════════════════════════════════════════ */

/** Build the list of { pattern, type } rules for a given language tag */
export function getSyntaxRules(lang) {
  const l = (lang || '').toLowerCase()
  const sh = (pattern, type) => ({ pattern, type })

  /* Rules shared by most languages */
  const base = [
    sh(/\/\/[^\n]*/gm,                                'comment'),
    sh(/#[^\n]*/gm,                                   'comment'),
    sh(/"[^"\\]*(?:\\.[^"\\]*)*"/gm,                  'string'),
    sh(/'[^'\\]*(?:\\.[^'\\]*)*'/gm,                  'string'),
    sh(/`[^`]*`/gm,                                   'string'),
    sh(/\b\d+(\.\d+)?\b/gm,                           'number'),
  ]

  const jsKw   = sh(/\b(const|let|var|function|return|if|else|for|while|import|export|default|class|extends|new|this|typeof|async|await|try|catch|from|of|in|true|false|null|undefined)\b/gm, 'keyword')
  const pyKw   = sh(/\b(def|class|import|from|return|if|elif|else|for|while|with|as|in|not|and|or|True|False|None|pass|raise|try|except|finally|lambda|yield|global|nonlocal)\b/gm, 'keyword')
  const shKw   = sh(/\b(if|then|fi|else|elif|for|do|done|while|case|esac|in|echo|export|source|cd|ls|grep|awk|sed|curl|wget|sudo|apt|pip|docker|git|npm|yarn|mkdir|rm|cp|mv|cat|tail|head|find|chmod|chown|systemctl|service|pkill|kill|ps|du|df|sort|uniq|wc|ssh|scp|rsync|nmap|tcpdump)\b/gm, 'keyword')
  const luaKw  = sh(/\b(local|function|return|if|then|else|elseif|end|for|while|do|repeat|until|in|and|or|not|nil|true|false)\b/gm, 'keyword')
  const sqlKw  = sh(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|INSERT|UPDATE|DELETE|INTO|VALUES|SET|CREATE|TABLE|INDEX|DROP|ALTER|AS|DISTINCT|COUNT|SUM|AVG|MAX|MIN)\b/gi, 'keyword')

  if (['js','jsx','javascript','ts','typescript','tsx'].includes(l))
    return [...base, jsKw, sh(/\b([A-Z][a-zA-Z0-9]*)\b/gm, 'type'), sh(/\$\w+/gm, 'variable')]
  if (['py','python'].includes(l))
    return [...base, pyKw, sh(/\b([A-Z][a-zA-Z0-9]*)\b/gm, 'type')]
  if (['bash','sh','shell','zsh'].includes(l))
    return [...base, shKw, sh(/\$\{?[\w@#?!*]+\}?/gm, 'variable')]
  if (['yaml','yml'].includes(l))
    return [sh(/#[^\n]*/gm, 'comment'), sh(/"[^"]*"|'[^']*'/gm, 'string'), sh(/\b(true|false|null)\b/gm, 'keyword'), sh(/^[ \t]*\w[\w-]*(?=\s*:)/gm, 'attr'), sh(/\b\d+(\.\d+)?\b/gm, 'number')]
  if (l === 'json')
    return [sh(/"[^"\\]*(?:\\.[^"\\]*)*/gm, 'string'), sh(/\b(true|false|null)\b/gm, 'keyword'), sh(/\b\d+(\.\d+)?\b/gm, 'number')]
  if (l === 'lua')  return [...base, luaKw]
  if (l === 'sql')  return [...base, sqlKw]

  return base
}

/** Tokenise a source string into an array of { type, text } segments.
 *  Types: 'comment' | 'string' | 'keyword' | 'number' | 'variable' |
 *         'type' | 'operator' | 'attr' | 'tag' | 'plain' */
export function tokenizeSyntax(code, lang) {
  const rules = getSyntaxRules(lang)
  if (!rules.length) return [{ type: 'plain', text: code }]

  /* Collect all regex matches across all rules */
  const matches = []
  for (const { pattern, type } of rules) {
    const rx = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
    rx.lastIndex = 0
    let m
    while ((m = rx.exec(code)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, type, text: m[0] })
      if (m[0].length === 0) rx.lastIndex++
    }
  }

  /* Sort: earlier start wins; on tie, longer match wins */
  matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start))

  /* Build token stream, filling gaps between matches with plain text */
  const tokens = []
  let cursor = 0
  for (const match of matches) {
    if (match.start < cursor) continue                           // overlapping — skip
    if (match.start > cursor) tokens.push({ type: 'plain', text: code.slice(cursor, match.start) })
    tokens.push({ type: match.type, text: match.text })
    cursor = match.end
  }
  if (cursor < code.length) tokens.push({ type: 'plain', text: code.slice(cursor) })

  return tokens
}
