export default function RootsStoryArt({ reflection = false }) {
  return <svg viewBox="0 0 560 470" className="roots-story-art" role="img" aria-label={reflection ? 'An open book, growing leaves and a sun: reading, noticing and reflecting' : 'A little Roots plant growing from an open book'}>
    <circle cx="287" cy="225" r="184" fill={reflection ? '#fff0b3' : '#d8ebcf'} />
    <circle cx="435" cy="82" r="40" fill="#edcd62" />
    <g stroke="#365f3d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M75 301Q174 262 280 306Q383 262 485 301V402Q382 367 280 410Q175 368 75 402Z" fill="#fffbee" />
      <path d="M280 309V410M101 324Q173 300 246 328M101 350Q173 327 246 354M314 328Q385 301 459 324M314 354Q385 328 459 350" fill="none" />
      <path d="M280 295V151" fill="none" />
      <path d="M278 226Q181 229 180 154Q270 139 278 226Z" fill="#a8cd95" />
      <path d="M282 190Q376 199 385 113Q295 104 282 190Z" fill="#80b37c" />
      <path d="M207 177L278 226M356 139L282 190" fill="none" strokeWidth="3" />
      <path d="M281 416L281 443M280 424L250 440M280 429L310 447" fill="none" strokeWidth="4" />
    </g>
    <g fill="#e9a497"><circle cx="117" cy="170" r="10"/><circle cx="455" cy="253" r="8"/><path d="M104 73L110 92L130 98L110 104L104 124L98 104L78 98L98 92Z"/></g>
    <g fill="#365f3d"><circle cx="265" cy="265" r="4"/><circle cx="293" cy="265" r="4"/></g>
    <path d="M267 279Q280 290 293 279" stroke="#365f3d" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
}
