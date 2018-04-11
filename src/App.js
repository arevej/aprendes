import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Grammar from './Grammar';
import Vocabulary from './Vocabulary';
import Listening from './Listening';
import Course from './Course';
import Button from './Buttons';

import logo from './img/logo.png';
import cover from './img/cover.png';
import list from './img/list.png';
import gram from './img/gram.png';
import voc from './img/voc.png';

import './App.css';

function Container({ children }) {
  return <div className="container">{children}</div>;
}

function Logo({}) {
  return (
    <div
      style={{
        backgroundImage: `url(${cover})`,
      }}
      className="cover"
    >
      <Link to="/">
        <img src={logo} height="100px" className="logo" />
      </Link>
    </div>
  );
}

function Menu({ sections }) {
  return (
    <div className="menu">
      {sections.map(section => (
        <Link to={section.url} className="section">
          {section.name}
        </Link>
      ))}
    </div>
  );
}

function MainPage() {
  return (
    <div className="main">
      <Logo />
      <Link
        to="/course"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '-85px',
        }}
      >
        <Button title="Learn Spanish" onclick={() => {}} round />
      </Link>
      <Container>
        <div className="main-description">
          <h3>AprendES can help you to:</h3>
          <div className="main-description-section">
            <img src={gram} className="main-description-section-icon" />
            <span className="main-description-section-text">
              Understand, practice and start to use Spanish{' '}
              <strong>grammar</strong> freely.
            </span>
          </div>
          <div className="main-description-section">
            <img src={voc} className="main-description-section-icon" />
            <span className="main-description-section-text">
              Grow your Spanish <strong>vocabulary</strong>.
            </span>
          </div>
          <div className="main-description-section">
            <img src={list} className="main-description-section-icon" />
            <span className="main-description-section-text">
              Make your <strong>listening</strong> of Spanish more easier.
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <Container>
        <p className="footer-text">by Tim Kholod</p>
      </Container>
    </div>
  );
}

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route path="/" exact component={MainPage} />

          <Route path="/grammar" component={Grammar} />
          <Route path="/vocabulary" component={Vocabulary} />
          <Route path="/listening" component={Listening} />
          <Route path="/course" component={Course} />

          <Menu
            sections={[
              { name: 'Grammar', url: '/grammar' },
              { name: 'Vocabulary', url: '/vocabulary' },
              { name: 'Listening', url: '/listening' },
            ]}
          />
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
