import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { MessagingProvider } from './context/MessagingContext';

// ─── Global Error Boundary ────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('[CampusConnect ErrorBoundary]', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Inter, sans-serif', background: '#F7FAFC', padding: '2rem', textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ color: '#2D3748', marginBottom: '0.5rem' }}>Something went wrong</h2>
          <p style={{ color: '#718096', maxWidth: '400px', marginBottom: '1.5rem' }}>
            The app encountered an unexpected error. Try clearing your browser cache and reloading.
          </p>
          <pre style={{
            background: '#EDF2F7', padding: '1rem', borderRadius: '8px',
            fontSize: '0.75rem', color: '#E53E3E', textAlign: 'left',
            maxWidth: '600px', overflowX: 'auto', marginBottom: '1.5rem'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{
              background: '#2F855A', color: '#fff', border: 'none', borderRadius: '999px',
              padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem'
            }}
          >
            Clear Cache &amp; Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
// ─────────────────────────────────────────────────────────────────────────

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <MessagingProvider>
              <AppRoutes />
            </MessagingProvider>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;