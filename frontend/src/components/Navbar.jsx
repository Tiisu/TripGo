import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";

const Navbar = () => {
  const { user, logout } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="w-full flex justify-between items-center py-2 px-2 sm:p-6 sm:px-20 top-0 sticky z-50">
      <Link to="/">
        <img
          src="/logoTravel.png"
          className="w-[140px] sm:w-[180px] md:w-[200px]"
          alt="logo"
        />
      </Link>

      {/* Flex container for small screens */}
      <div className="flex items-center gap-4 sm:hidden">
        {user && (
          <div className="relative group">
            <img
              src={assets.user}
              alt="profileimg"
              className="w-10 drop-shadow"
            />
            {/* Tooltip with the user's name on hover */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 p-2 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Hi,{user.name}
            </div>
          </div>
        )}

        {/* Hamburger icon for mobile */}
        <button onClick={toggleMenu} className="text-2xl">
          {menuOpen ? (
            <X className="text-black" />
          ) : (
            <Menu className="text-black" />
          )}
        </button>
      </div>

      {/* Menu for desktop */}
      <div className="hidden sm:flex items-center gap-6">
        <ul className="flex gap-6">
          <li>
            <Link
              to="/"
              className={`hover:text-blue-500 ${
                location.pathname === "/" ? "text-blue-500 font-bold" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`hover:text-blue-500 ${
                location.pathname === "/about" ? "text-blue-500 font-bold" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/tours"
              className={`hover:text-blue-500 ${
                location.pathname === "/tours" ? "text-blue-500 font-bold" : ""
              }`}
            >
              Tours
            </Link>
          </li>
        </ul>
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/my-bookings"
              className={`hover:text-blue-500 ${
                location.pathname === "/my-bookings" ? "text-blue-500 font-bold" : ""
              }`}
            >
              My Bookings
            </Link>
            <div className="relative group">
              <img src={assets.user} alt="profile" width={40} />
              {/* Tooltip for user name */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 p-2 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Hi,{user.name}
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gradient-to-b from-sky-500 to-blue-500 text-white rounded hover:from-sky-800 hover:to-blue-700 "
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 bg-gradient-to-b from-sky-500 to-blue-500 text-white rounded hover:from-sky-800 hover:to-blue-700 ">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-sky-100/90 p-4">
          <ul className="flex flex-col items-center gap-4">
            <li>
              <Link
                to="/"
                className={`hover:text-blue-500 ${
                  location.pathname === "/" ? "text-blue-500 font-bold" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`hover:text-blue-500 ${
                  location.pathname === "/about"
                    ? "text-blue-500 font-bold"
                    : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/tours"
                className={`hover:text-blue-500 ${
                  location.pathname === "/tours"
                    ? "text-blue-500 font-bold"
                    : ""
                }`}
                onClick={() => scrollTo(0, 0) && setMenuOpen(false)}
              >
                Tours
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    to="/my-bookings"
                    className={`hover:text-blue-500 ${
                      location.pathname === "/my-bookings"
                        ? "text-blue-500 font-bold"
                        : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-gradient-to-b from-sky-500 to-blue-500 text-white rounded hover:from-sky-800 hover:to-blue-700"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 bg-gradient-to-b from-sky-500 to-blue-500 text-white rounded hover:from-sky-800 hover:to-blue-700"
                  >
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
