import React, { Component } from 'react';

import { ButtonToVoice } from '../Buttons';
import './CourseExercise.css';

export function FormatTaskOpenBrackets(question, hasError, isCorrect) {
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
}

export function FormatTaskUnderstandSpeech(question, hasError, isCorrect) {
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
}

export function FormatTaskFillBlank(question, hasError, isCorrect) {
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
          <div className="course-exercise-question">{question.sentence}</div>
          <div className="course-exercise-question-translation">
            {question.translation}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export function FormatTaskChooseOption(question, hasError) {
  const verbFirstPart = question.verb.slice(0, question.verb.length - 2);
  const verbEnding = question.verb.slice(
    question.verb.length - 2,
    question.verb.length,
  );

  return (
    <div className="course-exercise-title">
      <div className="course-exercise-question">
        {verbFirstPart}
        <span style={hasError ? { color: 'red' } : null}>{verbEnding}</span>
        <ButtonToVoice text={question.verb} />
      </div>
      <div className="course-exercise-question-translation">
        ({question.translation})
      </div>
    </div>
  );
}
