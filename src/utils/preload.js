/* ═══════════════════════════════════════════════════════════════════════════
   PRELOADING UTILITIES
   Functions for eagerly fetching images and markdown content before the
   user navigates to a page, so everything is ready by the time they arrive.
══════════════════════════════════════════════════════════════════════════ */

/**
 * Extracts every image URL from a markdown string.
 * Matches the standard ![alt](url) syntax.
 */
export function extractImageUrls(md) {
  const urls = []
  const rx   = /!\[[^\]]*\]\(([^)]+)\)/g
  let m
  while ((m = rx.exec(md)) !== null) urls.push(m[1])
  return urls
}

/**
 * Preloads a single image URL by creating an off-screen Image object.
 * The browser caches the response so the <img> tag renders instantly later.
 * Safe to call multiple times for the same URL — a WeakSet tracks in-flight
 * and already-completed loads to avoid duplicate requests.
 */
const _preloaded = new Set()

export function preloadImage(url) {
  if (_preloaded.has(url)) return
  _preloaded.add(url)
  const img = new Image()
  img.src   = url
}

/**
 * Preloads all images found in a markdown string.
 */
export function preloadMarkdownImages(md) {
  for (const url of extractImageUrls(md)) {
    preloadImage(url)
  }
}

/**
 * Preloads all images for a named page.
 * Call this on hover of a navigation button — by the time the user clicks
 * and the page renders, the images will already be in the browser cache.
 *
 * `contentMap` is an object mapping page key → markdown string, matching
 * the PAGES object in App.jsx.
 */
export function preloadPage(key, contentMap) {
  const md = contentMap[key]
  if (md) preloadMarkdownImages(md)
}