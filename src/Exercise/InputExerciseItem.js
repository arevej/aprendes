import React, { Component } from 'react';
import Button from '../Buttons';
import { Redirect } from 'react-router';
import { compareArrays } from '../utility';

import './InputExerciseItem.css';

const TIME_OUT = 1500;

function Input({
  onSubmit,
  typedAnswer,
  onChange,
  tries,
  hasTries,
  hasOnlyWrongTries,
  isChosenCorrectAnswer,
  long,
}) {
  const lastTry = tries[tries.length - 1];
  const doesMatchLastTry = typedAnswer === lastTry;
  const hasErroneousInput = hasTries && hasOnlyWrongTries && doesMatchLastTry;
  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          value={typedAnswer}
          onChange={onChange}
          autoFocus="true"
          className="exercise-item-input"
          style={{
            ...(long ? { width: 300 } : { width: 200 }),
            ...(hasErroneousInput
              ? { color: 'red' }
              : isChosenCorrectAnswer ? { color: 'green' } : null),
          }}
        />
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

class InputExerciseItem extends Component {
  state = {
    typedAnswer: '',
    tries: [],
  };

  handleRightAnswer = event => {
    event.preventDefault();

    const { typedAnswer, tries } = this.state;
    this.setState({
      tries: [...tries, typedAnswer.toLowerCase()],
    });

    if (this.props.question.answer === typedAnswer.toLowerCase()) {
      setTimeout(() => this.props.onCorrectAnswer(), TIME_OUT);
    }
  };

  handleChange = event => {
    this.setState({ typedAnswer: event.target.value });
  };

  render() {
    const { question, FormatTaskDescription } = this.props;
    const { tries } = this.state;
    const hasTries = tries.length > 0;
    const hasOnlyWrongTries = tries.indexOf(question.answer) === -1;
    const lastTry = tries[tries.length - 1];
    const isChosenCorrectAnswer = lastTry === question.answer;
    const isLong = question.answer.length > 15;
    return (
      <div>
        <div>
          <FormatTaskDescription
            question={question}
            hasError={hasTries && hasOnlyWrongTries}
            isCorrect={isChosenCorrectAnswer}
          />
        </div>
        <Input
          onSubmit={this.handleRightAnswer}
          typedAnswer={this.state.typedAnswer}
          onChange={this.handleChange}
          tries={tries}
          hasTries={hasTries}
          hasOnlyWrongTries={hasOnlyWrongTries}
          isChosenCorrectAnswer={isChosenCorrectAnswer}
          long={isLong}
        />
      </div>
    );
  }
}

export default InputExerciseItem;
