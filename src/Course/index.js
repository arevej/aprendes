import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import ChooseOption from './ChooseOption';
import OpenBracketsExercise from './OpenBracketsExercise';
import FillInBlank from './FillInBlank';
import UnderstandSpeech from './UnderstandSpeech';

import Header from '../Header';
import Container from '../Container';

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './index.css';

const chooseOptionExerciseQuestions = [
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
  // {
  //   verb: 'creer',
  //   translation: 'to believe',
  //   options: ['1st', '2nd', '3rd'],
  //   answer: '2nd',
  // },
  // {
  //   verb: 'ayudar',
  //   translation: 'to help',
  //   options: ['1st', '2nd', '3rd'],
  //   answer: '1st',
  // },
  // {
  //   verb: 'vivir',
  //   translation: 'to live',
  //   options: ['1st', '2nd', '3rd'],
  //   answer: '3rd',
  // },
  // {
  //   verb: 'entrar',
  //   translation: 'to enter',
  //   options: ['1st', '2nd', '3rd'],
  //   answer: '1st',
  // },
  // {
  //   verb: 'escribir',
  //   translation: 'to write',
  //   options: ['1st', '2nd', '3rd'],
  //   answer: '3rd',
  // },
  // {
  //   verb: 'leer',
  //   translation: 'to read',
  //   options: ['1st', '2nd', '3rd'],
  //   answer: '2nd',
  // },
  // {
  //   verb: 'mirar',
  //   translation: 'to watch',
  //   options: ['1st', '2nd', '3rd'],
  //   answer: '1st',
  // },
  // {
  //   verb: 'ocurrir',
  //   translation: 'to happen',
  //   options: ['1st', '2nd', '3rd'],
  //   answer: '3rd',
  // },
  // {
  //   verb: 'comprender',
  //   translation: 'to understand',
  //   options: ['1st', '2nd', '3rd'],
  //   answer: '2nd',
  // },
  // {
  //   verb: 'esperar',
  //   translation: 'to wait',
  //   options: ['1st', '2nd', '3rd'],
  //   answer: '1st',
  // },
];

const openBracketsExerciseQuestions = [
  {
    sentence: '(vivir) ... en España',
    subject: 'Yo',
    correctSentence: 'Yo vivo en España',
    correctSentenceTranslation: 'I live in Spain',
    translation: 'I (to live) ... in Spain',
    options: ['vive', 'viven', 'vivo'],
    answer: 'vivo',
  },
  {
    sentence: '(hablo) ... ruso',
    subject: 'Nosotros ',
    correctSentence: 'Nosotros hablamos ruso',
    correctSentenceTranslation: 'We speak Russian',
    translation: 'We (to speak) ... Russian',
    options: ['hablen', 'hablamos', 'hables'],
    answer: 'hablamos',
  },
];

const fillInBlankExerciseQuestions = [
  {
    sentence: 'no ... en Madrid (vivir)',
    subject: 'Yo',
    correctSentence: 'Yo no vivo en Madrid',
    correctSentenceTranslation: "I don't live in Madrid",
    translation: "I don't ... in Madrid (to live)",
    answer: 'vivo',
  },
  {
    sentence: '... mucho (trabajar)',
    subject: 'Marta',
    correctSentence: 'Marta trabaja mucho',
    correctSentenceTranslation: 'Marta works a lot',
    translation: 'Marta ... a lot (to work)',
    answer: 'trabaja',
  },
];

const understandSpeechExerciseQuestions = [
  {
    sentence: 'Yo no como manzanas',
    sentenceTranslation: "I don't eat apples",
    answer: 'yo no como manzanas',
  },
  {
    sentence: 'Ella descansa en casa',
    sentenceTranslation: 'She rests at home',
    answer: 'ella descansa en casa',
  },
  {
    sentence: 'Nosotros leemos un libro',
    sentenceTranslation: 'We read a book',
    answer: 'nosotros leemos un libro',
  },
  {
    sentence: 'Ellos no beben vino',
    sentenceTranslation: "They don't drink vine",
    answer: 'ellos no beben vino',
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
      {
        name: 'Choose an option',
        slug: 'choose_opt',
        component: (
          <ChooseOption
            questions={chooseOptionExerciseQuestions}
            onDone={() => this.handleMarkExerciseAsDone('choose_opt')}
          />
        ),
      },
      {
        name: 'Open Brackets',
        slug: 'open_brackets',
        component: (
          <OpenBracketsExercise
            questions={openBracketsExerciseQuestions}
            onDone={() => this.handleMarkExerciseAsDone('open_brackets')}
          />
        ),
      },
      {
        name: 'Fill in blank',
        slug: 'fill_in_blank',
        component: (
          <FillInBlank
            questions={fillInBlankExerciseQuestions}
            onDone={() => this.handleMarkExerciseAsDone('fill_in_blank')}
          />
        ),
      },
      {
        name: 'Understand a speech',
        slug: 'understand_speech',
        component: (
          <UnderstandSpeech
            questions={understandSpeechExerciseQuestions}
            onDone={() => this.handleMarkExerciseAsDone('understand_speech')}
          />
        ),
      },
    ],
    doneExercises: [],
  };

  handleMarkExerciseAsDone = slug => {
    this.setState({
      doneExercises: [...this.state.doneExercises, { slug: slug }],
    });
  };

  render() {
    const ExerciseComponent = ({ match }) => {
      const { slug } = match.params;

      const topic = this.state.topics.find(topic => topic.slug === slug);

      return <div>{topic.component}</div>;
    };

    const { match } = this.props;
    const isDone = slug => {
      return this.state.doneExercises.find(exercise => exercise.slug === slug);
    };

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
