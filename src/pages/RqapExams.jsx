import AssessmentDevelopment from '../components/AssessmentDevelopment.jsx'
import { Link } from 'react-router-dom'
import { rqapExams } from '../data/rqapExams.js'

export default function RqapExams() {
  return <main className="container-page py-12 sm:py-16">
    <header className="max-w-3xl mb-10"><p className="text-brand-700 font-semibold">Roots assessments · تقييمات جذور</p><h1 className="text-4xl font-display font-extrabold text-brand-900 mt-3">RQAP Exams</h1><p lang="ar" dir="rtl" className="text-2xl text-brand-800 mt-3 text-left">تقييم اللغة العربية والعربية القرآنية والتجويد</p><p className="mt-5 text-slate-700">Choose by language background: Exam 1 is for non-native Arabic speakers; Exam 2 is for native Arabic speakers studying Qur’anic Arabic and Tajweed.</p></header>
    <div className="grid md:grid-cols-2 gap-6">{rqapExams.map(exam => <article key={exam.label} className={"rounded-3xl p-7 sm:p-9 " + exam.color}><p className="text-sm font-bold text-brand-800">{exam.label}</p><h2 className="text-2xl font-display font-extrabold text-brand-900 mt-3">{exam.title}</h2><p lang="ar" dir="rtl" className="mt-3 text-xl text-brand-800 text-left">{exam.arabic}</p><p className="mt-5 text-slate-700 leading-relaxed">{exam.description}</p><div className="mt-7">{exam.href ? <a className="btn-primary" href={import.meta.env.BASE_URL + exam.href}>{exam.cta}</a> : <Link className="btn-primary" to={exam.to}>{exam.cta}</Link>}</div></article>)}</div>
    <p className="mt-8 max-w-3xl text-sm text-slate-600">Accreditation coming soon — planned, with no confirmed approval date. These are currently pilot assessments, not externally accredited qualifications. Written Tajweed questions do not replace an assessment of recitation with a qualified teacher. <Link className="underline text-brand-700" to="/exam/methodology">Read the assessment methodology →</Link></p>
    <AssessmentDevelopment />
  </main>
}
