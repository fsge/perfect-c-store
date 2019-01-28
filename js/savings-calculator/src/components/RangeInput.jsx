'use strict';

import React from 'react';

class RangeInput extends React.Component {
  constructor(props) {
    super(props);
  }

  getPosition() {
    let total = this.props.max - this.props.min,
        position = this.props.value - this.props.min;

    return `${ (position / total) * 100 }%`;
  }

  render() {
    return (
      <div className="range-input-wrapper">
        <span className="min">{ this.props.min }</span>
        <div className="input-wrapper">
          <div className="value-bounds">
            <span className="value" style={ { left: this.getPosition() } }>
              { this.props.value }
            </span>
          </div>
          <input
            type="range"
            id={ this.props.name }
            min={ this.props.min }
            max={ this.props.max }
            step={ 1 }
            value={ this.props.value }
            onChange={ (e) => this.props.onChange(this.props.name, e.target.value) } />
        </div>
        <span className="max">{ this.props.max }</span>
      </div>
    );
  }
}

export default RangeInput;
