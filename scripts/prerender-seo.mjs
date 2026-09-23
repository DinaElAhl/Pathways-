// Post-build: write one HTML file per route with that route's SEO tags in <head>.
//
// The site is a client-rendered SPA, so every URL used to be served the same
// dist/index.html — and link-preview scrapers (WhatsApp, LinkedIn, Facebook,
// X) that do not run JavaScript saw the homepage title and description for
// every page. This copies dist/index.html to dist/<route>/index.html with the
// route's tags swapped in. The React app itself is unchanged and still boots
// from the same bundle on every page.
//
// Tags come from src/data/seo.js, the same map src/components/Seo.jsx uses.

import fs from 'node:fs'
import path from 'node:path'
import { getSeo, seoRoutes, staticSeo } from '../src/data/seo.js'

const DIST = path.resolve('dist')
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Everything between these markers in index.html is owned by this script.
const START = '<!-- seo:start -->'
const END = '<!-- seo:end -->'
if (!template.includes(START) || !template.includes(END)) {
  throw new Error('prerender-seo: index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers')
}

function headFor(route) {
  const s = getSeo(route)
  return [
    START,
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}" />`,
    s.noindex ? `<meta name="robots" content="noindex" />` : null,
    `<link rel="canonical" href="${esc(s.canonical)}" />`,
    `<meta property="og:site_name" content="Roots | جذور" />`,
    `<meta property="og:type" content="${esc(s.type)}" />`,
    `<meta property="og:title" content="${esc(s.title)}" />`,
    `<meta property="og:description" content="${esc(s.description)}" />`,
    `<meta property="og:url" content="${esc(s.canonical)}" />`,
    `<meta property="og:image" content="${esc(s.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(s.title)}" />`,
    `<meta name="twitter:description" content="${esc(s.description)}" />`,
    `<meta name="twitter:image" content="${esc(s.image)}" />`,
    END,
  ].filter(Boolean).join('\n    ')
}

const block = new RegExp(`${START}[\\s\\S]*?${END}`)
let written = 0
for (const route of seoRoutes()) {
  const html = template.replace(block, () => headFor(route))
  const out = route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, ...route.split('/').filter(Boolean), 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  written++

  const s = getSeo(route)
  const n = s.description.length
  if (staticSeo[route] && !s.noindex && (n < 140 || n > 160)) {
    console.warn(`prerender-seo: ${route} description is ${n} chars (aim for 140–160)`)
  }
}
console.log(`prerender-seo: wrote ${written} route HTML files`)
