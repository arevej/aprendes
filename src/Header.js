import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logo from './img/logo.png';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} height="70px" alt="" />
      </Link>
    </div>
  );
}

export default Header;
