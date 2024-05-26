import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Components/UserContext";
import MoonIcon from "../assets/MoonIcon.jsx";
import SunIcon from "../assets/SunIcon.jsx";

const Header = (props) => {
  const { userName, isLoggedIn, logout } = useContext(UserContext);

  return (
    <div className="header-container">
      <div className="grid grid-cols-3 mx-2 my-2 lg:mx-14 lg:my-6 items-center text-center">
        <div className="font-bold items-center text-center w-40 h-40">
          <h2>Welcome, {userName ? userName : "please log in"}!</h2>
        </div>

        <div className="flex justify-self-end">
          <button onClick={props.toggleDarkMode}>
            {props.darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div>
          {isLoggedIn ? (
            <button className="login-logout-button" onClick={logout}>
              Log out
            </button>
          ) : (
            <Link to="/login">
              <button className="login-logout-button">Log in / Register</button>
            </Link>
          )}
        </div>

        <div className="my-header">
          <div className="header">Welcome to Niloo's Blog</div>
          <nav className="myNav">
            <Link to="/login">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact us</Link>
          </nav>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
