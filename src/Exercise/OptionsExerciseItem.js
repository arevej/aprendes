import React, { Component } from 'react';
import Option from './Option';
import Button from '../Buttons';
import { Redirect } from 'react-router';
import { compareArrays } from '../utility';

import './OptionsExerciseItem.css';

const TIME_OUT = 1500;

function Options({ tries, question, onClick }) {
  const wasPressed = option => tries.indexOf(option) !== -1;
  return (
    <div>
      {question.options.map((option, index) => (
        <Option
          key={index}
          onClick={onClick(option)}
          isActive={question.answer === option && wasPressed(option)}
          isDisabled={question.answer !== option && wasPressed(option)}
          text={option}
        />
      ))}
    </div>
  );
}

class OptionsExerciseItem extends Component {
  state = {
    tries: [],
  };

  chooseOption = chosenAnswer => () => {
    this.setState({ tries: [...this.state.tries, chosenAnswer] });
    if (this.props.question.answer === chosenAnswer) {
      setTimeout(() => this.props.onCorrectAnswer(), TIME_OUT);
    }
  };

  render() {
    const { question, FormatTaskDescription } = this.props;
    const { tries } = this.state;
    const hasTries = tries.length > 0;
    const hasOnlyWrongTries = tries.indexOf(question.answer) === -1;
    const lastTry = tries[tries.length - 1];
    const isChosenCorrectAnswer = lastTry === question.answer;
    return (
      <div>
        <div>
          <FormatTaskDescription
            question={question}
            hasError={hasTries && hasOnlyWrongTries}
            isCorrect={isChosenCorrectAnswer}
          />
        </div>
        <Options
          tries={this.state.tries}
          question={question}
          onClick={this.chooseOption}
        />
      </div>
    );
  }
}

export default OptionsExerciseItem;
