import * as React from 'react';
import { FullPageSpinner } from './components/lib';
import { useAuth } from './context/auth-context';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/navbar";
import {BottomBar} from "./components/bottom-bar/index.jsx";
import './app.scss';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

function App() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <div className="app">
        <Navbar />
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        {user && <BottomBar/>}
      </div>
      <ToastContainer />
    </React.Suspense>
  );
}

export default App;
