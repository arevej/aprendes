import React, { Component } from 'react';

import Header from '../Header';

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './index.css';

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
  };

  render() {
    return (
      <React.Fragment>
        <Header />
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
      </React.Fragment>
    );
  }
}

export default Course;
