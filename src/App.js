import React, { Component } from 'react';
import Exercise from './Exercise';
import ConjugationExercise from './ConjugationExercise';

import './App.css';
import { Option } from './Exercise';

class App extends Component {
  state = {
    stage: 'intro',
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

  startExercise = () => this.setState({ stage: 'exercise' });

  render() {
    return (
      <div>
        <h1>AprendEs</h1>
        {this.state.stage === 'intro' ? (
          <div className="exercise">
            <h3 className="conjugation-exercise-title">
              Choose correct group (conjugation):
            </h3>
            <Option onClick={this.startExercise}>Start</Option>
            <a href="#" className="helper">
              {"Don't know what is all about? Take a refresher."}
            </a>
          </div>
        ) : this.state.stage === 'exercise' ? (
          <ConjugationExercise
            questions={this.state.conjugationExerciseQuestions}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
