import React from 'react';
import Exercise from '../Exercise';
import { ButtonToVoice } from '../Buttons';
import './CourseExercise.css';

function ChooseOption({ questions, onDone }) {
  const formatTaskDescription = (question, hasError) => {
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
  };

  return (
    <Exercise
      questions={questions}
      formatTaskDescription={formatTaskDescription}
      color="rgba(255, 240, 245, 0.3)"
      task="Choose correct group (conjugation):"
      width={350}
      timeOut={1000}
      onDone={onDone}
      type="options"
    />
  );
}

export default ChooseOption;
