import React from 'react';
import classNames from 'classnames';
import * as Actions from '../../actions/BackgroundActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
		musicDef: state.Background.musicDef
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class MusicBackgroundComponent extends React.Component {
  constructor(props) {
    super(props);
    this.actx = null;
    this.nodes = [];
  }

  componentDidMount() {
		this.initAudioContext();
	}

  initAudioContext() {
    this.actx = new (AudioContext||webkitAudioContext)();
	}

  componentDidUpdate(prevProps) {
    if(prevProps.musicDef != this.props.musicDef) {
      this.initMusic();
    }
  }

  initMusic() {
    var d = this.props.musicDef;
    if(d.freq) {
      var osc = this.actx.createOscillator();
      osc.type = "square";
      osc.frequency.value = d.freq;
      osc.start();
      osc.connect(this.actx.destination);
    }
  }

  render() {
    return null;
  }
}

const MusicBackground = connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicBackgroundComponent);

export default MusicBackground;
