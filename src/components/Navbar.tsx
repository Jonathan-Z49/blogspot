import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

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
        {user.logged_in ? (
          <li className="navbar-link">
            <Link to="/profile">
              <img src={user.photo} className="navbar-profile-logo" alt="User logo" />
            </Link>
          </li>
        ) : (
          <li className="navbar-link">
            <Link to="/login">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
