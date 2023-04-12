import React from 'react';

import googlesvg from '../google.svg';
const Login = () => {
  const handleGoogle = () => {
    window.open(`${import.meta.env.SERVER_URL}/auth/google`, '_self');
  };

  return (
    <main className="login-container">
      <div className="google-login">
        <img className="google-svg" src={googlesvg} alt="Google Logo" />
        <button className="google-signin-btn" onClick={handleGoogle}>
          Sign in
        </button>
      </div>
    </main>
  );
};

export default Login;
