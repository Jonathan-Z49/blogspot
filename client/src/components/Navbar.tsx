import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { initUser, UserContext } from '../contexts/UserContext';
import { userLogout } from '../utils/api';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleClickLogout = async () => {
    const statusObj = (await userLogout()) as { status: string };
    if (statusObj.status == 'Logged out') {
      setUser(initUser);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-link navbar-logo">
          <Link to="/">Blogspot</Link>
        </li>
        <li className="navbar-link">
          <Link to="/">Blogs</Link>
        </li>
        {user.logged_in ? (
          <>
            <li className="navbar-link">
              <button className="navbar-logout-btn" onClick={handleClickLogout}>
                Logout
              </button>
            </li>
            <li className="navbar-link">
              <img
                src={user.photo}
                className="navbar-profile-logo"
                referrerPolicy="no-referrer"
                alt="User logo"
              />
            </li>
          </>
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
