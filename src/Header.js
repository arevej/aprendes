import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './Header.css';

import logo from './img/logo.png';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} height="70px" />
      </Link>
    </div>
  );
}

export default Header;
