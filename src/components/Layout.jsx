import { Outlet, useLocation } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Seo from './Seo.jsx'

function PageFallback() {
  return (
    <div className="container-page py-24 flex justify-center" role="status" aria-label="Loading">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
    </div>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()

  // Scroll to top on route change — tiny but nice UX detail.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    // A lazy-loaded page can mount after the browser's initial anchor scroll.
    const scrollToSection = () => {
      const section = document.getElementById(hash.slice(1))
      if (!section) return false
      section.scrollIntoView({ block: 'start', behavior: 'auto' })
      return true
    }
    if (scrollToSection()) return
    const observer = new MutationObserver(() => {
      if (scrollToSection()) observer.disconnect()
    })
    observer.observe(document.getElementById('root'), { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col">
      <Seo pathname={pathname} />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
