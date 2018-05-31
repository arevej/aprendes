import React, { Component } from 'react';
import Button from '../Buttons';
import Option from './Option';
import { Redirect } from 'react-router';
import { flatten, shuffle } from '../utility';

import './MatchPairsExerciseItem.css';

const TIME_OUT = 1500;

class MatchPairsExerciseItem extends Component {
  state = {
    try: [],
    correctPairs: [],
    shuffledArray: shuffle(flatten(this.props.question.task)),
  };

  handleOptionClick = option => {
    if (this.state.try.length === 1) {
      const firstChosen = this.state.try[0];
      const currentTry = [firstChosen, option];
      this.setState({ try: currentTry });
      const choosenPair = this.props.question.task.find(
        pair => pair.indexOf(firstChosen) !== -1,
      );
      const correctPart = choosenPair.find(text => text !== firstChosen);
      if (correctPart === option) {
        this.setState(
          {
            correctPairs: [...this.state.correctPairs, currentTry],
          },
          () => {
            if (
              this.state.correctPairs.length === this.props.question.task.length
            ) {
              setTimeout(() => this.props.onCorrectAnswer(), TIME_OUT);
            }
          },
        );
      }

      setTimeout(() => this.setState({ try: [] }), 600);
    } else {
      this.setState({ try: [option] });
    }
  };

  render() {
    const wasPressed = option => this.state.try.indexOf(option) !== -1;
    const isCorrect = option =>
      this.state.correctPairs.find(array => array.indexOf(option) !== -1);
    return (
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {this.state.shuffledArray.map(item => (
          <Option
            text={item}
            onClick={() => this.handleOptionClick(item)}
            isActive={isCorrect(item)}
            isDisabled={wasPressed(item)}
          />
        ))}
      </div>
    );
  }
}

export default MatchPairsExerciseItem;
