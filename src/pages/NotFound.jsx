import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-700">
        404
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
        This path goes nowhere.
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-slate-600">
        The page you're looking for doesn't exist — or it took a different pathway.
        Let's get you back on track.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link to="/" className="btn-primary px-6 py-3">
          Back to home
        </Link>
        <Link to="/pathways" className="btn-secondary px-6 py-3">
          Browse pathways
        </Link>
      </div>
    </section>
  )
}
