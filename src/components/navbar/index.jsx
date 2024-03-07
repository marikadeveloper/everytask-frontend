import { NavLink } from 'react-router-dom';
import logo from '../../assets/everytask-logo.svg';
import { useAuth } from '../../context/auth-context.jsx';
import { Avatar } from '../lib.jsx';
import './styles.scss';

function Navbar() {
  const { user } = useAuth();
  return (
    <>
      {/** Desktop Navbar **/}
      <nav className='hidden sm:grid navbar'>
        <img
          src={logo}
          alt='the word everytask written'
        />
        {user && (
          <>
            <div>
              <ul className='navbar__links'>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'navbar__links__link navbar__links__link--active'
                        : 'navbar__links__link'
                    }
                    to='/'>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'navbar__links__link navbar__links__link--active'
                        : 'navbar__links__link'
                    }
                    to='/tasks'>
                    Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'navbar__links__link navbar__links__link--active'
                        : 'navbar__links__link'
                    }
                    to='/my-journey'>
                    My Journey
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className='navbar__user'>
              <Avatar />
            </div>
          </>
        )}
      </nav>
      {/** Mobile Navbar **/}
      <nav className='sm:hidden navbar'>
        <img
          src={logo}
          alt='logo'
        />
        {user && (
          <>
            <Avatar />
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
