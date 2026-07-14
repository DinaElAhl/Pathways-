import { shopBundle, shopLessons, shopKits, shopBooks, shopAuthor } from '../data/shopProducts.js';

// Small icons for the marketplace buttons. Kept inline so the page stays
// self-contained and does not pull in a new dependency for two logos.
const PayhipMark = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor">
    <path d="M2.5 2h5.2c2.6 0 4.5 1.6 4.5 4s-1.9 4-4.5 4H5.4v4H2.5V2Zm2.9 2.4v3.2h2.1c1.1 0 1.8-.6 1.8-1.6 0-1-.7-1.6-1.8-1.6H5.4Z"/>
  </svg>
);
const GumroadMark = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor">
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm.6 9.9H6.1v-1.1h1.3V8.6H6.1V7.5h3.7v3.9Zm.5-4.8H6.9c-.4 0-.7-.3-.7-.7 0-1.6 1.3-2.7 3-2.7 1 0 1.9.4 2.4 1l-.9.9c-.3-.4-.9-.6-1.5-.6-.7 0-1.2.3-1.4.9h1.3v1.2Z"/>
  </svg>
);

function BuyButtons({ payhipUrl, gumroadUrl, size = 'sm' }) {
  const base =
    size === 'lg'
      ? 'px-5 py-2.5 text-sm'
      : 'px-3 py-1.5 text-xs';
  return (
    <div className="flex flex-wrap gap-2">
      {payhipUrl && (
        <a
          href={payhipUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} rounded-md bg-accent-500 hover:bg-accent-400 text-slate-950 font-semibold transition-colors inline-flex items-center gap-1.5`}
        >
          <PayhipMark />
          Payhip
        </a>
      )}
      {gumroadUrl && (
        <a
          href={gumroadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} rounded-md bg-pink-500 hover:bg-pink-400 text-white font-semibold transition-colors inline-flex items-center gap-1.5`}
        >
          <GumroadMark />
          Gumroad
        </a>
      )}
    </div>
  );
}

export default function Shop() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs uppercase tracking-[0.18em] font-semibold text-accent-400 mb-4">
            Curriculum by Dina Mohamed
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5">
            The Roots Tajweed Reading Series
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A five-lesson curriculum that takes learners from the Arabic
            alphabet to reading with short vowels and tanwin — built by a
            working Arabic and Quranic Studies educator of seven years.
          </p>
        </div>
      </section>

      {/* Featured bundle */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-10 items-center">
            {/* Cover art */}
            <div
              aria-hidden="true"
              className="aspect-[4/5] rounded-xl flex items-center justify-center text-center p-6 shadow-2xl"
              style={{
                background:
                  'radial-gradient(circle at 30% 20%, rgba(245,158,11,0.28), transparent 55%), linear-gradient(135deg, #0d3b3e 0%, #1a5559 55%, #2d7478 100%)',
              }}
            >
              <div>
                <div
                  className="text-5xl sm:text-6xl mb-2 text-[#e8dab5]"
                  style={{ fontFamily: 'Amiri, "Traditional Arabic", serif', direction: 'rtl' }}
                >
                  {shopBundle.arabicTitle}
                </div>
                <div className="text-2xl font-semibold text-[#f0e8d2]" style={{ fontFamily: 'Georgia, serif' }}>
                  Roots
                </div>
                <div className="text-sm italic text-[#f0e8d2]/70 mt-1">
                  Tajweed Reading Series
                </div>
              </div>
            </div>

            {/* Bundle details */}
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.14em] font-bold text-accent-400 mb-3">
                {shopBundle.eyebrow}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                All five lessons — from the alphabet to fluent reading
              </h2>
              <p className="text-slate-300 mb-5">{shopBundle.summary}</p>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-white">${shopBundle.price}</span>
                <span className="text-slate-400 text-sm">
                  USD · one-time · all {shopBundle.lessonCount} lessons · save ${shopBundle.savings}
                </span>
              </div>

              <ul className="text-sm text-slate-300 space-y-1.5 mb-6">
                {shopBundle.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-accent-400">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <div className="text-xs text-slate-400 uppercase tracking-wider">
                  Buy on your preferred platform
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={shopBundle.payhipUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg bg-accent-500 hover:bg-accent-400 text-slate-950 font-semibold text-sm transition-colors inline-flex items-center gap-2"
                  >
                    <PayhipMark />
                    Buy on Payhip →
                  </a>
                  <a
                    href={shopBundle.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg bg-pink-500 hover:bg-pink-400 text-white font-semibold text-sm transition-colors inline-flex items-center gap-2"
                  >
                    <GumroadMark />
                    Buy on Gumroad →
                  </a>
                  <a
                    href="#lessons"
                    className="px-6 py-3 rounded-lg border border-slate-700 hover:border-accent-400 hover:text-accent-400 text-slate-200 font-semibold text-sm transition-colors"
                  >
                    Browse individual lessons
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual lessons */}
      <section id="lessons" className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Individual lessons
            </h2>
            <p className="text-slate-400">
              Pick up any single lesson for $4, or grab the full bundle above and save $5.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shopLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex flex-col bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-accent-400/60 hover:shadow-soft transition-all"
              >
                <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.1em] mb-2">
                  Lesson {lesson.number}
                </span>
                <h3 className="font-display text-lg font-semibold text-white mb-1">
                  {lesson.title}
                </h3>
                {lesson.subtitle && (
                  <div className="text-sm text-slate-400 italic mb-2">{lesson.subtitle}</div>
                )}
                <p className="text-sm text-slate-300 flex-1 mb-4">{lesson.description}</p>
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-white">${lesson.price}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Choose platform</span>
                  </div>
                  <BuyButtons payhipUrl={lesson.payhipUrl} gumroadUrl={lesson.gumroadUrl} />
                </div>
              </div>
            ))}

            {/* Cross-sell: back to bundle */}
            <div className="flex flex-col bg-gradient-to-br from-brand-800 to-brand-950 border border-brand-600/40 rounded-xl p-5 hover:border-accent-400/60 hover:shadow-soft transition-all">
              <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.1em] mb-2">
                Save $5
              </span>
              <h3 className="font-display text-lg font-semibold text-white mb-1">
                Or take all five — the bundle
              </h3>
              <p className="text-sm text-slate-200 flex-1 mb-4">
                All five lessons together for $15 instead of $20. The natural way to run the series end to end.
              </p>
              <div className="pt-4 border-t border-brand-600/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-white">${shopBundle.price}</span>
                  <span className="text-xs text-slate-300 uppercase tracking-wider">Choose platform</span>
                </div>
                <BuyButtons payhipUrl={shopBundle.payhipUrl} gumroadUrl={shopBundle.gumroadUrl} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Elementary Kits (curriculum-in-a-box) */}
      <section id="kits" className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block text-xs uppercase tracking-[0.14em] font-bold text-accent-400 mb-2">
              Curriculum in a box
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Roots Elementary Kits
            </h2>
            <p className="text-slate-400 max-w-2xl">
              For homeschoolers and microschools who want everything for a track (or across all three).
              Each kit is a curated bundle of the Roots resource packs.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {shopKits.map((kit) => (
              <div
                key={kit.id}
                className={`relative flex flex-col rounded-xl p-5 transition-all ${
                  kit.badge
                    ? 'bg-gradient-to-br from-brand-800 to-brand-950 border border-accent-400/60 hover:shadow-soft'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-accent-400/60 hover:shadow-soft'
                }`}
              >
                {kit.badge && (
                  <span className="absolute -top-2 right-3 bg-accent-500 text-slate-950 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {kit.badge}
                  </span>
                )}
                <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.1em] mb-2">
                  {kit.track}
                </span>
                <h3 className="font-display text-lg font-semibold text-white mb-1">{kit.name}</h3>
                <div className="text-sm text-slate-400 italic mb-2">{kit.tagline}</div>
                <p className="text-sm text-slate-300 flex-1 mb-4">{kit.description}</p>
                <div className="pt-4 border-t border-slate-700/60">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-white">${kit.price}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">One-time</span>
                  </div>
                  <a
                    href={
                      `mailto:${kit.buyEmail}?subject=` +
                      encodeURIComponent(`${kit.name} — purchase enquiry`)
                    }
                    className="block text-center px-4 py-2 rounded-md bg-accent-500 hover:bg-accent-400 text-slate-950 font-semibold text-sm transition-colors"
                  >
                    Buy — email Dina
                  </a>
                  <div className="text-[10px] text-slate-500 mt-2 text-center uppercase tracking-wider">
                    Launching soon on Payhip &amp; Gumroad
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books / Arabic reading */}
      <section id="books" className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Arabic reading
            </h2>
            <p className="text-slate-400">
              Original Arabic writing by Dina — for readers who enjoy the language itself.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {shopBooks.map((book) => (
              <div
                key={book.id}
                className="flex flex-col bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-accent-400/60 hover:shadow-soft transition-all md:col-span-1"
              >
                <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.1em] mb-3">
                  {book.eyebrow}
                </span>
                <h3
                  className="text-3xl mb-2 text-white"
                  style={{ fontFamily: 'Amiri, "Traditional Arabic", serif', direction: 'rtl' }}
                >
                  {book.arabicTitle}
                </h3>
                <div className="text-sm text-slate-400 italic mb-3">
                  {book.romanization} · <span className="text-slate-500">“{book.englishTitle}”</span>
                </div>
                <p className="text-sm text-slate-300 flex-1 mb-4">{book.description}</p>
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-white">{book.priceLabel}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Pay what you want</span>
                  </div>
                  <BuyButtons gumroadUrl={book.gumroadUrl} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the author */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-white mb-3">About the author</h2>
          <p className="text-slate-300 mb-4">{shopAuthor.bio}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href={shopAuthor.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-400 hover:text-accent-500 font-semibold"
            >
              Payhip store →
            </a>
            <a
              href="/rqap.html"
              className="text-accent-400 hover:text-accent-500 font-semibold"
            >
              Try the RQAP Level 2 proficiency exam →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
