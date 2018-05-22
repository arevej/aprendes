import React, { Component } from 'react';
import Button from './Buttons';
import { Redirect } from 'react-router';

import './Exercise.css';

const TIME_OUT = 1500;
const displayStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

function ExerciseItemContainer({ children }) {
  return <div className="exercise-item-container">{children}</div>;
}

function compareArrays(a, b) {
  if (a && b) {
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

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
    <div style={displayStyle}>
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

function Input({
  onSubmit,
  typedAnswer,
  onChange,
  tries,
  hasTries,
  hasOnlyWrongTries,
  isChosenCorrectAnswer,
}) {
  return (
    <div style={displayStyle}>
      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          type="text"
          value={typedAnswer}
          onChange={onChange}
          autoFocus="true"
          className="exercise-item-input"
          style={
            hasTries &&
            hasOnlyWrongTries &&
            typedAnswer === tries[tries.length - 1]
              ? { color: 'red' }
              : isChosenCorrectAnswer ? { color: 'green' } : null
          }
        />
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

class Inputs extends Component {
  state = {
    typedAnswers: [],
    tries: [],
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

    if (compareArrays(answersToLowerCase, question.answer)) {
      this.setState({
        tries: [...this.state.tries, answersToLowerCase],
      });
      setTimeout(() => this.props.onCorrectAnswer(), TIME_OUT);
    } else {
      this.setState({
        tries: [...this.state.tries, answersToLowerCase],
      });
    }
  };

  render() {
    const { question } = this.props;
    const questionParts = this.props.question.sentence.split(/__/gi);

    const isChosenCorrectAnswer = idx =>
      this.state.tries.find(tries => tries[idx] === question.answer[idx]);

    const lastTry = this.state.tries[this.state.tries.length - 1];
    return (
      <ExerciseItemContainer>
        <div style={displayStyle}>
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
                          : lastTry
                            ? this.state.typedAnswers[idx] === lastTry[idx] &&
                              this.state.typedAnswers[idx] !==
                                this.props.question.answer[idx]
                              ? { color: 'red' }
                              : null
                            : null
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
      </ExerciseItemContainer>
    );
  }
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
      <ExerciseItemContainer>
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
              case 'input':
                return (
                  <Input
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
      </ExerciseItemContainer>
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
        {this.props.inputs ? (
          <Inputs
            key={this.state.currentQuestionIndex}
            question={question}
            isLastQuestion={this.isLastQuestion()}
            onCorrectAnswer={this.handleExerciseDone}
          />
        ) : (
          <ExerciseItem
            key={this.state.currentQuestionIndex}
            question={question}
            formatTaskDescription={question.format}
            isLastQuestion={this.isLastQuestion()}
            onCorrectAnswer={this.handleExerciseDone}
          />
        )}
        <div className="exercise-progress">
          {this.state.currentQuestionIndex + 1} / {this.props.questions.length}
        </div>
      </div>
    );
  }
}

export default Exercise;
