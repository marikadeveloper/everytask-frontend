import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { ErrorMessage, FullPageErrorFallback } from './components/lib';
import { ForgotPasswordScreen } from './screens/forgot-password';
import { LoginScreen } from './screens/login/index.jsx';
import { NotFoundScreen } from './screens/not-found.jsx';
import { RegisterScreen } from './screens/register';
import PropTypes from 'prop-types';
import {ResetPasswordScreen} from "./screens/reset-password.jsx";

function ErrorFallback({ error }) {
  return <ErrorMessage error={error} />;
}
ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
}

function UnauthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <main>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
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
