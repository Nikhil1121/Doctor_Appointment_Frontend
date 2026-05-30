import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-36 sm:w-44 cursor-pointer"
        src={assets.logo}
        alt="Prescripto"
      />

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={userData.image}
              alt=""
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block text-sm"
          >
            Create account
          </button>
        )}

        {/* Mobile Hamburger */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />

        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed inset-0" : "h-0 w-0 overflow-hidden"
          } md:hidden z-20 bg-white transition-all duration-300`}
        >
          <div className="flex items-center justify-between px-5 py-6 border-b">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 text-lg font-medium">
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/"
              className="w-full text-center"
            >
              <p className="px-4 py-3 hover:bg-gray-50 rounded">Home</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/doctors"
              className="w-full text-center"
            >
              <p className="px-4 py-3 hover:bg-gray-50 rounded">All Doctors</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/about"
              className="w-full text-center"
            >
              <p className="px-4 py-3 hover:bg-gray-50 rounded">About</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/contact"
              className="w-full text-center"
            >
              <p className="px-4 py-3 hover:bg-gray-50 rounded">Contact</p>
            </NavLink>
            {!token && (
              <div
                onClick={() => {
                  setShowMenu(false);
                  navigate("/login");
                }}
                className="w-full text-center"
              >
                <p className="px-4 py-3 bg-primary text-white rounded-full mx-6 mt-4">
                  Create Account
                </p>
              </div>
            )}
            {token && (
              <>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to="/my-profile"
                  className="w-full text-center"
                >
                  <p className="px-4 py-3 hover:bg-gray-50 rounded">
                    My Profile
                  </p>
                </NavLink>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to="/my-appointments"
                  className="w-full text-center"
                >
                  <p className="px-4 py-3 hover:bg-gray-50 rounded">
                    My Appointments
                  </p>
                </NavLink>
                <div
                  onClick={() => {
                    setShowMenu(false);
                    logout();
                  }}
                  className="w-full text-center"
                >
                  <p className="px-4 py-3 text-red-500 hover:bg-red-50 rounded cursor-pointer">
                    Logout
                  </p>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
