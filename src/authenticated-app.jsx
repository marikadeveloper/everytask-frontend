import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import { ErrorMessage, FullPageErrorFallback } from "./components/errors/index";
import CategoriesScreen from "./screens/categories";
import DashboardScreen from "./screens/dashboard";
import { NotFoundScreen } from "./screens/not-found";
import ProfileScreen from "./screens/profile";
import TasksScreen from "./screens/tasks";
import TaskScreen from "./screens/task";

function AuthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div>
        <main id="main-content">
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
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/tasks" element={<TasksScreen />} />
      <Route path="/tasks/:taskId" element={<TaskScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/categories" element={<CategoriesScreen />} />

      <Route path="/" element={<DashboardScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default AuthenticatedApp;
