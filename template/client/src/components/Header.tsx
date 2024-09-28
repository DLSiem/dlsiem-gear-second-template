import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  signOut,
  selectAuthStatus,
  selectIsAuthenticated,
} from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(selectAuthStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const onClickLogout = () => {
    dispatch(signOut());
    navigate("/");
  };
  if (authStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <header className="bg-orange-600 text-white py-3 shadow-lg">
      <nav className="container mx-auto flex items-center justify justify-between px-4">
        <Link to="/" className="text-2xl font-bold">
          Gear Second
        </Link>
        <ul className="flex space-x-4">
          {isAuthenticated && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "underline" : "hover:underline"
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}
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
          {!isAuthenticated && (
            <>
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
            </>
          )}
          {isAuthenticated && (
            <li>
              <button onClick={onClickLogout} className="hover:underline">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
