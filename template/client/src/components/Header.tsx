import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-orange-600 text-white py-3 shadow-lg">
      <nav className="container mx-auto flex items-center justify justify-between px-4">
        <Link to="/" className="text-2xl font-bold">
          Gear Second
        </Link>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/protected"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Protected
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth/signin"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth/signup"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth/logout"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
