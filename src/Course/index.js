import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Exercise from '../Exercise';

import Header from '../Header';
import Container from '../Container';

import {
  FormatTaskOpenBrackets,
  FormatTaskFillBlank,
  FormatTaskUnderstandSpeech,
  FormatTaskChooseOption,
} from './FormatTask';

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './index.css';

const chooseOptionExerciseQuestions = [
  {
    verb: 'hablar',
    translation: 'to speak',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
    type: 'options',
    format: FormatTaskChooseOption,
  },
  {
    verb: 'comer',
    translation: 'to eat',
    options: ['1st', '2nd', '3rd'],
    answer: '2nd',
    type: 'options',
    format: FormatTaskChooseOption,
  },
  {
    verb: 'creer',
    translation: 'to believe',
    options: ['1st', '2nd', '3rd'],
    answer: '2nd',
    type: 'options',
    format: FormatTaskChooseOption,
  },
  {
    verb: 'ayudar',
    translation: 'to help',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
    type: 'options',
    format: FormatTaskChooseOption,
  },
  {
    verb: 'vivir',
    translation: 'to live',
    options: ['1st', '2nd', '3rd'],
    answer: '3rd',
    type: 'options',
    format: FormatTaskChooseOption,
  },
  {
    verb: 'entrar',
    translation: 'to enter',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
    type: 'options',
    format: FormatTaskChooseOption,
  },
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
    type: 'blank',
    format: FormatTaskOpenBrackets,
  },
  {
    sentence: '(hablar) ... ruso',
    subject: 'Nosotros ',
    correctSentence: 'Nosotros hablamos ruso',
    correctSentenceTranslation: 'We speak Russian',
    translation: 'We (to speak) ... Russian',
    options: ['hablen', 'hablamos', 'hables'],
    answer: 'hablamos',
    type: 'blank',
    format: FormatTaskOpenBrackets,
  },
];

const fillInBlankExerciseQuestions = [
  {
    sentence: 'Yo no vivo ... Madrid',
    correctSentence: 'Yo no vivo en Madrid',
    correctSentenceTranslation: "I don't live in Madrid",
    translation: "I don't live ... in Madrid ",
    answer: 'en',
    type: 'blank',
    format: FormatTaskFillBlank,
  },
  {
    sentence: 'Ella va ... la escuela',
    correctSentence: 'Ella va a la escuela',
    correctSentenceTranslation: 'She goes to school',
    translation: 'She goes ... school',
    answer: 'a',
    type: 'blank',
    format: FormatTaskFillBlank,
  },
];

const understandSpeechExerciseQuestions = [
  {
    sentence: 'Yo no como manzanas',
    sentenceTranslation: "I don't eat apples",
    answer: 'yo no como manzanas',
    type: 'blank',
    format: FormatTaskUnderstandSpeech,
  },
  {
    verb: 'hablar',
    translation: 'to speak',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
    type: 'options',
    format: FormatTaskChooseOption,
  },
  {
    sentence: 'Ella descansa en casa',
    sentenceTranslation: 'She rests at home',
    answer: 'ella descansa en casa',
    type: 'blank',
    format: FormatTaskUnderstandSpeech,
  },
  {
    sentence: 'Nosotros leemos un libro',
    sentenceTranslation: 'We read a book',
    answer: 'nosotros leemos un libro',
    type: 'blank',
    format: FormatTaskUnderstandSpeech,
  },
  {
    sentence: 'Ellos no beben vino',
    sentenceTranslation: "They don't drink vine",
    answer: 'ellos no beben vino',
    type: 'blank',
    format: FormatTaskUnderstandSpeech,
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
          <Exercise
            questions={chooseOptionExerciseQuestions}
            task="Choose correct group (conjugation)"
            onDone={() => this.handleMarkExerciseAsDone('choose_opt')}
          />
        ),
      },
      {
        name: 'Open Brackets',
        slug: 'open_brackets',
        component: (
          <Exercise
            questions={openBracketsExerciseQuestions}
            task="Choose correct verb form:"
            onDone={() => this.handleMarkExerciseAsDone('open_brackets')}
          />
        ),
      },
      {
        name: 'Fill in blank',
        slug: 'fill_in_blank',
        component: (
          <Exercise
            questions={fillInBlankExerciseQuestions}
            task="Fill in blank with a missing preposion:"
            onDone={() => this.handleMarkExerciseAsDone('fill_in_blank')}
          />
        ),
      },
      {
        name: 'Understand a speech',
        slug: 'understand_speech',
        component: (
          <Exercise
            questions={understandSpeechExerciseQuestions}
            task="Fill in blank with speech text:"
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
