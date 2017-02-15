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
    require.ensure([], () => {
      var PhaserLoader = require('../PhaserLoader');
      this.startGame();
    })
  }

  startGame() {
    // phaser stuff... or maybe not phaser for this
  }

  componentDidUpdate(prevProps) {
    // check props
  }

  componentWillUnmount() {
    // destroy game
  }

  render() {
    return(
      <div ref="phaserDiv">This will be the wave thing</div>
    )
  }
}

const WaveMaker = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveMakerComponent);

export default WaveMaker;
