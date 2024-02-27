import * as React from 'react';
import { FullPageSpinner } from './components/lib';
import { useAuth } from './context/auth-context';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

function App() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      <ToastContainer />
    </React.Suspense>
  );
}

export default App;
