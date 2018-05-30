import React, { Component } from 'react';
import Button from '../Buttons';
import { Redirect } from 'react-router';
import { compareArrays } from '../utility';

import './InputsExerciseItem.css';

const TIME_OUT = 1500;

class InputsExerciseItem extends Component {
  state = {
    typedAnswers: [],
    lastTry: null,
  };

  handleChange = (evt, idx) => {
    const typedAnswers = this.state.typedAnswers;
    typedAnswers[idx] = evt.target.value;
    this.setState({ typedAnswers });
  };

  handleRightAnswers = event => {
    event.preventDefault();

    const { question } = this.props;
    const answersToLowerCase = this.state.typedAnswers.map(answer =>
      answer.toLowerCase(),
    );

    this.setState({
      lastTry: answersToLowerCase,
    });
    if (compareArrays(answersToLowerCase, question.answer)) {
      setTimeout(() => this.props.onCorrectAnswer(), TIME_OUT);
    }
  };

  render() {
    const { question } = this.props;
    const questionParts = question.sentence.split(/__/gi);

    const { lastTry, typedAnswers } = this.state;
    const isChosenCorrectAnswer = idx => {
      if (lastTry !== null) {
        return lastTry[idx] === question.answer[idx];
      }
    };
    const hasErroneousInput = idx =>
      lastTry
        ? typedAnswers[idx] === lastTry[idx] &&
          typedAnswers[idx] !== question.answer[idx]
        : false;

    return (
      <div>
        <form
          onSubmit={this.handleRightAnswers}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div className="inputs">
            {questionParts.map((part, idx) => (
              <React.Fragment>
                <span>{part}</span>
                {idx !== questionParts.length - 1 ? (
                  <input
                    type="text"
                    value={this.state.typedAnswers[idx] || ''}
                    onChange={evt => this.handleChange(evt, idx)}
                    autoFocus={idx === 0 ? true : false}
                    className="exercise-item-input"
                    style={
                      isChosenCorrectAnswer(idx)
                        ? { color: 'green' }
                        : hasErroneousInput(idx) ? { color: 'red' } : null
                    }
                  />
                ) : null}
              </React.Fragment>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <input className="button" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default InputsExerciseItem;
