import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/* ─── Global styles injected once at startup ─────────────────────────────── */
const style = document.createElement('style')
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; padding: 0; font-family: 'IBM Plex Sans', sans-serif; }
  ::selection { background: rgba(0, 212, 170, 0.25); }

  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-28px); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  @keyframes pulseOrb {
    0%, 100% { transform: scale(1);    opacity: 0.35; }
    50%       { transform: scale(1.12); opacity: 0.55; }
  }

  .page-enter   { animation: fadeIn 0.38s ease; }
  .toc-link:hover { text-decoration: underline; }
  .nav-link     { transition: color 0.2s, background 0.2s; }
  .home-btn     { transition: transform 0.18s ease, box-shadow 0.18s ease; }
  .theme-btn    { transition: background 0.2s, color 0.2s; }
  .theme-btn:hover { filter: brightness(1.15); }

  ::-webkit-scrollbar       { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.3); border-radius: 3px; }
`
document.head.appendChild(style)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
