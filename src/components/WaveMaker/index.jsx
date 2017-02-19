import React from 'react';
import Oscillator from '../Oscillator';
import * as Actions from '../../actions/SoundToyActions';
import { connect } from 'react-redux';
import math from 'mathjs';
import NumberInput from '../NumberInput';
import SketchFrame from '../SketchFrame';

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
  }

  componentDidUpdate(prevProps, prevState) {

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
      <SketchFrame width={760} height={300}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <textarea
              value={this.state.equation}
              onChange={this.onChange.bind(this,"equation")}
              />
          </div>
          <NumberInput
            label="Duration"
            unit="seconds"
            onChange={this.onChange.bind(this,"duration")}
            defaultValue={2}
            min={1}
            max={1000}
            />
          <br/>
          <div onClick={this.onSubmit.bind(this)}>Click here to listen.</div>
        </form>
        {this.state.errorMessage?<p>{this.state.errorMessage}</p>:null}
      </SketchFrame>
    )
  }
}

const WaveMaker = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveMakerComponent);

export default WaveMaker;
