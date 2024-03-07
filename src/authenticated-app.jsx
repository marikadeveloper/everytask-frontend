import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import {
  ErrorMessage,
  FullPageErrorFallback,
} from './components/errors/index.jsx';
import { DashboardScreen } from './screens/dashboard';
import { NotFoundScreen } from './screens/not-found';

function AuthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div>
        <main>
          <ErrorBoundary FallbackComponent={ErrorMessage}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/dashboard'
        element={<DashboardScreen />}
      />

      {/* 
        🤔 Alberto: 1. 
        - aggiungi una Route con path '/profile' ed element '<ProfileScreen />'
        - importa ProfileScreen da './screens/profile'
        - per la pt. 2 vedi il file src/screens/profile/index.jsx
      */}

      <Route
        path='/'
        element={<DashboardScreen />}
      />
      <Route
        path='*'
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default AuthenticatedApp;
