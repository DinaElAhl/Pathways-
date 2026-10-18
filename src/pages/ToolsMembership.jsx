import { Link } from 'react-router-dom'
import { toolsMembership as membership } from '../data/toolsMembership.js'
import './spellingBee.css'

export default function ToolsMembership() {
  const contact = 'mailto:roots@pathwayslearn.com?subject=' + encodeURIComponent('Roots monthly teacher membership') + '&body=' + encodeURIComponent('Hello Roots,\n\nI am interested in the planned monthly teacher membership.\nThe tools I would find most useful are:\n\n')
  return <div className="container-page bee-page membership-page">
    <header className="bee-hero">
      <div><p className="bee-eyebrow">ROOTS · FOR TEACHERS</p><h1>Your tools.<br /><span>Room to grow.</span></h1><p>A monthly teacher membership is being planned. Explore the free tools now and tell Roots what would make a membership useful to you.</p></div>
      <img src={import.meta.env.BASE_URL + 'brand/roots-sprout.svg'} width="160" height="160" alt="Roots sprout" />
    </header>
    <aside className="bee-membership-callout"><div><h2>Try E² Mini LMS today</h2><p>The working pilot lets you organise teaching records on this browser and exchange learner task files manually.</p></div><Link className="btn-secondary" to="/e2-mini">Open the workspace →</Link></aside>
    <section className="bee-membership-offer" aria-labelledby="monthly-heading">
      <div><span className="bee-tag">MONTHLY OPTION · IN PLANNING</span><h2 id="monthly-heading">{membership.title}</h2><p className="bee-price">{membership.monthlyPrice == null ? 'Price to be confirmed' : `$${membership.monthlyPrice} / month`}</p><p>No subscription is being sold or charged today. Current free tools remain available.</p><button className="bee-button" disabled>Subscriptions not open yet</button><a className="bee-text-link" href={contact}>Tell Roots what you need →</a><p className="bee-small">Opens your email app. You choose whether to send; this does not subscribe you to a mailing list.</p></div>
      <div><h3>What the monthly option could add</h3>{membership.plannedBenefits.map(item => <article key={item.title}><h4>{item.title}</h4><p>{item.description}</p></article>)}<p className="bee-small">These are proposed benefits, not features included in an active purchase. Sign-in, paid access, billing and cancellation must be ready before launch. The final price, included tools and renewal terms will be shown before checkout.</p></div>
    </section>
    <section className="mt-10" aria-labelledby="free-tools-heading"><h2 id="free-tools-heading" className="font-display text-3xl">Useful today. Free to try.</h2><div className="bee-free-grid">{membership.freeTools.map(tool => <article key={tool.title}><h3>{tool.title}</h3><p>{tool.description}</p>{tool.static ? <a className="bee-text-link" href={import.meta.env.BASE_URL + tool.href.slice(1)}>Open tool →</a> : <Link className="bee-text-link" to={tool.href}>{tool.cta || 'Play a round'} →</Link>}</article>)}</div></section>
    <p className="mt-8"><Link className="bee-text-link" to="/edu-hub">← Back to EduHub</Link></p>
  </div>
}
