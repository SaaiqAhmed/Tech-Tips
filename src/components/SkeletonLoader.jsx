/**
 * Shimmer skeleton shown while a WikiPage mounts its content.
 * Mimics the rough shape of a markdown page (title, paragraphs, sub-heading).
 */
export default function SkeletonLoader({ t }) {
  const bar = (width, height = 16, marginTop = 12) => (
    <div
      style={{
        width,
        height,
        borderRadius: 6,
        background: t.skeletonBg,
        backgroundImage: t.skeleton,
        backgroundSize: '600px 100%',
        animation: 'shimmer 1.4s infinite linear',
        marginTop,
      }}
    />
  )

  return (
    <div style={{ padding: '2.5rem 2rem', maxWidth: 820, margin: '0 auto' }}>
      {bar('60%', 32, 0)}
      {bar('90%', 14, 20)}
      {bar('85%', 14, 10)}
      {bar('70%', 14, 10)}
      {bar('40%', 24, 32)}
      {bar('95%', 14, 16)}
      {bar('88%', 14, 10)}
      {bar('75%', 14, 10)}
      {bar('50%', 14, 10)}
    </div>
  )
}
