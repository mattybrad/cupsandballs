import React from 'react';
import classNames from 'classnames';

export default class NumberInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: this.props.defaultValue || 0
    }
  }

  changeValue(increment) {
    this.setState({
      currentValue: Math.max(this.props.min, Math.min(this.props.max,this.state.currentValue + increment))
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.currentValue != this.state.currentValue && this.props.onChange) {
      this.props.onChange(this.state.currentValue);
    }
  }

  render() {
    return(
      <div>
        <label>{this.props.label || "Value"}: </label>
        <span>{this.state.currentValue} {this.props.unit} </span>
        (<span onClick={this.changeValue.bind(this, -1)}>decrease, </span>
        <span onClick={this.changeValue.bind(this, 1)}>increase</span>)
      </div>
    )
  }
}
