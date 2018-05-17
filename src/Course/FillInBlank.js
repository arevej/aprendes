import React, { Component } from 'react';

import Exercise from '../Exercise';
import { ButtonToVoice } from '../Buttons';
import './CourseExercise.css';

function FillInBlank({ questions, onDone }) {
  const formatTaskDescription = (question, hasError, isCorrect) => {
    return (
      <div className="course-exercise-title">
        {isCorrect ? (
          <React.Fragment>
            <div className="course-exercise-question">
              <span>{question.correctSentence}</span>
              <ButtonToVoice text={question.correctSentence} />
            </div>
            <div className="course-exercise-question-translation">
              {question.correctSentenceTranslation}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="course-exercise-question">
              <span style={hasError ? { color: 'red' } : null}>
                {question.subject}
              </span>
              &nbsp;
              {question.sentence}
            </div>
            <div className="course-exercise-question-translation">
              {question.translation}
            </div>
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
      task="Fill in blank with correct verb form:"
      width={600}
      timeOut={3000}
      onDone={onDone}
      type="blank"
    />
  );
}

export default FillInBlank;
