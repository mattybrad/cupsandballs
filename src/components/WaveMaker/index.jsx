import React from 'react';
import Oscillator from '../Oscillator';
import * as Actions from '../../actions/SoundToyActions';
import { connect } from 'react-redux';
import math from 'mathjs';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class WaveMakerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      equation: "",
      output: []
    }
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    // check props
  }

  componentWillUnmount() {
    // destroy game
  }

  onEquationChange(ev) {
    this.setState({
      equation: ev.target.value
    })
  }

  onSubmit(ev) {
    ev.preventDefault();
    var equationCode = math.compile(this.state.equation);
    var output = [];
    var scope = {};
    for(var t=0; t<5; t+=0.01) {
      scope.t = t;
      output.push(equationCode.eval(scope));
    }
    this.setState({
      output: output
    })
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.equation}
            onChange={this.onEquationChange.bind(this)}
            ></input>
        </form>
        <div>{this.state.output.join(", ")}</div>
      </div>
    )
  }
}

const WaveMaker = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveMakerComponent);

export default WaveMaker;
