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
            verb: 'creer',
            translation: 'to believe',
            options: ['1st', '2nd', '3rd'],
            answer: '2nd',
          },
          {
            verb: 'ayudar',
            translation: 'to help',
            options: ['1st', '2nd', '3rd'],
            answer: '1st',
          },
          {
            verb: 'vivir',
            translation: 'to live',
            options: ['1st', '2nd', '3rd'],
            answer: '3rd',
          },
          {
            verb: 'entrar',
            translation: 'to enter',
            options: ['1st', '2nd', '3rd'],
            answer: '1st',
          },
          {
            verb: 'escribir',
            translation: 'to write',
            options: ['1st', '2nd', '3rd'],
            answer: '3rd',
          },
          {
            verb: 'leer',
            translation: 'to read',
            options: ['1st', '2nd', '3rd'],
            answer: '2nd',
          },
          {
            verb: 'mirar',
            translation: 'to watch',
            options: ['1st', '2nd', '3rd'],
            answer: '1st',
          },
          {
            verb: 'ocurrir',
            translation: 'to happen',
            options: ['1st', '2nd', '3rd'],
            answer: '3rd',
          },
          {
            verb: 'comprender',
            translation: 'to understand',
            options: ['1st', '2nd', '3rd'],
            answer: '2nd',
          },
          {
            verb: 'esperar',
            translation: 'to wait',
            options: ['1st', '2nd', '3rd'],
            answer: '1st',
          },
        ]}
      />
    );
  }
}

export default Grammar;
