import { FONTS } from '../theme.js'

/** Simple themed footer shown on every page */
export default function Footer({ t }) {
  return (
    <footer
      style={{
        borderTop: `1px solid ${t.border}`,
        padding: '1.25rem 2rem',
        textAlign: 'center',
        color: t.textMuted,
        fontSize: '0.8rem',
        fontFamily: FONTS.body,
        background: t.bgSecondary,
        transition: 'background 0.3s',
      }}
    >
      © {new Date().getFullYear()} Saaiq's Tech Tips &nbsp;·&nbsp; Last updated on 02/2026
    </footer>
  )
}
