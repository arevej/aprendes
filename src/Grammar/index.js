import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import cx from 'classnames';

import Header from '../Header';
import Container from '../Container';
import { SectionMenu, TopicList } from '../Section';

import ConjugationExercise from './ConjugationExercise';

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

function SectionMenu({ sections, activeSection, onClick }) {
  return (
    <div className="section-menu">
      {sections.map(section => (
        <Link to="/grammar" key={section}>
          <div
            className={cx('section-menu-item', {
              'section-menu-item--active': activeSection === section,
            })}
            onClick={() => onClick(section)}
          >
            {section}
          </div>
        </Link>
      ))}
    </div>
  );
}

function TopicList({ topics }) {
  return (
    <div className="topic-list">
      {topics.map(topic => (
        <Link className="topic-list-item" to={`/grammar/${topic.slug}`}>
          {topic.name}
        </Link>
      ))}
    </div>
  );
}

class Grammar extends Component {
  state = {
    activeSection: 'Tenses',
    sections: [
      {
        section_name: 'Tenses',
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
      },
      {
        section_name: 'Article',
        topics: [
          { name: 'Definite Article', slug: 'definitive_article' },
          {
            name: 'Indefinite Article',
            slug: 'indefinitive_article',
          },
        ],
      },
    ],
  };

  handleChooseSection = section => {
    this.setState({ activeSection: section });
  };

  render() {
    const { match } = this.props;
    const section = this.state.sections.find(
      topic => topic.section === this.state.activeSection,
    );
    const topics = section ? section.topics : [];

    return (
      <React.Fragment>
        <Header />
        <Container>
          <SectionMenu
            sections={this.state.sections}
            activeSection={this.state.activeSection}
            onClick={this.handleChooseSection}
          />
          <Route
            path={match.url}
            exact
            component={() => <TopicList topics={topics} />}
          />
          <Route
            path={`${match.url}/:slug`}
            component={({ match }) => {
              const { slug } = match.params;
              const allTopics = this.state.sections.reduce(
                (allTopics, section) => {
                  return [...allTopics, ...section.topics];
                },
                [],
              );

              const topic = allTopics.find(topic => topic.slug === slug);
              const section = this.state.sections.find(
                section => section.topics.indexOf(topic) !== -1,
              );
              if (this.state.activeSection !== section.section) {
                this.setState({ activeSection: section.section });
              }

              return <h1>Exercise {topic.name}</h1>;
            }}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default Grammar;
