import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Header from '../Header';
import Container from '../Container';

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './index.css';

const conjugationExerciseQuestions = [
  {
    verb: 'hablar',
    translation: 'to speak',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
  },
  {
    verb: 'comer',
    translation: 'to eat',
    options: ['1st', '2nd', '3rd'],
    answer: '2nd',
  },
  {
    verb: 'creer',
    translation: 'to believe',
    options: ['1st', '2nd', '3rd'],
    answer: '2nd',
  },
  {
    verb: 'ayudar',
    translation: 'to help',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
  },
  {
    verb: 'vivir',
    translation: 'to live',
    options: ['1st', '2nd', '3rd'],
    answer: '3rd',
  },
  {
    verb: 'entrar',
    translation: 'to enter',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
  },
  {
    verb: 'escribir',
    translation: 'to write',
    options: ['1st', '2nd', '3rd'],
    answer: '3rd',
  },
  {
    verb: 'leer',
    translation: 'to read',
    options: ['1st', '2nd', '3rd'],
    answer: '2nd',
  },
  {
    verb: 'mirar',
    translation: 'to watch',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
  },
  {
    verb: 'ocurrir',
    translation: 'to happen',
    options: ['1st', '2nd', '3rd'],
    answer: '3rd',
  },
  {
    verb: 'comprender',
    translation: 'to understand',
    options: ['1st', '2nd', '3rd'],
    answer: '2nd',
  },
  {
    verb: 'esperar',
    translation: 'to wait',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
  },
];

function ProgressBar({ progress, title }) {
  return (
    <div className="progressbar">
      <CircularProgressbar
        percentage={progress}
        strokeWidth={15}
        initialAnimation
        className="progressbar-circle"
        styles={{
          path: { stroke: 'rgba(148, 0, 45, 1)' },
          text: { fill: 'rgba(148, 0, 45, 1)' },
        }}
      />
      <h3>{title}</h3>
    </div>
  );
}

class Course extends Component {
  state = {
    begginerProgress: 43,
    intermediateProgress: 0,
    advancedProgress: 0,
    topics: [
      { name: 'Presente de Indicativo', slug: 'presente_de_ind' },
      {
        name: 'Preterito Perfecto de Indicativo',
        slug: 'preterito_perfecto_de_ind',
      },
      { name: 'Futuro Simple', slug: 'futuro_simple' },
      {
        name: 'Preterito Imperfecto de Indicativo',
        slug: 'preterito_imperfecto_de_ind',
      },
      { name: 'Preterito Indefenido', slug: 'preterito_indefenido' },
      {
        name: 'Preterito Pluscuamperfecto de Indicativo',
        slug: 'preterito_plucuamperfecto_de_ind',
      },
    ],
  };

  render() {
    const ExerciseComponent = ({ match }) => {
      const { slug } = match.params;

      const topic = this.state.topics.find(topic => topic.slug === slug);

      return <h1>Exercise {topic.name}</h1>;
    };

    const { match } = this.props;
    return (
      <React.Fragment>
        <Container>
          <Header />

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
        </Container>
      </React.Fragment>
    );
  }
}

export default Course;
