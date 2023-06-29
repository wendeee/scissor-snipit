import React from "react";
import { Link } from "react-router-dom";
import "../Custom.css";

const NavBar = ({ isLoggedIn }) => {
  //conditionally render the navbar
  const navBarClassName = isLoggedIn ? "navbar navbar-logged-in" : "navbar";
  return (
    <nav>
      <div
        className={` ${navBarClassName} shadow-md fixed top-0 left-0 `}
        id="navbar"
      >
        <div className="navbar-logo-container">
          <h3 className="navbar-logo-txt text-2xl font-bold">
            <Link to="/">
              <span className="span-text">sni</span>pit.io
            </Link>
          </h3>
        </div>
        <ul className="menu-items flex list-none">
          {!isLoggedIn && (
            <li className="">
              <Link to="/about">ABOUT</Link>
            </li>
          )}
          <li>
            <Link to="/blog">BLOG</Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/login">LOG IN</Link>
            </li>
          )}
          {/* <li className="">
            <Link to="/about">ABOUT</Link>
          </li> */}

          {/* <li>
            <Link to="/blog">BLOG</Link>
          </li> */}
          {/* <li>
            <Link to="/login">LOG IN</Link>
          </li> */}
          {!isLoggedIn && (
            <li className="primary-cta">
              <Link to="/signup">GET STARTED</Link>
            </li>
          )}
          {/* <li className="primary-cta">
            <Link to="/signup">GET STARTED</Link>
          </li> */}
          {isLoggedIn && (
            <li>
              <Link to="/">LOG OUT</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
