import React, { Component } from 'react';

import Exercise from '../Exercise';
import { ButtonToVoice } from '../Buttons';
import './CourseExercise.css';

function UnderstandSpeech({ questions, onDone }) {
  const formatTaskDescription = (question, hasError, isCorrect) => {
    return (
      <div className="course-exercise-title">
        {isCorrect ? (
          <React.Fragment>
            <div className="course-exercise-question">
              <ButtonToVoice text={question.sentence} />
            </div>
            <div className="course-exercise-question">
              <span>{question.sentence}</span>
            </div>
            <div className="course-exercise-question-translation">
              {question.sentenceTranslation}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="course-exercise-question">
              <ButtonToVoice text={question.sentence} />
            </div>
            {hasError ? (
              <div className="course-exercise-question-translation">
                {question.sentenceTranslation}
              </div>
            ) : null}
          </React.Fragment>
        )}
      </div>
    );
  };

  return (
    <Exercise
      questions={questions}
      formatTaskDescription={formatTaskDescription}
      color="rgba(255, 240, 245, 0.3)"
      task="Fill in blank with speech text:"
      width={600}
      timeOut={1000}
      onDone={onDone}
      type="blank"
    />
  );
}

export default UnderstandSpeech;
