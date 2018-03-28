import React from 'react';
import * as Icons from 'react-icons/lib/ti';

import './Buttons.css';

function Button({ title, onClick }) {
  return (
    <div className="button" onClick={onClick}>
      {title}
    </div>
  );
}

export function ButtonToVoice({ text }) {
  const textToVoice = new SpeechSynthesisUtterance();
  textToVoice.text = text;
  textToVoice.lang = 'es-ES';
  return (
    <Icons.TiVolumeUp
      size={36}
      className="button-to-voice"
      onClick={() => window.speechSynthesis.speak(textToVoice)}
    />
  );
}

export default Button;