import React from 'react';
import '../App.css';

const Login = () => {
  const LoginClick = () => {
    return "heyHEY"
  }

  return (
    <div>
      <button id="loginButton" onClick={LoginClick}>Login</button>
    </div>
  )
};

export default Login;