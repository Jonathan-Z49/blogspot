import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-link navbar-logo">
          <Link to="/">Blogspot</Link>
        </li>
        <li className="navbar-link">
          <Link to="/posts">Blogs</Link>
        </li>
        <li className="navbar-link">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="navbar-link">
          <Link to="/login">Sign in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
