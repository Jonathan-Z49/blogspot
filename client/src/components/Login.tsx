import React from 'react';

import googlesvg from '../google.svg';
const Login = () => {
  const handleGoogle = () => {
    window.open(
      'https://blog-server-production-82ec.up.railway.app:5000/auth/google',
      '_self',
    );
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
