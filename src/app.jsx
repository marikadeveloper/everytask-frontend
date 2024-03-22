import * as React from "react";
import { Toaster } from "react-hot-toast";
import BottomBar from "./components/bottom-bar";
import Navbar from "./components/navbar";
import { FullPageSpinner } from "./components/spinner/index";
import { useAuth } from "./context/auth-context";
import "./app.scss";

const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <div className="app">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        {user && <BottomBar />}
      </div>
      <Toaster position="top-right" />
    </React.Suspense>
  );
}

export default App;
