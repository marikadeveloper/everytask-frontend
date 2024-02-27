import {useAuth} from "../../context/auth-context.jsx";
import {NavLink} from "react-router-dom";
import logo from "../../assets/everytask-logo.svg";
import {Avatar} from "../lib.jsx";
import './styles.scss';

function Navbar() {
	const {user} = useAuth();
	return (
		<nav className="navbar">
			<img src={logo} alt="logo"/>
			{user && (
				<>
					<div className="navbar__links">
						<ul>
							<li>
								<NavLink
									className={({isActive}) => isActive ? 'navbar__links__link navbar__links__link--active' : 'navbar__links__link'}
									to="/">Dashboard</NavLink>
							</li>
							<li>
								<NavLink
									className={({isActive}) => isActive ? 'navbar__links__link navbar__links__link--active' : 'navbar__links__link'}
									to="/tasks">Tasks</NavLink>
							</li>
							<li>
								<NavLink
									className={({isActive}) => isActive ? 'navbar__links__link navbar__links__link--active' : 'navbar__links__link'}
									to="/my-journey">My Journey</NavLink>
							</li>
						</ul>
					</div>
					<Avatar/>
				</>
			)}
		</nav>
	);
}

export default Navbar;