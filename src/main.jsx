import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Pages are pre-rendered at build time (scripts/prerender.mjs) so crawlers and
// AI assistants get the full content without running JavaScript. The client
// renders the app fresh over that markup rather than hydrating it: hydration
// reported mismatches on every route, so a clean client render is used instead.
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
