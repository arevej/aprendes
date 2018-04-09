import React, { Component } from 'react';

import ConjugationExercise from './ConjugationExercise';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './index.css';

const conjugationExerciseQuestions = [
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
];

function ProgressBar({ progress, title }) {
  return (
    <div className="progressbar">
      <CircularProgressbar
        percentage={progress}
        strokeWidth={15}
        initialAnimation
        className="progressbar-circle"
        styles={{
          path: { stroke: 'rgba(148, 0, 45, 1)' },
          text: { fill: 'rgba(148, 0, 45, 1)' },
        }}
      />
      <h3>{title}</h3>
    </div>
  );
}
class Grammar extends Component {
  state = {
    begginerProgress: 43,
    intermediateProgress: 0,
    advancedProgress: 0,
  };

  render() {
    return (
      <div className="grammar-progress">
        <ProgressBar title="Beginner" progress={this.state.begginerProgress} />
        <ProgressBar
          title="Intermediate"
          progress={this.state.intermediateProgress}
        />
        <ProgressBar title="Advanced" progress={this.state.advancedProgress} />
      </div>
    );
  }
}

export default Grammar;
