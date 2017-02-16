import React from 'react';
import Oscillator from '../Oscillator';
import * as Actions from '../../actions/SoundToyActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class WaveMakerComponent extends React.Component {

  componentDidMount() {
    // note to self: use http://mathjs.org/ for parsing equations
  }

  componentDidUpdate(prevProps) {
    // check props
  }

  componentWillUnmount() {
    // destroy game
  }

  render() {
    return(
      <div ref="phaserDiv">{"f(t) = sin(t)"}</div>
    )
  }
}

const WaveMaker = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveMakerComponent);

export default WaveMaker;
