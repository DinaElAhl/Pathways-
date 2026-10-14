import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import './index.css'

// Recover once if an open tab requests a lazy chunk from an older deployment.
window.addEventListener('vite:preloadError', event => {
  try {
    const lastRetry = Number(sessionStorage.getItem('roots-chunk-retry') || 0)
    if (Date.now() - lastRetry < 60000) return
    sessionStorage.setItem('roots-chunk-retry', String(Date.now()))
    event.preventDefault()
    window.location.reload()
  } catch {
    // Keep the original error if storage is unavailable; avoid a reload loop.
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
    {/* Vercel Web Analytics: cookieless page views. Only reports on Vercel deployments. */}
    <Analytics />
  </React.StrictMode>,
)
