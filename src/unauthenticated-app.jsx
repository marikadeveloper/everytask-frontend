import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import {
  ErrorMessage,
  FullPageErrorFallback,
} from './components/errors/index.jsx';
import ForgotPasswordScreen from './screens/forgot-password';
import LoginScreen from './screens/login';
import { NotFoundScreen } from './screens/not-found.jsx';
import RegisterScreen from './screens/register';
import ResetPasswordScreen from './screens/reset-password';

function UnauthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <main>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <UnauthenticatedRoutes />
        </ErrorBoundary>
      </main>
    </ErrorBoundary>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={<LoginScreen />}
      />
      <Route
        path='/register'
        element={<RegisterScreen />}
      />
      <Route
        path='/forgot-password'
        element={<ForgotPasswordScreen />}
      />
      <Route
        path='/reset-password'
        element={<ResetPasswordScreen />}
      />
      <Route
        path='*'
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default UnauthenticatedApp;
