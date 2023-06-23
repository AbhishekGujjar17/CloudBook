import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  AUTH_REDUCER_ACTION_TYPE,
  THEME_REDUCER_ACTION_TYPE,
} from "../types/enum";
import { useTheme } from "../context/themeContext";
import { GrSun } from "react-icons/gr";
import { BsMoonFill } from "react-icons/bs";
import { useEffect } from "react";

const Navbar = () => {
  const { theme, dispatchTheme } = useTheme();
  const { auth, dispatch } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = localStorage.getItem("mode")!;
  });

  const handleThemeToggle = () => {
    dispatchTheme({
      type: THEME_REDUCER_ACTION_TYPE.TOGGLE_THEME,
    });
  };

  const handleClick = () => {
    dispatch({
      type: AUTH_REDUCER_ACTION_TYPE.LOGOUT,
    });
    navigate("/login");
  };
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CloudBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/preview" ? "active" : ""
                }`}
                to="/preview"
              >
                Preview
              </Link>
            </li>
            <li
              style={{ marginLeft: "400px" }}
              className="nav-item ml-auto d-flex align-items-center"
            >
              <button>
                {theme.mode === "white" ? (
                  <BsMoonFill onClick={handleThemeToggle} />
                ) : (
                  <GrSun onClick={handleThemeToggle} />
                )}
              </button>
            </li>
          </ul>
          {!auth.isLoggedIn ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={handleClick}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
