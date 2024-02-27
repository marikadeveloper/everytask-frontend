import {ErrorBoundary} from 'react-error-boundary';
import {Route, Link as RouterLink, Routes, useMatch} from 'react-router-dom';
import {Button, ErrorMessage, FullPageErrorFallback} from './components/lib';
import {useAuth} from './context/auth-context';
import {DashboardScreen} from './screens/dashboard';
import {NotFoundScreen} from './screens/not-found';
import PropTypes from 'prop-types';

function ErrorFallback({error}) {
	return <ErrorMessage error={error}/>;
}

ErrorFallback.propTypes = {
	error: PropTypes.object.isRequired,
}

function AuthenticatedApp() {
	const {user, logout} = useAuth();
	return (
		<ErrorBoundary FallbackComponent={FullPageErrorFallback}>
			<div>
				{user.email}
				<Button
					variant='secondary'
					onClick={logout}>
					Logout
				</Button>
			</div>
			<div>
				<div>
					<Nav/>
				</div>
				<main>
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<AppRoutes/>
					</ErrorBoundary>
				</main>
			</div>
		</ErrorBoundary>
	);
}

function NavLink(props) {
	const match = useMatch(props.to);
	const activeClass = match ? 'active' : '';
	return <RouterLink className={activeClass} {...props} />;
}

NavLink.propTypes = {
	to: PropTypes.string.isRequired,
}

function Nav() {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to='/dashboard'>Dashboard</NavLink>
				</li>
				<li>
					<NavLink to='/tasks'>Tasks</NavLink>
				</li>
				<li>
					<NavLink to='/my-journey'>My Journey</NavLink>
				</li>
			</ul>
		</nav>
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
