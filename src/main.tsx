import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializePortfolio } from './lib/initPortfolio'

// Initialize portfolio with images and videos from public folder
// This only runs if the portfolio is empty
// Run after DOM is ready to ensure localStorage is available
if (typeof window !== 'undefined') {
  // Use setTimeout to ensure it runs after React is initialized
  setTimeout(() => {
    try {
      initializePortfolio();
    } catch (error) {
      // Silently handle initialization errors in development
      const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      if (isDev) {
        console.error('Portfolio initialization error:', error);
      }
    }
  }, 0);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

