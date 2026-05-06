import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { MessagingProvider } from './context/MessagingContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <MessagingProvider>
            <AppRoutes />
          </MessagingProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;