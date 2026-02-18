import { useEffect, useRef } from 'react'

/**
 * Full-bleed animated hero background.
 * Renders two pulsing gradient orbs (CSS) overlaid with a
 * canvas particle-network animation that reacts to dark/light mode.
 */
export default function AnimatedBackground({ dark }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    /* Resize canvas to fill its container */
    const setSize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    const colour = dark ? '0,212,170' : '0,122,204'
    const N = 55

    /* Initialise particles at random positions and velocities */
    const pts = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.8 + 0.5,
    }))

    let raf

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      /* Move & draw each particle (wrapping at edges) */
      for (const p of pts) {
        p.x = (p.x + p.vx + canvas.width)  % canvas.width
        p.y = (p.y + p.vy + canvas.height) % canvas.height
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colour},0.5)`
        ctx.fill()
      }

      /* Draw connecting lines between nearby particles */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(${colour},${0.18 * (1 - d / 90)})`
            ctx.lineWidth   = 0.6
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setSize)
    }
  }, [dark])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Soft gradient orbs */}
      <div
        style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: dark
            ? 'radial-gradient(circle,rgba(0,212,170,0.12),transparent 70%)'
            : 'radial-gradient(circle,rgba(0,122,204,0.1),transparent 70%)',
          top: '10%', left: '5%',
          animation: 'pulseOrb 6s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute', width: 350, height: 350, borderRadius: '50%',
          background: dark
            ? 'radial-gradient(circle,rgba(240,136,62,0.08),transparent 70%)'
            : 'radial-gradient(circle,rgba(192,80,0,0.07),transparent 70%)',
          bottom: '15%', right: '8%',
          animation: 'pulseOrb 8s ease-in-out infinite 2s',
        }}
      />

      {/* Canvas particle network */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  )
}
