import { useState } from 'react'
import { Link } from 'react-router-dom'
import { learnerJourneyTabs, learnerQuestionTopics, learnerContactHref } from '../data/learnerJourney.js'
import { socialLinks } from '../data/socialLinks.js'

export default function LearnerNextSteps() {
  const [active, setActive] = useState('practise')
  const [topicId, setTopicId] = useState('learning')
  const tab = learnerJourneyTabs.find(item => item.id === active)
  const topic = learnerQuestionTopics.find(item => item.id === topicId)
  return <section id="stay-connected" className="container-page py-12 sm:py-16" aria-labelledby="learner-next-title">
    <div className="mx-auto max-w-4xl rounded-3xl border border-brand-200 bg-[#fffbee] p-5 sm:p-9">
      <p className="text-sm font-semibold text-brand-700">Small steps. Strong Roots.</p>
      <h2 id="learner-next-title" className="mt-3 font-display text-3xl font-semibold text-brand-900">Keep learning with Roots</h2>
      <div className="mt-6 flex flex-wrap gap-3" role="group" aria-label="Choose your next step">
        {learnerJourneyTabs.map(item => <button key={item.id} type="button" aria-pressed={active === item.id} onClick={() => setActive(item.id)} className={`min-h-12 rounded-full border border-brand-300 px-5 py-2 font-semibold text-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${active === item.id ? 'bg-[#edcd62]' : 'bg-white'}`}>{item.label}</button>)}
      </div>
      <div className="mt-5 rounded-2xl bg-white p-5 sm:p-7" aria-live="polite">
        <h3 className="font-display text-xl font-semibold text-brand-900">{tab.heading}</h3>
        <p className="mt-3 leading-relaxed text-slate-700">{tab.body}</p>
        {active === 'practise' && <div className="mt-5 flex flex-wrap gap-3"><a className="btn-primary min-h-12" href="#watch">Back to the free lessons ↑</a><Link className="btn-secondary min-h-12" to="/play">Try Roots Play →</Link></div>}
        {active === 'ask' && <div className="mt-5">
          <label className="block text-sm font-semibold text-brand-900" htmlFor="roots-question-topic">What would you like help with?</label>
          <select id="roots-question-topic" value={topicId} onChange={event => setTopicId(event.target.value)} className="mt-2 block min-h-12 w-full max-w-lg rounded-xl border border-brand-300 bg-white p-3 text-slate-800">{learnerQuestionTopics.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select>
          <a className="btn-primary mt-4 min-h-12" href={learnerContactHref(topic)}>Open an email draft →</a>
          <p className="mt-3 break-words text-sm text-slate-600">Or write to <a className="underline" href="mailto:roots@pathwayslearn.com">roots@pathwayslearn.com</a>. A parent or teacher should contact Roots for a child; please leave out children’s personal details.</p>
        </div>}
        {active === 'continue' && <div className="mt-5 flex flex-wrap gap-3"><Link className="btn-primary min-h-12" to="/shop">Explore the printable workbooks →</Link><a className="btn-secondary min-h-12" href="#lesson-plan">See the lesson plan ↑</a><p className="w-full text-sm text-slate-600">Product pages explain the format and price before checkout. Paid recorded-course access is not available through this page.</p></div>}
      </div>
      <div className="mt-6 border-t border-brand-200 pt-5"><h3 className="font-display text-lg font-semibold text-brand-900">Stay connected, at your own pace</h3><div className="mt-3 flex flex-wrap gap-4">{socialLinks.map(channel => <a key={channel.name} className="inline-flex min-h-12 items-center font-semibold text-brand-800 underline" href={channel.url} target="_blank" rel="noopener noreferrer">{channel.cta}</a>)}</div><p className="mt-2 text-xs leading-relaxed text-slate-600">These open external services. Following is optional and separate from purchasing or asking a question. No automatic email signup is created here.</p></div>
    </div>
  </section>
}
