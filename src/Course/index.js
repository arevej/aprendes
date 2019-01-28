import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Exercise from './../Exercise';
import Header from '../Header';
import ProgressBar from '../components/ProgressBar';
import Dictionary from '../Dictionary/index';

import {
  FormatTaskOpenBrackets,
  FormatTaskFillInput,
  FormatTaskUnderstandSpeech,
  FormatTaskChooseOption,
} from './FormatTask';
import { topics } from './data';

import './index.css';

const types = {
  open_brackets: FormatTaskOpenBrackets,
  fill_in_input: FormatTaskFillInput,
  understand_speech: FormatTaskUnderstandSpeech,
  choose_option: FormatTaskChooseOption,
};
const chooseTaskFormatter = type => {
  return types[type];
};

class Course extends Component {
  state = {
    begginerProgress: 0,
    intermediateProgress: 0,
    advancedProgress: 0,
    topics: topics,
    doneExercises: [],
    isDictionaryOpen: false,
  };

  handleMarkExerciseAsDone = slug => {
    this.setState({
      doneExercises: [...this.state.doneExercises, { slug: slug }],
      begginerProgress: Math.round(
        this.state.begginerProgress + 100 / this.state.topics.length,
      ),
    });
  };

  handleOpenAndCloseDictionary = (evt) => {
    evt.stopPropagation();
    this.setState({ isDictionaryOpen: !this.state.isDictionaryOpen });
  };

  closeDictionary = () => {
    if (this.state.isDictionaryOpen) {
      this.setState({ isDictionaryOpen: false })
    }
  }

  render() {
    const ExerciseComponent = ({ match }) => {
      const { slug } = match.params;

      const topic = this.state.topics.find(topic => topic.slug === slug);

      return (
        <Exercise
          questions={topic.questions.map(question => {
            return {
              ...question,
              format: chooseTaskFormatter(question.format),
            };
          })}
          task={topic.task}
          onDone={() => this.handleMarkExerciseAsDone(topic.slug)}
        />
      );
    };

    const { match } = this.props;
    const isDone = slug => {
      return this.state.doneExercises.find(exercise => exercise.slug === slug);
    };

    return (
      <React.Fragment>
        <div className="course" onClick={this.closeDictionary}>
          <Header>
            <div
              className="course-dictionary-button"
              onClick={evt => this.handleOpenAndCloseDictionary(evt)}
            >
              Your dictionary
            </div>
          </Header>


          <Route
            path={match.url}
            exact
            component={() => (
              <React.Fragment>
                <div className="course-progress">
                  <ProgressBar
                    title="Beginner"
                    progress={this.state.begginerProgress}
                  />
                  <ProgressBar
                    title="Intermediate"
                    progress={this.state.intermediateProgress}
                  />
                  <ProgressBar
                    title="Advanced"
                    progress={this.state.advancedProgress}
                  />
                </div>
                <div className="topic-list">
                  {this.state.topics.map(topic => (
                    <Link
                      className="topic-list-item"
                      to={`${match.url}/${topic.slug}`}
                      key={topic.slug}
                    >
                      <span>{topic.name}</span>
                      {isDone(topic.slug) ? <span>Done</span> : null}
                    </Link>
                  ))}
                </div>
              </React.Fragment>
            )}
          />

          <Route path={`${match.url}/:slug`} render={ExerciseComponent} />
        </div>
        <Dictionary isDictionaryOpen={this.state.isDictionaryOpen} />
      </React.Fragment >
    );
  }
}

export default Course;
