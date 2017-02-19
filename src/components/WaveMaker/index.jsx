import React from 'react';
import Oscillator from '../Oscillator';
import * as Actions from '../../actions/SoundToyActions';
import { connect } from 'react-redux';
import math from 'mathjs';
import NumberInput from '../NumberInput';
import SketchFrame from '../SketchFrame';
import classNames from 'classnames';
import styles from './index.css';

const mapStateToProps = (state) => {
  return {
    exampleEquation: state.SoundToy.wavemaker.exampleEquation
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
      exampleEquation: null,
      duration: 1
    }
  }

  componentDidMount() {
    this.gainNode = window.actx.createGain();
    this.gainNode.gain.value = 0.3;
    this.gainNode.connect(window.actx.destination);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.exampleEquation != this.props.exampleEquation) {
      this.setState({
        exampleEquation: this.props.exampleEquation,
        equation: this.props.exampleEquation
      }, this.onSubmit.bind(this))
    }
  }

  onChange(param, ev) {
    var obj = {};
    var valid = true;
    if(param=="equation") {
      if(ev.target.value.slice(0,5)!="f(t)=") valid = false;
      obj[param] = ev.target.value.slice(5);
    } else {
      obj[param] = ev.target.value;
    }
    if(valid) {
      this.setState(obj);
    }
  }

  onSubmit(ev) {
    if(ev) ev.preventDefault();
    var equationCode = math.compile(this.state.equation);
    var frameCount = window.actx.sampleRate * this.state.duration;
    var arrayBuffer = window.actx.createBuffer(1, frameCount, window.actx.sampleRate);
    var output = [];
    var scope = {
      L: this.state.duration
    };
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
      bufferSource.connect(this.gainNode);
      bufferSource.start();
    }
  }

  setEquation(equation) {
    this.setState({
      equation: equation
    })
  }

  render() {
    return(
      <SketchFrame width={760} height={300}>
        <div className={classNames(styles.this)}>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div>
              <textarea
                value={"f(t)="+this.state.equation}
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
            <span onClick={this.onSubmit.bind(this)}>Click here to listen.</span>
          </form>
          {this.state.errorMessage?<p>{this.state.errorMessage}</p>:null}
        </div>
      </SketchFrame>
    )
  }
}

const WaveMaker = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveMakerComponent);

export default WaveMaker;
