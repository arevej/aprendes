import React, { Component } from 'react';
import ConjugationExercise from './ConjugationExercise';
import logo from './logo.png';

import './App.css';

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

  handleStartExercise = name => () => this.setState({ stage: name });

  render() {
    return (
      <div>
        <img src={logo} height="60px" />
        {this.state.stage === 'intro' ? (
          <div>
            <div>Welcome</div>
            <div onClick={this.handleStartExercise('conjugationExercise')}>
              Start Conjugation Exercise
            </div>
          </div>
        ) : this.state.stage === 'conjugationExercise' ? (
          <ConjugationExercise
            questions={this.state.conjugationExerciseQuestions}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
