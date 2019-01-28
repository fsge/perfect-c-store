'use strict';

import React from 'react';

const StepIndicator = ({ steps, current }) => (
  <div className="step-indicator">
    {
      steps.map((s, i) => (
        <div key={ i } className={ `step ${ current == (i + 1) ? `active` : `` }` }>{ i + 1 }</div>
      ))
    }
  </div>
);

export default StepIndicator;
