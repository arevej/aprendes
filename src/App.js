import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Grammar from './Grammar';
import Vocabulary from './Vocabulary';
import Pronunciation from './Pronunciation';

import logo from './img/logo.png';
import cover from './img/cover.png';
import pron from './img/pron.png';
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
      <img src={logo} height="100px" className="logo" />
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
            <img src={pron} className="main-description-section-icon" />
            <span className="main-description-section-text">
              Get rid of the accent, making your <strong>pronunciation</strong>{' '}
              more Spanish.
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
  state = {
    conjugationExerciseQuestions: [
      {
        verb: 'hablar',
        translation: 'to speak',
        options: ['1st', '2nd', '3rd'],
        answer: '1st',
      },
      {
        verb: 'comer',
        translation: 'to eat',
        options: ['1st', '2nd', '3rd'],
        answer: '2nd',
      },
      {
        verb: 'vivir',
        translation: 'to live',
        options: ['1st', '2nd', '3rd'],
        answer: '3rd',
      },
    ],
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route
            path="/*"
            component={({ match }) => (
              <React.Fragment>
                {match.url === '/' ? <Logo /> : null}
                <div style={{ marginTop: match.url === '/' ? -25 : 10 }}>
                  <Menu
                    sections={[
                      { name: 'Grammar', url: '/grammar' },
                      { name: 'Vocabulary', url: '/vocabulary' },
                      { name: 'Listening', url: '/listening' },
                    ]}
                  />
                </div>
              </React.Fragment>
            )}
          />

          <Switch>
            <Route path="/" exact component={MainPage} />

            <Switch>
              <Route path="/grammar" exact component={Grammar} />
              <Route path="/vocabulary" exact component={Vocabulary} />
              <Route path="/listening" exact component={Listening} />
            </Switch>
          </Switch>

          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
