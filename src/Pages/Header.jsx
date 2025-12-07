import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Components/UserContext";

const MoonIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const SunIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const Header = (props) => {
  const { userName, isLoggedIn, logout } = useContext(UserContext);

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with welcome message and auth */}
        <div className="flex items-center justify-between h-16">
          {/* Welcome message */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {isLoggedIn ? (
              <span>
                Welcome,{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {userName}
                </span>
              </span>
            ) : (
              <span>Welcome, please log in</span>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={props.toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {props.darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Auth button */}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Log out
              </button>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg transition-colors">
                  Log in
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Blog title and navigation */}
        <div className="py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
            Niloo's Blog
          </h1>

          <nav className="flex items-center justify-center gap-8">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;