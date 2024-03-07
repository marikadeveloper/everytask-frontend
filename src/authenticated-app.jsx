import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import {
  ErrorMessage,
  FullPageErrorFallback,
} from './components/errors/index.jsx';
import { DashboardScreen } from './screens/dashboard';
import { NotFoundScreen } from './screens/not-found';
import TasksScreen from './screens/tasks';

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
        path='/tasks'
        element={<TasksScreen />}
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
