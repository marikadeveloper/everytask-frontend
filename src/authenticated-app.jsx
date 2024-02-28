import {ErrorBoundary} from 'react-error-boundary';
import {Route, Routes} from 'react-router-dom';
import {ErrorMessage, FullPageErrorFallback} from './components/lib';
import {DashboardScreen} from './screens/dashboard';
import {NotFoundScreen} from './screens/not-found';
import PropTypes from 'prop-types';
import {BottomBar} from "./components/bottom-bar/index.jsx";

function ErrorFallback({error}) {
	return <ErrorMessage error={error}/>;
}

ErrorFallback.propTypes = {
	error: PropTypes.object.isRequired,
}

function AuthenticatedApp() {
	return (
		<ErrorBoundary FallbackComponent={FullPageErrorFallback}>
			<div>
				<main>
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<AppRoutes/>
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
				element={<DashboardScreen/>}
			/>
			{/* <Route
        path='/tasks'
        element={<TasksScreen />}
      <Route
        path='/tasks/:taskId'
        element={<TaskScreen />}
        />
      <Route
        path='/my-journey'
        element={<MyJourneyScreen />} */}
			<Route
				path='/'
				element={<DashboardScreen/>}
			/>
			<Route
				path='*'
				element={<NotFoundScreen/>}
			/>
		</Routes>
	);
}

export default AuthenticatedApp;
