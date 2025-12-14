import React from 'react'
// Mock server runs on http://localhost:3001
// Start it with: npm run mock
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import store from './store'

// Server-side mock is available via json-server at http://localhost:3001
// Start it with: `npm run mock` (or `npm run mock:dev` to run both dev + mock)

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

createRoot(rootEl).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
