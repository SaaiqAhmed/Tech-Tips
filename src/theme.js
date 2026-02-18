/* ═══════════════════════════════════════════════════════════════════════════
   THEME — all colour / style tokens in a single object.
   Import `THEME` and index with `dark ? THEME.dark : THEME.light`.
══════════════════════════════════════════════════════════════════════════ */

export const THEME = {
  dark: {
    bg:               '#0d1117',
    bgSecondary:      '#161b22',
    bgTertiary:       '#21262d',
    bgCard:           '#1c2128',
    text:             '#e6edf3',
    textMuted:        '#8b949e',
    textFaint:        '#484f58',
    border:           '#30363d',
    accent:           '#00d4aa',
    accentDim:        'rgba(0,212,170,0.12)',
    accentAlt:        '#f0883e',
    headerBg:         'rgba(13,17,23,0.9)',
    codeBg:           '#161b22',
    codeBorder:       '#30363d',
    blockquoteBg:     'rgba(0,212,170,0.06)',
    blockquoteBorder: '#00d4aa',
    tableAlt:         'rgba(255,255,255,0.025)',
    tableHeader:      '#21262d',
    inlineCode:       '#f0883e',
    inlineCodeBg:     'rgba(240,136,62,0.12)',
    skeleton:         'linear-gradient(90deg,#21262d 25%,#2d333b 50%,#21262d 75%)',
    skeletonBg:       '#21262d',
    shadow:           '0 8px 32px rgba(0,0,0,0.5)',
    sidebarBg:        '#0d1117',
  },
  light: {
    bg:               '#fafaf7',
    bgSecondary:      '#f0ece3',
    bgTertiary:       '#e8e2d9',
    bgCard:           '#ffffff',
    text:             '#1a1814',
    textMuted:        '#6b6560',
    textFaint:        '#a09890',
    border:           '#d4cfc7',
    accent:           '#007acc',
    accentDim:        'rgba(0,122,204,0.1)',
    accentAlt:        '#c05000',
    headerBg:         'rgba(250,250,247,0.9)',
    codeBg:           '#f0ece3',
    codeBorder:       '#d4cfc7',
    blockquoteBg:     'rgba(0,122,204,0.05)',
    blockquoteBorder: '#007acc',
    tableAlt:         'rgba(0,0,0,0.025)',
    tableHeader:      '#e8e2d9',
    inlineCode:       '#c05000',
    inlineCodeBg:     'rgba(192,80,0,0.08)',
    skeleton:         'linear-gradient(90deg,#e8e2d9 25%,#f0ece3 50%,#e8e2d9 75%)',
    skeletonBg:       '#e8e2d9',
    shadow:           '0 8px 32px rgba(0,0,0,0.1)',
    sidebarBg:        '#fafaf7',
  },
}

/* Per-theme syntax highlight colours for the code tokeniser */
export const SYN = {
  dark: {
    comment:  '#6a9955',
    string:   '#ce9178',
    keyword:  '#569cd6',
    number:   '#b5cea8',
    variable: '#9cdcfe',
    type:     '#4ec9b0',
    operator: '#d4d4d4',
    plain:    '#d4d4d4',
    tag:      '#4ec9b0',
    attr:     '#9cdcfe',
  },
  light: {
    comment:  '#008000',
    string:   '#a31515',
    keyword:  '#0000ff',
    number:   '#098658',
    variable: '#001080',
    type:     '#267f99',
    operator: '#383838',
    plain:    '#383838',
    tag:      '#800000',
    attr:     '#ff0000',
  },
}

/* Font families used throughout the app */
export const FONTS = {
  heading: "'Bricolage Grotesque', sans-serif",
  body:    "'IBM Plex Sans', sans-serif",
  code:    "'Fira Code', monospace",
}
