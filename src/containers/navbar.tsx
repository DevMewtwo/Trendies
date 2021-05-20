import React from 'react';
import Login from '../components/login';
import Signup from '../components/signup';
import Logo from '../rocket-launch.svg';

import '../App.css';

function Navbar() {
    return (
      <div id ='navbar'>
        <div id='titleLogo'>
          <img src={Logo}/>
        </div>
        <div id='titleName'>
          TRENDIE$
        </div>
        <div id="signup-login">
          <div id='Signup'>
            <Signup />
          </div>
          <div id='Login'>
            <Login />
          </div>
        </div>
      </div>
    )
}

export default Navbar;