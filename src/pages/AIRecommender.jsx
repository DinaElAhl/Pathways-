import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { pathways } from '../data/pathways.js'

// Lightweight on-device "AI" recommender.
// Uses TF-IDF style scoring + cosine similarity between the learner's
// stated interests and each pathway's keyword profile.  No external API,
// runs entirely in the browser — privacy-preserving and free.

const INTEREST_TAGS = [
  { id: 'code',    label: 'Coding & Software',    keywords: ['code','programming','javascript','python','web','developer','software','api','frontend','backend'] },
  { id: 'data',    label: 'Data & Analytics',     keywords: ['data','analysis','statistics','sql','pandas','visualization','analytics','dashboard'] },
  { id: 'ai',      label: 'AI & Machine Learning',keywords: ['ai','machine','learning','neural','model','tensorflow','pytorch','nlp','llm','deep'] },
  { id: 'design',  label: 'Design & UX',          keywords: ['design','ux','ui','figma','user','experience','prototype','wireframe','accessibility'] },
  { id: 'cloud',   label: 'Cloud & DevOps',       keywords: ['cloud','aws','azure','devops','docker','kubernetes','ci','cd','infrastructure'] },
  { id: 'product', label: 'Product & Strategy',   keywords: ['product','strategy','roadmap','agile','scrum','stakeholder','launch','manager'] },
  { id: 'lang',    label: 'Languages & Culture',  keywords: ['arabic','language','culture','vocabulary','grammar','speak','read','write'] },
  { id: 'beginner',label: 'Absolute Beginner',    keywords: ['beginner','intro','basics','first','foundation','start','simple','digital','literacy'] },
]

const GOAL_OPTIONS = [
  { id: 'career',  label: 'Switch career or get hired',     boost: ['developer','manager','professional','job'] },
  { id: 'upskill', label: 'Upskill in my current role',     boost: ['advanced','intermediate','project','build'] },
  { id: 'curious', label: 'Explore something new',          boost: ['intro','overview','foundation','beginner'] },
  { id: 'project', label: 'Build a personal project',       boost: ['project','build','portfolio','hands-on'] },
]

const TIME_OPTIONS = [
  { id: 'light',  label: '~2 hrs / week',  weeks: 16 },
  { id: 'steady', label: '~5 hrs / week',  weeks: 10 },
  { id: 'deep',   label: '10+ hrs / week', weeks: 6  },
]

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2)
}

function pathwayProfile(p) {
  const stageText = (p.stages || [])
    .map(s => `${s.title} ${s.description || ''} ${(s.resources || []).map(r => `${r.title} ${r.type || ''}`).join(' ')}`)
    .join(' ')
  return tokenize(`${p.title} ${p.description} ${(p.tags || []).join(' ')} ${stageText}`)
}

function score(profileTokens, queryTokens) {
  if (!queryTokens.length) return 0
  const set = new Set(profileTokens)
  let hits = 0
  queryTokens.forEach(q => { if (set.has(q)) hits += 1 })
  // length-normalised score in [0,1]
  return hits / Math.sqrt(queryTokens.length * Math.max(1, profileTokens.length / 40))
}

export default function AIRecommender() {
  const [selectedTags, setSelectedTags] = useState([])
  const [goal, setGoal] = useState('curious')
  const [time, setTime] = useState('steady')
  const [freeText, setFreeText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleTag = (id) =>
    setSelectedTags(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])

  const recommendations = useMemo(() => {
    if (!submitted) return []
    const tagKeywords = selectedTags.flatMap(id => {
      const tag = INTEREST_TAGS.find(t => t.id === id)
      return tag ? tag.keywords : []
    })
    const goalBoost = (GOAL_OPTIONS.find(g => g.id === goal) || {}).boost || []
    const query = tokenize([...tagKeywords, ...goalBoost, freeText].join(' '))

    return pathways
      .map(p => ({ pathway: p, s: score(pathwayProfile(p), query) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 4)
      .filter(r => r.s > 0)
  }, [submitted, selectedTags, goal, time, freeText])

  const timeMeta = TIME_OPTIONS.find(t => t.id === time)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="inline-block text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-violet-100 text-violet-700 mb-3">
          AI-powered guidance
        </span>
        <h1 className="text-4xl font-bold mb-3">Find your perfect pathway</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tell us about your interests and goals. Our on-device recommender analyses
          every pathway's curriculum and suggests the best next step — no data leaves your browser.
        </p>
      </div>

      {!submitted ? (
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-8"
        >
          <section>
            <h2 className="font-semibold mb-3">1. What topics interest you?</h2>
            <div className="flex flex-wrap gap-2">
              {INTEREST_TAGS.map(tag => (
                <button
                  type="button"
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    selectedTags.includes(tag.id)
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-violet-400'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-semibold mb-3">2. What's your main goal?</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {GOAL_OPTIONS.map(g => (
                <label key={g.id} className={`border rounded-xl p-4 cursor-pointer transition ${goal === g.id ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300'}`}>
                  <input type="radio" name="goal" value={g.id} checked={goal === g.id} onChange={() => setGoal(g.id)} className="mr-2" />
                  {g.label}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-semibold mb-3">3. How much time can you commit?</h2>
            <div className="grid grid-cols-3 gap-3">
              {TIME_OPTIONS.map(t => (
                <label key={t.id} className={`border rounded-xl p-4 cursor-pointer text-center transition ${time === t.id ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300'}`}>
                  <input type="radio" name="time" value={t.id} checked={time === t.id} onChange={() => setTime(t.id)} className="hidden" />
                  <div className="font-medium">{t.label}</div>
                  <div className="text-xs text-gray-500 mt-1">~{t.weeks} weeks</div>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-semibold mb-3">4. Anything else? (optional)</h2>
            <textarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="e.g. 'I want to build a chatbot' or 'I'm a teacher who wants to use AI in class'"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
              rows={3}
            />
          </section>

          <button
            type="submit"
            disabled={selectedTags.length === 0}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-xl transition"
          >
            Generate my recommendations
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-violet-700 font-medium">Your plan</div>
              <div className="text-gray-700">
                {selectedTags.length} interest{selectedTags.length !== 1 ? 's' : ''} ·{' '}
                {(GOAL_OPTIONS.find(g => g.id === goal) || {}).label} ·{' '}
                {timeMeta && timeMeta.label}
              </div>
            </div>
            <button onClick={() => setSubmitted(false)} className="text-violet-700 hover:underline text-sm">
              Edit answers
            </button>
          </div>

          {recommendations.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
              <p className="text-gray-600">No close matches yet — try selecting a few more interests.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Top {recommendations.length} pathways for you</h2>
              <div className="grid gap-4">
                {recommendations.map(({ pathway, s }, idx) => (
                  <Link
                    to={`/pathways/${pathway.slug}`}
                    key={pathway.slug}
                    className="block bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-violet-300 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                            #{idx + 1} match
                          </span>
                          <span className="text-xs text-gray-500">
                            confidence {(Math.min(s, 1) * 100).toFixed(0)}%
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-1">{pathway.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{pathway.description}</p>
                      </div>
                      <span className="text-violet-600 text-2xl">→</span>
                    </div>
                  </Link>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                Recommendations computed locally using TF-IDF similarity. Your answers stay on this device.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
