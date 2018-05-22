import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Exercise from '../Exercise';

import Header from '../Header';
import Container from '../Container';

import {
  FormatTaskOpenBrackets,
  FormatTaskFillInput,
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
    type: 'input',
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
    type: 'input',
    format: FormatTaskOpenBrackets,
  },
];

const fillInInputExerciseQuestions = [
  {
    sentence: 'Yo no ... Madrid',
    correctSentence: 'Yo no vivo en Madrid',
    correctSentenceTranslation: "I don't live in Madrid",
    translation: "I don't live ... in Madrid ",
    answer: 'en',
    type: 'input',
    format: FormatTaskFillInput,
  },
  {
    sentence: 'Ella va ... la escuela',
    correctSentence: 'Ella va a la escuela',
    correctSentenceTranslation: 'She goes to school',
    translation: 'She goes ... school',
    answer: 'a',
    type: 'input',
    format: FormatTaskFillInput,
  },
];

const understandSpeechExerciseQuestions = [
  {
    sentence: 'Yo no como manzanas',
    sentenceTranslation: "I don't eat apples",
    answer: 'yo no como manzanas',
    type: 'input',
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
    type: 'input',
    format: FormatTaskUnderstandSpeech,
  },
  {
    sentence: 'Nosotros leemos un libro',
    sentenceTranslation: 'We read a book',
    answer: 'nosotros leemos un libro',
    type: 'input',
    format: FormatTaskUnderstandSpeech,
  },
  {
    sentence: 'Ellos no beben vino',
    sentenceTranslation: "They don't drink vine",
    answer: 'ellos no beben vino',
    type: 'input',
    format: FormatTaskUnderstandSpeech,
  },
];

const fillInInputsExerciseQuestions = [
  {
    sentence:
      'Yo no vivo __ Madrid. __ la mañana yo tengo __ ir en tren 40 minutos.',
    correctSentenceTranslation:
      "I don't live in Madrid. In the morning I need to go by train 40 minutes.",
    answer: ['en', 'por', 'que'],
    type: 'inputs',
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
        name: 'Fill in input',
        slug: 'fill_in_input',
        component: (
          <Exercise
            questions={fillInInputExerciseQuestions}
            task="Fill in blank with a missing preposion:"
            onDone={() => this.handleMarkExerciseAsDone('fill_in_input')}
          />
        ),
      },
      {
        name: 'Understand a speech',
        slug: 'understand_speech',
        component: (
          <Exercise
            questions={understandSpeechExerciseQuestions}
            task="Fill in input with speech text:"
            onDone={() => this.handleMarkExerciseAsDone('understand_speech')}
          />
        ),
      },
      {
        name: 'Fill in blanks',
        slug: 'fill_in_blanks',
        component: (
          <Exercise
            questions={fillInInputsExerciseQuestions}
            task="Fill in blank with speech text:"
            onDone={() => this.handleMarkExerciseAsDone('fill_in_blanks')}
            inputs
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
