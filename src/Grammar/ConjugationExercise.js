import React from 'react';
import Exercise from '../Exercise';
import { ButtonToVoice } from '../Buttons';
import './ConjugationExercise.css';

function ConjugationExercise({ questions }) {
  const formatTaskDescription = (question, hasError) => {
    const verbFirstPart = question.verb.slice(0, question.verb.length - 2);
    const verbEnding = question.verb.slice(
      question.verb.length - 2,
      question.verb.length,
    );

    return (
      <div className="conjugation-exercise-title">
        <div className="conjugation-exercise-question">
          {verbFirstPart}
          <span style={hasError ? { color: 'red' } : null}>{verbEnding}</span>
          <ButtonToVoice text={question.verb} />
        </div>
        <div className="conjugation-exercise-question-translation">
          ({question.translation})
        </div>
      </div>
    );
  };

  return (
    <Exercise
      questions={questions}
      formatTaskDescription={formatTaskDescription}
      color="rgba(255, 240, 245, 0.3)"
      task="Choose correct group (conjugation):"
    />
  );
}

export default ConjugationExercise;
