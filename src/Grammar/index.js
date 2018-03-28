import React, { Component } from 'react';

import ConjugationExercise from './ConjugationExercise';

import './index.css';

class Grammar extends Component {
  state = {};

  render() {
    return (
      <ConjugationExercise
        questions={[
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
        ]}
      />
    );
  }
}

export default Grammar;
