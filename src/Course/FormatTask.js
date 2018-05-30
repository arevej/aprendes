import React, { Component } from 'react';

import { ButtonToVoice } from '../Buttons';
import './FormatTask.css';

export function FormatTaskOpenBrackets({ question, hasError, isCorrect }) {
  return (
    <div className="format-task">
      {isCorrect ? (
        <React.Fragment>
          <div className="format-task-question">
            <span>{question.correctSentence}</span>
            <ButtonToVoice text={question.correctSentence} />
          </div>
          <div className="format-task-translation">
            {question.correctSentenceTranslation}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="format-task-question">
            <span style={hasError ? { color: 'red' } : null}>
              {question.subject}
            </span>
            &nbsp;
            {question.sentence}
          </div>
          <div className="format-task-translation">{question.translation}</div>
        </React.Fragment>
      )}
    </div>
  );
}

export function FormatTaskUnderstandSpeech({ question, hasError, isCorrect }) {
  return (
    <div className="format-task">
      {isCorrect ? (
        <React.Fragment>
          <div className="format-task-question">
            <ButtonToVoice text={question.sentence} />
          </div>
          <div className="format-task-question">
            <span>{question.sentence}</span>
          </div>
          <div className="format-task-translation">
            {question.sentenceTranslation}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div
            className="format-task-question"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <ButtonToVoice text={question.sentence} />
            <span className="format-task-translation">
              (click to listen a fragment)
            </span>
          </div>
          {hasError ? (
            <div className="format-task-translation">
              {question.sentenceTranslation}
            </div>
          ) : null}
        </React.Fragment>
      )}
    </div>
  );
}

export function FormatTaskFillInput({ question, hasError, isCorrect }) {
  return (
    <div className="format-task">
      {isCorrect ? (
        <React.Fragment>
          <div className="format-task-question">
            <span>{question.correctSentence}</span>
            <ButtonToVoice text={question.correctSentence} />
          </div>
          <div className="format-task-translation">
            {question.correctSentenceTranslation}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="format-task-question">{question.sentence}</div>
          <div className="format-task-translation">
            {question.correctSentenceTranslation}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export function FormatTaskChooseOption({ question, hasError }) {
  const verbFirstPart = question.verb.slice(0, question.verb.length - 2);
  const verbEnding = question.verb.slice(
    question.verb.length - 2,
    question.verb.length,
  );

  return (
    <div className="format-task">
      <div className="format-task-question">
        {verbFirstPart}
        <span style={hasError ? { color: 'red' } : null}>{verbEnding}</span>
        <ButtonToVoice text={question.verb} />
      </div>
      <div className="format-task-translation">({question.translation})</div>
    </div>
  );
}
