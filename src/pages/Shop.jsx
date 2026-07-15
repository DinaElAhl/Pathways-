import { shopBundle, shopLessons, shopKits, shopAuthor } from '../data/shopProducts.js';

// Small logos for the marketplace buttons. Inline so the page stays
// self-contained and does not pull in a new dependency for two marks.
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

// Payhip amber matches the site's accent-500. Gumroad pink is the marketplace's
// own brand color, kept as-is so buyers instantly recognise the platform.
function BuyButtons({ payhipUrl, gumroadUrl, size = 'sm' }) {
  const base = size === 'lg' ? 'px-5 py-2.5 text-sm' : 'px-3 py-1.5 text-xs';
  return (
    <div className="flex flex-wrap gap-2">
      {payhipUrl && (
        <a
          href={payhipUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} rounded-full bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-colors inline-flex items-center gap-1.5`}
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
          className={`${base} rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition-colors inline-flex items-center gap-1.5`}
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
    <div className="bg-white">
      {/* Hero */}
      <section className="container-page pt-16 pb-10 sm:pt-24 text-center">
        <span className="chip">Curriculum by Dina Mohamed</span>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight">
          The{' '}
          <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
            Roots Tajweed
          </span>{' '}
          Reading Series
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          A five-lesson curriculum that takes learners from the Arabic alphabet to reading with
          short vowels and tanwin — built by a working Arabic and Qur’anic Studies educator.
        </p>
      </section>

      {/* Featured bundle */}
      <section className="container-page pb-16">
        <div className="grid gap-8 md:grid-cols-2 rounded-2xl bg-slate-50 p-6 sm:p-10 ring-1 ring-slate-200 items-center">
          {/* Cover art — the book-cover metaphor stays intentionally deep-toned. */}
          <div
            aria-hidden="true"
            className="aspect-[4/5] rounded-xl flex items-center justify-center text-center p-6 shadow-soft"
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
              <div
                className="text-2xl font-semibold text-[#f0e8d2]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Roots
              </div>
              <div className="text-sm italic text-[#f0e8d2]/70 mt-1">Tajweed Reading Series</div>
            </div>
          </div>

          {/* Bundle details */}
          <div>
            <span className="chip">{shopBundle.eyebrow}</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              All five lessons — from the alphabet to fluent reading
            </h2>
            <p className="mt-3 text-slate-600">{shopBundle.summary}</p>

            <div className="flex items-baseline gap-3 mt-5 mb-2">
              <span className="text-4xl font-bold text-slate-900">${shopBundle.price}</span>
              <span className="text-slate-500 text-sm">
                USD · one-time · all {shopBundle.lessonCount} lessons · save ${shopBundle.savings}
              </span>
            </div>

            <ul className="text-sm text-slate-700 space-y-1.5 mt-4 mb-6">
              {shopBundle.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="text-brand-700">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-2 mb-3 text-xs text-slate-500 uppercase tracking-wide">
              Buy on your preferred platform
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={shopBundle.payhipUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-accent-500 hover:bg-accent-600 focus-visible:ring-accent-500 inline-flex items-center gap-2"
              >
                <PayhipMark />
                Buy on Payhip →
              </a>
              <a
                href={shopBundle.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-pink-500 hover:bg-pink-600 focus-visible:ring-pink-500 inline-flex items-center gap-2"
              >
                <GumroadMark />
                Buy on Gumroad →
              </a>
              <a href="#lessons" className="btn-secondary">
                Browse individual lessons
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Individual lessons */}
      <section id="lessons" className="bg-slate-50 py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="chip">Individual lessons</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Pick a single lesson
            </h2>
            <p className="mt-2 text-slate-600">
              Any lesson is $4, or grab the full bundle above and save $5.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shopLessons.map((lesson) => (
              <div key={lesson.id} className="card flex flex-col">
                <span className="text-xs font-semibold text-brand-700 uppercase tracking-wide mb-1">
                  Lesson {lesson.number}
                </span>
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-1">
                  {lesson.title}
                </h3>
                {lesson.subtitle && (
                  <div className="text-sm text-slate-500 italic mb-2">{lesson.subtitle}</div>
                )}
                <p className="text-sm text-slate-600 flex-1 mb-4">{lesson.description}</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-slate-900">${lesson.price}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wide">
                      Choose platform
                    </span>
                  </div>
                  <BuyButtons payhipUrl={lesson.payhipUrl} gumroadUrl={lesson.gumroadUrl} />
                </div>
              </div>
            ))}

            {/* Cross-sell back to bundle */}
            <div className="flex flex-col rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-soft transition hover:shadow-lg">
              <span className="text-xs font-semibold text-brand-100 uppercase tracking-wide mb-1">
                Save $5
              </span>
              <h3 className="font-display text-lg font-semibold mb-1">
                Or take all five — the bundle
              </h3>
              <p className="text-sm text-brand-100 flex-1 mb-4">
                All five lessons together for $15 instead of $20. The natural way to run the series
                end to end.
              </p>
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold">${shopBundle.price}</span>
                  <span className="text-xs text-brand-100 uppercase tracking-wide">
                    Choose platform
                  </span>
                </div>
                <BuyButtons
                  payhipUrl={shopBundle.payhipUrl}
                  gumroadUrl={shopBundle.gumroadUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Elementary Kits — curriculum in a box */}
      <section id="kits" className="container-page py-16">
        <div className="max-w-3xl">
          <span className="chip">Curriculum in a box</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Roots Elementary Kits
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            For homeschoolers and microschools who want everything for a track (or across all
            three). Each kit is a curated bundle of the Roots resource packs.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shopKits.map((kit) => {
            const isBundle = !!kit.badge;
            return (
              <div
                key={kit.id}
                className={`relative flex flex-col rounded-2xl p-6 transition ${
                  isBundle
                    ? 'bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-soft'
                    : 'bg-white ring-1 ring-slate-200 hover:ring-brand-200 hover:shadow-soft'
                }`}
              >
                {kit.badge && (
                  <span className="absolute -top-2 right-3 bg-accent-500 text-slate-900 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {kit.badge}
                  </span>
                )}
                <span
                  className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                    isBundle ? 'text-brand-100' : 'text-brand-700'
                  }`}
                >
                  {kit.track}
                </span>
                <h3
                  className={`font-display text-lg font-semibold mb-1 ${
                    isBundle ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {kit.name}
                </h3>
                <div
                  className={`text-sm italic mb-2 ${
                    isBundle ? 'text-brand-100' : 'text-slate-500'
                  }`}
                >
                  {kit.tagline}
                </div>
                <p
                  className={`text-sm flex-1 mb-4 ${
                    isBundle ? 'text-brand-100' : 'text-slate-600'
                  }`}
                >
                  {kit.description}
                </p>
                <div
                  className={`pt-4 border-t ${
                    isBundle ? 'border-white/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-2xl font-bold ${
                        isBundle ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      ${kit.price}
                    </span>
                    <span
                      className={`text-xs uppercase tracking-wide ${
                        isBundle ? 'text-brand-100' : 'text-slate-500'
                      }`}
                    >
                      One-time
                    </span>
                  </div>
                  <a
                    href={
                      `mailto:${kit.buyEmail}?subject=` +
                      encodeURIComponent(`${kit.name} — purchase enquiry`)
                    }
                    className={`block text-center px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                      isBundle
                        ? 'bg-white text-brand-700 hover:bg-brand-50'
                        : 'bg-brand-600 text-white hover:bg-brand-700'
                    }`}
                  >
                    Buy — email Dina
                  </a>
                  <div
                    className={`text-[10px] mt-2 text-center uppercase tracking-wide ${
                      isBundle ? 'text-brand-100' : 'text-slate-500'
                    }`}
                  >
                    Launching soon on Payhip &amp; Gumroad
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About the author */}
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-slate-200">
            <span className="chip">About the author</span>
            <p className="mt-4 text-slate-700">{shopAuthor.bio}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a
                href={shopAuthor.payhipStore}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Payhip store →
              </a>
              <a
                href={shopAuthor.gumroadStore}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Gumroad store →
              </a>
              <a href="/rqap.html" className="link">
                Try the RQAP Level 2 proficiency exam →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
