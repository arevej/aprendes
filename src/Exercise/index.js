import React, { Component } from 'react';
import Button from '../Buttons';
import { Redirect } from 'react-router';

import InputExerciseItem from './InputExerciseItem';
import InputsExerciseItem from './InputsExerciseItem';
import OptionsExerciseItem from './OptionsExerciseItem';
import MatchPairsExerciseItem from './MatchPairsExerciseItem';
import ListenYourselfExerciseItem from './ListenYourselfExerciseItem';

import './index.css';

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
        {(() => {
          switch (question.type) {
            case 'input':
              return (
                <InputExerciseItem
                  key={this.state.currentQuestionIndex}
                  question={question}
                  FormatTaskDescription={question.format}
                  isLastQuestion={this.isLastQuestion()}
                  onCorrectAnswer={this.handleExerciseDone}
                />
              );
            case 'inputs':
              return (
                <InputsExerciseItem
                  key={this.state.currentQuestionIndex}
                  question={question}
                  isLastQuestion={this.isLastQuestion()}
                  onCorrectAnswer={this.handleExerciseDone}
                />
              );
            case 'options':
              return (
                <OptionsExerciseItem
                  key={this.state.currentQuestionIndex}
                  question={question}
                  FormatTaskDescription={question.format}
                  isLastQuestion={this.isLastQuestion()}
                  onCorrectAnswer={this.handleExerciseDone}
                />
              );
            case 'pairs':
              return (
                <MatchPairsExerciseItem
                  key={this.state.currentQuestionIndex}
                  question={question}
                  isLastQuestion={this.isLastQuestion()}
                  onCorrectAnswer={this.handleExerciseDone}
                />
              );
            case 'listen_yourself':
              return (
                <ListenYourselfExerciseItem
                  key={this.state.currentQuestionIndex}
                  question={question}
                  isLastQuestion={this.isLastQuestion()}
                  onCorrectAnswer={this.handleExerciseDone}
                />
              );
          }
        })()}

        <div className="exercise-progress">
          {this.state.currentQuestionIndex + 1} / {this.props.questions.length}
        </div>
      </div>
    );
  }
}

export default Exercise;
