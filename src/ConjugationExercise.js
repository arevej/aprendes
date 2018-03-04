import React from 'react';
import Exercise from './Exercise';

import './ConjugationExercise.css';

function ConjugationExercise({ questions }) {
  const formatTaskDescription = (question, hasError) => {
    const verbFirstPart = question.verb.slice(0, question.verb.length - 2);
    const verbEnding = question.verb.slice(
      question.verb.length - 2,
      question.verb.length,
    );
    return (
      <h3 className="conjugation-exercise-title">
        <span className="conjugation-exercise-question">
          {verbFirstPart}
          <span style={hasError ? { color: 'red' } : null}>{verbEnding}</span>
        </span>
        &nbsp;
        <span className="conjugation-exercise-question-translation">
          ({question.translation})
        </span>
      </h3>
    );
  };

  return (
    <Exercise
      questions={questions}
      formatTaskDescription={formatTaskDescription}
    />
  );
}

export default ConjugationExercise;
