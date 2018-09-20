import React from 'react';
import * as Icons from 'react-icons/lib/ti';

import './Buttons.css';

export function Button({ title, onClick, round }) {
  return (
    <div className={round ? 'button--round' : 'button'} onClick={onClick}>
      {title}
    </div>
  );
}

export function ButtonToVoice({ text, size }) {
  const textToVoice = new SpeechSynthesisUtterance();
  textToVoice.text = text;
  textToVoice.lang = 'es-MX';
  textToVoice.rate = 0.1;
  textToVoice.pitch = 0.2;
  return (
    <Icons.TiVolumeUp
      size={size}
      className="button-to-voice"
      onClick={() => window.speechSynthesis.speak(textToVoice)}
    />
  );
}

export function RoundButton({ record, stop, play, active, onClick }) {
  return (
    <div
      className={active ? 'round-button--active' : 'round-button'}
      onClick={onClick}
    >
      {(() => {
        if (record) {
          return <Icons.TiMediaRecord size={30} />;
        } else if (stop) {
          return <Icons.TiMediaStop size={30} />;
        } else if (play) {
          return <Icons.TiMediaPlay size={30} />;
        }
      })()}
    </div>
  );
}

export default Button;
