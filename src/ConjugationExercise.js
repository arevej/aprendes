import React from 'react';
import Exercise from './Exercise';
import * as Icons from 'react-icons/lib/ti';

import './ConjugationExercise.css';

function ConjugationExercise({ questions }) {
  const formatTaskDescription = (question, hasError) => {
    const verbFirstPart = question.verb.slice(0, question.verb.length - 2);
    const verbEnding = question.verb.slice(
      question.verb.length - 2,
      question.verb.length,
    );

    const text = new SpeechSynthesisUtterance();
    text.text = question.verb;
    text.lang = 'es-ES';

    return (
      <div className="conjugation-exercise-title">
        <div className="conjugation-exercise-question">
          {verbFirstPart}
          <span style={hasError ? { color: 'red' } : null}>{verbEnding}</span>
          <Icons.TiVolumeUp
            size={36}
            className="button-tospeech"
            onClick={() => window.speechSynthesis.speak(text)}
          />
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
    />
  );
}

export default ConjugationExercise;
