import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

import './ProgressBar.css';

function ProgressBar({ progress, title }) {
  return (
    <div className="progressbar">
      <CircularProgressbar
        percentage={progress}
        strokeWidth={15}
        initialAnimation
        className="progressbar-circle"
        styles={{
          path: { stroke: 'rgba(148, 0, 45, 1)' },
          text: { fill: 'rgba(148, 0, 45, 1)' },
        }}
      />
      <h3>{title}</h3>
    </div>
  );
}

export default ProgressBar;
