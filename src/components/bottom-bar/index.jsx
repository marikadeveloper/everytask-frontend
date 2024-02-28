import {NavLink} from "react-router-dom";
import './styles.scss';

function BottomBar() {
	return <nav className="bottom-bar">
		<div className="bottom-bar__links">
			<ul>
				<li>
					<NavLink
						className={({isActive}) => isActive ? 'bottom-bar__links__link bottom-bar__links__link--active' : 'bottom-bar__links__link'}
						to="/">Dashboard</NavLink>
				</li>
				<li>
					<NavLink
						className={({isActive}) => isActive ? 'bottom-bar__links__link bottom-bar__links__link--active' : 'bottom-bar__links__link'}
						to="/tasks">Tasks</NavLink>
				</li>
				<li>
					<NavLink
						className={({isActive}) => isActive ? 'bottom-bar__links__link bottom-bar__links__link--active' : 'bottom-bar__links__link'}
						to="/my-journey">My Journey</NavLink>
				</li>
			</ul>
		</div>
	</nav>
}

export {BottomBar};