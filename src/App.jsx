import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'

// Lazy-load every route except the landing page so visitors download
// only the chunk for the page they actually open. The Suspense boundary
// lives around <Outlet /> in Layout.jsx.
const Pathways = lazy(() => import('./pages/Pathways.jsx'))
const PathwayDetail = lazy(() => import('./pages/PathwayDetail.jsx'))
const AudiencePage = lazy(() => import('./pages/AudiencePage.jsx'))
const Resources = lazy(() => import('./pages/Resources.jsx'))
const ResourceDetail = lazy(() => import('./pages/ResourceDetail.jsx'))
const Events = lazy(() => import('./pages/Events.jsx'))
const EventDetail = lazy(() => import('./pages/EventDetail.jsx'))
const ApplyEducator = lazy(() => import('./pages/ApplyEducator.jsx'))
const ApplyPartner = lazy(() => import('./pages/ApplyPartner.jsx'))
const FAQ = lazy(() => import('./pages/FAQ.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const AIRecommender = lazy(() => import('./pages/AIRecommender.jsx'))
const LMS = lazy(() => import('./pages/LMS.jsx'))
const Pricing = lazy(() => import('./pages/Pricing.jsx'))
const LMSAudience = lazy(() => import('./pages/LMSAudience.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const AIStudio = lazy(() => import('./pages/AIStudio.jsx'))
const Join = lazy(() => import('./pages/Join.jsx'))
const PartnerPicks = lazy(() => import('./pages/PartnerPicks.jsx'))
const RootsOfKnowledge = lazy(() => import('./pages/RootsOfKnowledge.jsx'))
const RootsNames = lazy(() => import('./pages/RootsNames.jsx'))
const RootDiscipline = lazy(() => import('./pages/RootDiscipline.jsx'))
const Tools = lazy(() => import('./pages/Tools.jsx'))
const E2TeachingTool = lazy(() => import('./pages/E2TeachingTool.jsx'))
const EduHub = lazy(() => import('./pages/EduHub'))
const AccreditedExams = lazy(() => import('./pages/AccreditedExams.jsx'))
const QuranExams = lazy(() => import('./pages/QuranExams.jsx'))
const PathwaysExam = lazy(() => import('./pages/PathwaysExam.jsx'))
const ExamDashboard = lazy(() => import('./pages/ExamDashboard.jsx'))
const Shop = lazy(() => import('./pages/Shop.jsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pathways" element={<Pathways />} />
        <Route path="/pathways/:slug" element={<PathwayDetail />} />
        <Route path="/recommend" element={<AIRecommender />} />
        <Route path="/lms" element={<LMS />} />
        <Route path="/lms/:slug" element={<LMSAudience />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-studio" element={<AIStudio />} />
        <Route path="/join" element={<Join />} />
        <Route path="/partners" element={<PartnerPicks />} />
        <Route path="/roots" element={<RootsOfKnowledge />} />
        <Route path="/roots/names" element={<RootsNames />} />
        <Route path="/roots/:slug" element={<RootDiscipline />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/e2-teaching" element={<E2TeachingTool />} />
        <Route path="/edu-hub" element={<EduHub />} />
        <Route path="/for/:slug" element={<AudiencePage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:slug" element={<ResourceDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/apply/educator" element={<ApplyEducator />} />
        <Route path="/apply/partner" element={<ApplyPartner />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/accredited-exams" element={<AccreditedExams />} />
        <Route path="/quran-exams" element={<QuranExams />} />
        <Route path="/pathways-exam" element={<PathwaysExam />} />
        <Route path="/exam-dashboard" element={<ExamDashboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
