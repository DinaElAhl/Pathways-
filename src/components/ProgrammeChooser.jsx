import { Link } from 'react-router-dom'
import { rootsProgrammes } from '../data/rootsProgrammes.js'
import '../pages/rootsProgrammes.css'
export default function ProgrammeChooser(){return <section className="container-page programme-chooser" aria-labelledby="choose-programme"><p className="programme-eyebrow">ONE ROOTS COMMUNITY · TWO LEARNING PATHS</p><h2 id="choose-programme">Which Roots path is for you?</h2><div className="programme-grid">{Object.values(rootsProgrammes).map(p=><article key={p.route} className={'programme-card programme-'+p.colour}><h3>{p.label}</h3><p>{p.intro}</p><Link className="btn-primary" to={p.route}>Explore this programme →</Link></article>)}</div></section>}
