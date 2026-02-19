import { FONTS } from '../theme.js'
import AnimatedBackground from './AnimatedBackground.jsx'

const TOPICS = [
  { key: 'streaming', label: '📺 Streaming', desc: 'Setup streaming movies & shows' },
  { key: 'selfhosting', label: '🖥 Self Hosting', desc: 'Run your own services' },
  { key: 'torrenting',  label: '🛠 Torrenting', desc: 'All the tips & tools to start torrenting' },
  { key: 'miscellaneous', label: '🧩 Miscellaneous', desc: 'Tips, tricks & one-liners' },
]

/**
 * Landing page with:
 *  - Animated canvas + orb background
 *  - Title fading in from above (CSS keyframe)
 *  - Four navigation cards staggered upward
 */
export default function HomePage({ setPage, dark, t }) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 58px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: t.bg,
        transition: 'background 0.3s',
      }}
    >
      <AnimatedBackground dark={dark} />

      {/* ── Hero content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '2rem 1.5rem',
          width: '100%',
          maxWidth: 700,
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 8vw, 4.5rem)',
            color: t.text,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            animation: 'fadeSlideDown 0.65s cubic-bezier(.22,1,.36,1) both',
          }}
        >
          Saaiq's{' '}
          <span style={{ color: t.accent }}>Tech Tips</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: t.textMuted,
            fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
            marginTop: '1rem',
            lineHeight: 1.6,
            fontFamily: FONTS.body,
            animation: 'fadeSlideDown 0.65s cubic-bezier(.22,1,.36,1) 0.1s both',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          A curated wiki of streaming, self-hosting, applications & more.
        </p>

        {/* Navigation cards — stagger-animated upward */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginTop: '2.5rem',
          }}
        >
          {TOPICS.map(({ key, label, desc }, idx) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className="home-btn"
              style={{
                background: t.bgCard,
                border: `1px solid ${t.border}`,
                borderRadius: 14,
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: t.shadow,
                animation: `fadeSlideUp 0.55s cubic-bezier(.22,1,.36,1) ${0.2 + idx * 0.1}s both`,
                opacity: 0,
                animationFillMode: 'forwards',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.25), 0 0 0 1px ${t.accent}44`
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = t.shadow
                e.currentTarget.style.transform = 'none'
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: t.text,
                  marginBottom: '0.3rem',
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: '0.82rem', color: t.textMuted, lineHeight: 1.4, fontFamily: FONTS.body }}>
                {desc}
              </div>
            </button>
          ))}
        </div>

        {/* Decorative divider */}
        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            justifyContent: 'center',
            animation: 'fadeIn 1s 0.7s both',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          <div style={{ height: 1, width: 60, background: `linear-gradient(to right,transparent,${t.accent})` }} />
          <span style={{ fontSize: '0.75rem', color: t.textFaint, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: FONTS.body }}>
            select a topic
          </span>
          <div style={{ height: 1, width: 60, background: `linear-gradient(to left,transparent,${t.accent})` }} />
        </div>
      </div>
    </div>
  )
}
