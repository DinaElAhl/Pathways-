import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Pathways from './pages/Pathways.jsx'
import PathwayDetail from './pages/PathwayDetail.jsx'
import AudiencePage from './pages/AudiencePage.jsx'
import Resources from './pages/Resources.jsx'
import ResourceDetail from './pages/ResourceDetail.jsx'
import Events from './pages/Events.jsx'
import EventDetail from './pages/EventDetail.jsx'
import ApplyEducator from './pages/ApplyEducator.jsx'
import ApplyPartner from './pages/ApplyPartner.jsx'
import FAQ from './pages/FAQ.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import AIRecommender from './pages/AIRecommender.jsx'
import LMS from './pages/LMS.jsx'
import Pricing from './pages/Pricing.jsx'
import LMSAudience from './pages/LMSAudience.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AIStudio from './pages/AIStudio.jsx'
import Join from './pages/Join.jsx'

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
