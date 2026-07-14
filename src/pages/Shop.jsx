import { shopBundle, shopLessons, shopAuthor } from '../data/shopProducts.js';

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

              <div className="flex flex-wrap gap-3">
                <a
                  href={shopBundle.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-accent-500 hover:bg-accent-400 text-slate-950 font-semibold text-sm transition-colors"
                >
                  Buy the bundle on Payhip →
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
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="text-lg font-bold text-white">${lesson.price}</span>
                  <a
                    href={lesson.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-accent-400 hover:text-accent-500"
                  >
                    Buy on Payhip →
                  </a>
                </div>
              </div>
            ))}

            {/* Cross-sell: back to bundle */}
            <a
              href={shopBundle.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col bg-gradient-to-br from-brand-800 to-brand-950 border border-brand-600/40 rounded-xl p-5 hover:border-accent-400/60 hover:shadow-soft transition-all"
            >
              <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.1em] mb-2">
                Save $5
              </span>
              <h3 className="font-display text-lg font-semibold text-white mb-1">
                Or take all five — the bundle
              </h3>
              <p className="text-sm text-slate-200 flex-1 mb-4">
                All five lessons together for $15 instead of $20. The natural way to run the series end to end.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-brand-600/30">
                <span className="text-lg font-bold text-white">${shopBundle.price}</span>
                <span className="text-sm font-semibold text-accent-400">Buy the bundle →</span>
              </div>
            </a>
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
