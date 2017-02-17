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
    var duration = 10;
    var frameCount = window.actx.sampleRate * duration;
    var arrayBuffer = window.actx.createBuffer(1, frameCount, window.actx.sampleRate);
    var output = [];
    var scope = {};
    var interval = 1/window.actx.sampleRate;
    var channelData = arrayBuffer.getChannelData(0);
    console.log("start processing");
    for(var i=0; i<frameCount; i++) {
      scope.t = i / window.actx.sampleRate;
      // output.push(equationCode.eval(scope));
      channelData[i] = equationCode.eval(scope);
    }
    console.log("end processing");
    var bufferSource = window.actx.createBufferSource();
    bufferSource.buffer = arrayBuffer;
    bufferSource.connect(window.actx.destination);
    bufferSource.start();
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
