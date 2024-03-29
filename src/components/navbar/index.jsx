import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import Logo from "../logo";
import UserDropdownMenu from "../user-dropdown-menu";
import "./styles.scss";

function LogoWithLink() {
  return (
    <Link to="/">
      <Logo />
    </Link>
  );
}

function Navbar() {
  const { user } = useAuth();
  return (
    <>
      {/** Desktop Navbar * */}
      <nav className="hidden sm:grid navbar">
        <LogoWithLink />
        {user && (
          <>
            <div>
              <ul className="navbar__links">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "navbar__links__link navbar__links__link--active"
                        : "navbar__links__link"
                    }
                    to="/"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "navbar__links__link navbar__links__link--active"
                        : "navbar__links__link"
                    }
                    to="/tasks"
                  >
                    Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "navbar__links__link navbar__links__link--active"
                        : "navbar__links__link"
                    }
                    to="/my-journey"
                  >
                    My Journey
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="navbar__user">
              <UserDropdownMenu />
            </div>
          </>
        )}
      </nav>
      {/** Mobile Navbar * */}
      <nav className="sm:hidden navbar">
        <LogoWithLink />
        <div />
        {user && (
          <div className="navbar__user">
            <UserDropdownMenu />
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
