import React from 'react';
import '../App.css';

const Signup = () => {
  const SignupClick = () => {
    console.log('heyHEY');
  }

  return (
    <div>
      <button id="signupButton" onClick={SignupClick}>Signup</button>
    </div>
  )
};

export default Signup;