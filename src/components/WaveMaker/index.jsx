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
      equation: "sin(2*pi*440*t)",
      duration: 1
    }
  }

  componentDidMount() {
    window.m = math;
    window.s = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    // check props
  }

  componentWillUnmount() {
    // destroy game
  }

  onChange(param, ev) {
    var obj = {};
    obj[param] = ev.target.value;
    this.setState(obj);
  }

  onSubmit(ev) {
    ev.preventDefault();
    var equationCode = math.compile(this.state.equation);
    var frameCount = window.actx.sampleRate * this.state.duration;
    var arrayBuffer = window.actx.createBuffer(1, frameCount, window.actx.sampleRate);
    var output = [];
    var scope = {};
    var channelData = arrayBuffer.getChannelData(0);
    console.log("start processing");
    var error = false;
    for(var i=0; i<frameCount && !error; i++) {
      scope.t = i / window.actx.sampleRate;
      try {
        channelData[i] = equationCode.eval(scope);
      } catch(err) {
        error = true;
        console.log("error in formula");
        this.setState({
          errorMessage: "Error in formula."
        })
      }
    }
    console.log("end processing");
    if(!error) {
      this.setState({
        errorMessage: null
      })
      var bufferSource = window.actx.createBufferSource();
      bufferSource.buffer = arrayBuffer;
      bufferSource.connect(window.actx.destination);
      bufferSource.start();
    }
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="number"
            value={this.state.duration}
            onChange={this.onChange.bind(this,"duration")}
            /><br/>
          <input
            type="text"
            value={this.state.equation}
            onChange={this.onChange.bind(this,"equation")}
            /><br/>
          <input type="submit"></input>
        </form>
        {this.state.errorMessage?<p>{this.state.errorMessage}</p>:null}
      </div>
    )
  }
}

const WaveMaker = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveMakerComponent);

export default WaveMaker;
