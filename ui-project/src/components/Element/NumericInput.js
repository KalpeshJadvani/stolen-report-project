import React, { Component } from 'react';
import { Input } from 'antd';

class NumericInput extends Component {
  onChange = (e) => {
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value === undefined) return;
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    return (
      <Input
        maxLength={this.props.maxLength}
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}

export default NumericInput;
