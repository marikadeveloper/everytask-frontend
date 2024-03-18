import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import {
  ErrorMessage,
  FullPageErrorFallback,
} from './components/errors/index.jsx';
import { DashboardScreen } from './screens/dashboard';
import { NotFoundScreen } from './screens/not-found';
import ProfileScreen from './screens/profile'; // Import ProfileScreen

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

      <Route
        path='/profile'
        element={<ProfileScreen />} // Add the ProfileScreen route
      />

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
