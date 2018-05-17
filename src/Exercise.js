import React, { Component } from 'react';
import Button from './Buttons';
import { Redirect } from 'react-router';

import './Exercise.css';

const TIME_OUT = 1500;

function Option({ isDisabled, isActive, text, onClick }) {
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

function Options({ tries, question, onClick }) {
  const wasPressed = option => tries.indexOf(option) !== -1;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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

function Blank({
  onSubmit,
  typedAnswer,
  onChange,
  tries,
  hasTries,
  hasOnlyWrongTries,
  isChosenCorrectAnswer,
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          type="text"
          value={typedAnswer}
          onChange={onChange}
          autofocus="true"
          className="exercise-item-with-blank-input"
          style={
            hasTries &&
            hasOnlyWrongTries &&
            typedAnswer === tries[tries.length - 1]
              ? { color: 'red' }
              : isChosenCorrectAnswer ? { color: 'green' } : null
          }
        />
        <input className="button" type="submit" value="Submit" />
      </form>
    </div>
  );
}

class ExerciseItem extends Component {
  state = {
    typedAnswer: '',
    tries: [],
  };

  handleRightAnswer = event => {
    event.preventDefault();
    const { typedAnswer } = this.state;
    if (this.props.question.answer === typedAnswer.toLowerCase()) {
      this.setState({
        tries: [...this.state.tries, typedAnswer.toLowerCase()],
      });
      setTimeout(() => this.props.onCorrectAnswer(), TIME_OUT);
    } else {
      this.setState({
        tries: [...this.state.tries, typedAnswer.toLowerCase()],
      });
    }
  };

  chooseOption = chosenAnswer => () => {
    if (this.props.question.answer === chosenAnswer) {
      this.setState({ tries: [...this.state.tries, chosenAnswer] });
      setTimeout(() => this.props.onCorrectAnswer(), TIME_OUT);
    } else {
      this.setState({ tries: [...this.state.tries, chosenAnswer] });
    }
  };

  handleChange = event => {
    this.setState({ typedAnswer: event.target.value });
  };

  render() {
    const { question } = this.props;
    const hasTries = this.state.tries.length > 0;
    const hasOnlyWrongTries = this.state.tries.indexOf(question.answer) === -1;
    const isChosenCorrectAnswer =
      this.state.tries[this.state.tries.length - 1] ===
      this.props.question.answer;
    return (
      <div>
        <div>
          {this.props.formatTaskDescription(
            question,
            hasTries && hasOnlyWrongTries,
            isChosenCorrectAnswer,
          )}
        </div>
        {(() => {
          switch (question.type) {
            case 'options':
              return (
                <Options
                  tries={this.state.tries}
                  question={question}
                  onClick={this.chooseOption}
                />
              );
            case 'blank':
              return (
                <Blank
                  onSubmit={this.handleRightAnswer}
                  typedAnswer={this.state.typedAnswer}
                  onChange={this.handleChange}
                  tries={this.state.tries}
                  hasTries={hasTries}
                  hasOnlyWrongTries={hasOnlyWrongTries}
                  isChosenCorrectAnswer={isChosenCorrectAnswer}
                />
              );
            default:
              return <div>Choose exercise type</div>;
          }
        })()}
      </div>
    );
  }
}

class Exercise extends Component {
  state = {
    isStartedExercise: false,
    currentQuestionIndex: 0,
    isFinished: false,
  };

  getCurrentQuestion() {
    return this.props.questions[this.state.currentQuestionIndex];
  }

  isLastQuestion() {
    return this.state.currentQuestionIndex + 1 === this.props.questions.length;
  }

  handleExerciseDone = () => {
    if (!this.isLastQuestion()) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
      });
    } else {
      this.props.onDone();
      this.setState({ isFinished: true });
    }
  };

  startExercise = () => this.setState({ isStartedExercise: true });

  render() {
    const question = this.getCurrentQuestion();
    if (this.state.isFinished) {
      return <Redirect to="/course" />;
    }

    return !this.state.isStartedExercise ? (
      <div className="exercise-task">
        <h3 className="exercise-task-text">{this.props.task}</h3>
        <Button onClick={this.startExercise} title="Start" />
        <span className="exercise-task-helper">
          {"Don't know what is this all about? Take a refresher."}
        </span>
      </div>
    ) : (
      <div className="exercise">
        <ExerciseItem
          key={this.state.currentQuestionIndex}
          question={question}
          formatTaskDescription={question.format}
          isLastQuestion={this.isLastQuestion()}
          onCorrectAnswer={this.handleExerciseDone}
        />
        <div className="exercise-progress">
          {this.state.currentQuestionIndex + 1} / {this.props.questions.length}
        </div>
      </div>
    );
  }
}

export default Exercise;
