import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter } from "react-router-dom"

// ─── Schema Version Guard ──────────────────────────────────────────────────
// Bump this whenever localStorage data shape changes. Clears stale cached data.
const DATA_VERSION = '3';
if (localStorage.getItem('cc_data_version') !== DATA_VERSION) {
  const keysToWipe = ['cc_users', 'cc_stores', 'cc_products', 'cc_jobs', 'cc_events', 'cc_conversations', 'cc_current_user'];
  keysToWipe.forEach(k => localStorage.removeItem(k));
  localStorage.setItem('cc_data_version', DATA_VERSION);
  console.info('[CampusConnect] localStorage reset to schema v' + DATA_VERSION);
}
// ──────────────────────────────────────────────────────────────────────────

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
