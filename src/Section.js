import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom';
import cx from 'classnames';

import './Section.css';

export function SectionMenu({ sections, activeSection, onClick }) {
  const sectionsTitles = sections.map(section => section.section);
  return (
    <div className="section-menu">
      {sectionsTitles.map(section => (
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

export function TopicList({ topics }) {
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
