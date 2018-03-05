import React, { Component } from 'react';

import './Exercise.css';

export function Option({ isDisabled, isActive, children, onClick }) {
  return (
    <a
      href="#"
      className={
        'option' +
        (isDisabled ? ' option--disabled' : '') +
        (isActive ? ' option--active' : '')
      }
      onClick={onClick}
    >
      {children}
    </a>
  );
}

class Exercise extends Component {
  state = {
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

  render() {
    const question = this.getCurrentQuestion();
    const wasPressed = option => this.state.tries.indexOf(option) !== -1;
    const hasTries = this.state.tries.length > 0;
    const hasOnlyWrongTries = this.state.tries.indexOf(question.answer) === -1;
    return (
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

        {question.options.map(option => (
          <Option
            onClick={this.chooseOption(option)}
            isActive={question.answer === option && wasPressed(option)}
            isDisabled={question.answer !== option && wasPressed(option)}
          >
            {option}
          </Option>
        ))}
        <div className="exercise-progress">
          {this.state.currentQuestionIndex + 1} / {this.props.questions.length}
        </div>
      </div>
    );
  }
}

export default Exercise;
