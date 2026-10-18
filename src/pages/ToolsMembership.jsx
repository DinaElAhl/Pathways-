import { Link } from 'react-router-dom'
import { toolsMembership as membership } from '../data/toolsMembership.js'
import './spellingBee.css'
import './toolsMembership.css'

export default function ToolsMembership() {
  const contact = plan => 'mailto:roots@pathwayslearn.com?subject=' + encodeURIComponent('Roots membership enquiry: ' + plan.title) + '&body=' + encodeURIComponent(`Hello Roots,\n\nI am interested in the proposed ${plan.title} membership.\nNumber of teachers:\nNumber of learners:\nTools we need:\n\n`)
  return <div className="container-page bee-page membership-page">
    <header className="bee-hero">
      <div><p className="bee-eyebrow">ROOTS · TEACHERS · TEAMS · SCHOOLS</p><h1>Your teaching.<br /><span>Your way to grow.</span></h1><p>One teacher, a growing teaching business or a whole school: explore a membership shaped around the way you work.</p></div>
      <img src={import.meta.env.BASE_URL + 'brand/roots-sprout.svg'} width="160" height="160" alt="Roots sprout" />
    </header>
    <aside className="membership-status"><strong>Three proposed plans · not on sale yet</strong><p>These are plans for future paid features. Prices for teachers and teams are still being reviewed; schools receive a tailored quote. No subscription or charge starts here.</p></aside>
    <section className="membership-plans" aria-label="Proposed membership plans">
      {membership.plans.map(plan => <article key={plan.id} className={`membership-plan membership-${plan.color}`}>
        <div className="membership-plan-heading"><p className="bee-eyebrow">{plan.id === 'teacher' ? '01 · TEACH ON YOUR OWN' : plan.id === 'team' ? '02 · GROW TOGETHER' : '03 · SUPPORT YOUR SCHOOL'}</p><h2>{plan.title}</h2><p>{plan.audience}</p></div>
        <p className="membership-price">{plan.pricing === 'quote' ? 'School-specific quote' : plan.monthlyPrice == null ? 'Monthly price to be confirmed' : `$${plan.monthlyPrice} / month`}</p>
        <p className="membership-scope">{plan.scope}</p><h3>Proposed features</h3><ul>{plan.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
        <p className="membership-boundary">{plan.boundary}</p><a className="btn-secondary" href={contact(plan)}>Ask about this plan →</a>
      </article>)}
    </section>
    <p className="bee-small mt-4">Enquiry links open your email app. You decide whether to send; they do not purchase a plan or join a mailing list.</p>
    <section className="membership-details" aria-label="Before subscriptions launch"><h2>Clear access. Clear expectations.</h2><p>The current free tools will stay free. Paid plans would add saved online work and collaboration after secure accounts, access controls and billing are ready.</p><p>Final prices, teacher seats, learner limits, resource permissions, support, renewal and cancellation terms will be shown before any purchase. Paid books, worksheet packs and school curriculum licences are separate unless a final offer explicitly includes them.</p></section>
    <aside className="bee-membership-callout"><div><h2>Try E² Mini LMS today</h2><p>The free pilot saves teaching records on this browser and exchanges learner task files manually. Online accounts and shared team workspaces are not active yet.</p></div><Link className="btn-secondary" to="/e2-mini">Try the free workspace →</Link></aside>
    <section className="mt-10" aria-labelledby="free-tools-heading"><h2 id="free-tools-heading" className="font-display text-3xl">Useful today. Free to try.</h2><div className="bee-free-grid">{membership.freeTools.map(tool => <article key={tool.title}><h3>{tool.title}</h3><p>{tool.description}</p>{tool.static ? <a className="bee-text-link" href={import.meta.env.BASE_URL + tool.href.slice(1)}>Open tool →</a> : <Link className="bee-text-link" to={tool.href}>{tool.cta || 'Play a round'} →</Link>}</article>)}</div></section>
    <p className="mt-8"><Link className="bee-text-link" to="/edu-hub">← Back to EduHub</Link></p>
  </div>
}
