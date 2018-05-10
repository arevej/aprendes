import React, { Component } from 'react';

import Header from '../Header';
import Container from '../Container';

import './index.css';

class Vocabulary extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Container>
          <Header />
          <div>Vocabulary</div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Vocabulary;
