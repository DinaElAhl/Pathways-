import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Pathways from './pages/Pathways.jsx'
import PathwayDetail from './pages/PathwayDetail.jsx'
import AudiencePage from './pages/AudiencePage.jsx'
import Resources from './pages/Resources.jsx'
import ResourceDetail from './pages/ResourceDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pathways" element={<Pathways />} />
        <Route path="/pathways/:slug" element={<PathwayDetail />} />
        <Route path="/for/:slug" element={<AudiencePage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:slug" element={<ResourceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
