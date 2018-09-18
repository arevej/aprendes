import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logo from './img/logo.png';

function Header({ children }) {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} height="40px" alt="" />
      </Link>
      {children}
    </div>
  );
}

export default Header;
