import React from 'react';
import Login from '../components/login';
import Signup from '../components/signup';
import '../App.css';

function Navbar() {
    return (
      <div id ='navbar'>
        <div id='titleLogo'>
          LOGO TBD
        </div>
        <div id='titleName'>
          NAME TBD
        </div>
        <div id='Signup'>
          <Signup />
        </div>
        <div id='Login'>
          <Login />
        </div>
      </div>
    )
}

export default Navbar;