import { useEffect } from 'react'
import { getSeo } from '../data/seo.js'

// Keeps <head> in step with the route on client-side navigation. The first
// paint already has the right tags — scripts/prerender-seo.mjs bakes them
// into each route's HTML — so this only matters once the visitor clicks around.

function upsert(selector, create, content) {
  let el = document.head.querySelector(selector)
  if (content == null) { el?.remove(); return }
  if (!el) { el = create(); document.head.appendChild(el) }
  el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', content)
}

const meta = (attr, key) => [
  `meta[${attr}="${key}"]`,
  () => { const m = document.createElement('meta'); m.setAttribute(attr, key); return m },
]

export default function Seo({ pathname }) {
  useEffect(() => {
    const s = getSeo(pathname)
    document.title = s.title
    upsert(...meta('name', 'description'), s.description)
    upsert(...meta('name', 'robots'), s.noindex ? 'noindex' : null)
    upsert('link[rel="canonical"]', () => { const l = document.createElement('link'); l.rel = 'canonical'; return l }, s.canonical)
    upsert(...meta('property', 'og:type'), s.type)
    upsert(...meta('property', 'og:title'), s.title)
    upsert(...meta('property', 'og:description'), s.description)
    upsert(...meta('property', 'og:url'), s.canonical)
    upsert(...meta('property', 'og:image'), s.image)
    upsert(...meta('name', 'twitter:card'), 'summary_large_image')
    upsert(...meta('name', 'twitter:title'), s.title)
    upsert(...meta('name', 'twitter:description'), s.description)
    upsert(...meta('name', 'twitter:image'), s.image)
  }, [pathname])
  return null
}
