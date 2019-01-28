'use strict';

import React from 'react';
import StepIndicator from './StepIndicator.jsx';
import RangeInput from './RangeInput.jsx';

const stepConfig = [
  {
    text: `How many refrigeration units do you have?`,
    icon: `building`,
    min: 0,
    max: 50,
    stateVar: `refrigerationUnits`
  },
  {
    text: `How many lighting zones do you have?`,
    icon: `lighting`,
    min: 0,
    max: 50,
    stateVar: `lightingZones`
  },
  {
    text: `How many fuel dispensers do you have?`,
    icon: `fuelPump`,
    min: 0,
    max: 100,
    stateVar: `fuelDispensers`
  },
  {
    text: `How many RTUs do you have?`,
    icon: `rtu`,
    min: 0,
    max: 10,
    stateVar: `rtus`
  }
];

const inputMapping = {
  refrigerationUnits: 'Refrigeration Units',
  lightingZones: 'Lighting Zones',
  fuelDispensers: 'Fuel Dispensers',
  rtus: 'RTUs',
  totalSavings: 'Total Savings',
  email: 'Email',
  name: 'Name'
};

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      refrigerationUnits: 12,
      lightingZones: 12,
      fuelDispensers: 36,
      rtus: 3,
      name: ``,
      email: ``,
      totalSavings: `$0`
    };

    this.state.totalSavings = this.getTotalSavings(this.state);
  }

  handleInputChange(key, value) {
    let state = {
      ...this.state,
      [key]: value
    };

    state.totalSavings = this.getTotalSavings(state);

    this.setState(state);
  }

  handleFormSubmit() {
    document.querySelector('form[name="Savings Calculator"]').submit();
  }

  getTotalSavings(state = this.state) {
    let $ = 0;
    
    $ += state.rtus * 500;
    $ += state.lightingZones * 100;
    $ += state.fuelDispensers * 675;
    $ += state.refrigerationUnits * 800;

    return `$${ $ }`;
  }

  prevStep() {
    if (this.state.step > 1) {
      this.setState({
        step: this.state.step - 1
      });
    } else {
      window.history.back();
    }
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1
    });
  }

  skipStep() {
    let currentStep = stepConfig[this.state.step - 1];

    this.setState({
      [currentStep.stateVar]: 0,
      step: this.state.step + 1
    });
  }

  componentDidUpdate() {
    Object.keys(inputMapping).forEach((k) => {
      document.querySelector(`input[name="${ inputMapping[k] }"]`).value = this.state[k];
    });
  }

  render() {
    let currentStep = stepConfig[this.state.step - 1];

    return (
      <div className="savings-calculator">
        {
          currentStep ? (
            <div className="input-step">
              <StepIndicator
                steps={ stepConfig }
                current={ this.state.step } />
              <div className="img-wrapper">
                <img src={ `/img/savings-calculator/${ currentStep.icon }.svg` } />
              </div>
              <p>
                { currentStep.text }
              </p>
              <RangeInput
                name={ currentStep.stateVar }
                min={ currentStep.min }
                max={ currentStep.max }
                value={ this.state[currentStep.stateVar] }
                onChange={ this.handleInputChange.bind(this) } />
              <div className="btn-row">
                <button 
                  className="btn default"
                  onClick={ () => this.prevStep() }>
                  <span>Back</span>
                </button>
                <button 
                  className="btn primary"
                  onClick={ () => this.nextStep() }>
                  <span>Next</span>
                </button>
              </div>
              <div className="skip-row">
                <a 
                  className="muted"
                  onClick={ () => this.skipStep() }>
                  Skip
                </a>
              </div>
            </div>
          ) : (
            <div className="final-step">
              <p>How many drink coolers do you have?</p>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  onChange={ (e) => this.handleInputChange(`name`, e.target.value) } />
                <input 
                  type="email" 
                  placeholder="Your Email"
                  onChange={ (e) => this.handleInputChange(`email`, e.target.value) } />
                <button
                  className="btn primary"
                  onClick={ () => this.handleFormSubmit() }>
                  <span>Send</span>
                </button>
              </div>
            </div>
          )
        }

      </div>
    );
  }
}

export default Root;
