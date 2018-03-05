import React, { Component } from 'react';
import Button from './Buttons';

import './Exercise.css';

export function Option({ isDisabled, isActive, text, onClick }) {
  return (
    <div
      className={
        'option' +
        (isDisabled ? ' option--disabled' : '') +
        (isActive ? ' option--active' : '')
      }
      onClick={onClick}
    >
      {text}
    </div>
  );
}

class Exercise extends Component {
  state = {
    isStartedExercise: false,
    currentQuestionIndex: 0,
    tries: [],
  };

  getCurrentQuestion() {
    return this.props.questions[this.state.currentQuestionIndex];
  }

  chooseOption = chosenAnswer => () => {
    const question = this.getCurrentQuestion();
    if (question.answer === chosenAnswer) {
      this.setState({ tries: [...this.state.tries, chosenAnswer] });

      setTimeout(() => {
        if (
          this.state.currentQuestionIndex + 1 !==
          this.props.questions.length
        ) {
          this.setState({
            currentQuestionIndex: this.state.currentQuestionIndex + 1,
            tries: [],
          });
        } else {
          alert('Well done!');
        }
      }, 1000);
    } else {
      this.setState({ tries: [...this.state.tries, chosenAnswer] });
    }
  };

  startExercise = () => this.setState({ isStartedExercise: true });

  render() {
    const question = this.getCurrentQuestion();
    const wasPressed = option => this.state.tries.indexOf(option) !== -1;
    const hasTries = this.state.tries.length > 0;
    const hasOnlyWrongTries = this.state.tries.indexOf(question.answer) === -1;
    return !this.state.isStartedExercise ? (
      <div className="exercise-task">
        <h3 className="exercise-task-text">{this.props.task}</h3>
        <Button onClick={this.startExercise} title="Start" />
        <span className="exercise-task-helper">
          {"Don't know what is all about? Take a refresher."}
        </span>
      </div>
    ) : (
      <div
        className="exercise"
        style={{
          background: this.props.color,
        }}
      >
        <div>
          {this.props.formatTaskDescription(
            question,
            hasTries && hasOnlyWrongTries,
          )}
        </div>
        {question.options.map((option, index) => (
          <Option
            key={index}
            onClick={this.chooseOption(option)}
            isActive={question.answer === option && wasPressed(option)}
            isDisabled={question.answer !== option && wasPressed(option)}
            text={option}
          />
        ))}
        <div className="exercise-progress">
          {this.state.currentQuestionIndex + 1} / {this.props.questions.length}
        </div>
      </div>
    );
  }
}

export default Exercise;
