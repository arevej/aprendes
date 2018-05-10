import React, { Component } from 'react';

import Header from '../Header';
import Container from '../Container';

import './index.css';

class Listening extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Container>
          <Header />
          <div>Listening</div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Listening;
