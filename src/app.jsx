import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import { BottomBar } from './components/bottom-bar/index.jsx';
import Navbar from './components/navbar';
import { FullPageSpinner } from './components/spinner/index.jsx';
import { useAuth } from './context/auth-context.jsx';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

function App() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <div className='app'>
        <Navbar />
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        {user && <BottomBar />}
      </div>
      <ToastContainer />
    </React.Suspense>
  );
}

export default App;
