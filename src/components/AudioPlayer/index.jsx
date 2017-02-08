import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import styles from './index.css';
import * as Actions from '../../actions/BackgroundActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAudioPlayer: (audioPlayer) => {
      dispatch(Actions.setAudioPlayer(audioPlayer));
    }
  }
}


class AudioPlayerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
    this.actx = window.actx;
  }

  onPlayClick() {
    if(!this.state.playing) {
      this.audio = new Audio(this.props.src);
      this.audio.play();
      this.mediaNode = this.actx.createMediaElementSource(this.audio);
      this.analyser = this.actx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.maxDecibels = -10;
      this.mediaNode.connect(this.analyser);
      this.analyser.connect(this.actx.destination);
      this.props.setAudioPlayer(this);
    } else {
      this.audio.pause();
      this.props.setAudioPlayer(null);
    }
    this.setState({
      playing: !this.state.playing
    })
  }

  getAnalyserData() {
    var output = [];
    var frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(frequencyData);
    for(var i = frequencyData.length / 4; i < frequencyData.length / 2; i ++) {
      output.push(frequencyData[i] / 255);
    }
    window.fd = output;
    return output;
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        <span className={classNames(styles.title)}>{this.props.title||"Audio"}</span><br/>
        <span
          className={classNames(styles.button)}
          onClick={this.onPlayClick.bind(this)}>
          {this.state.playing?"Pause":"Play"}
        </span>
        <span>, </span>
        <span className={classNames(styles.button)}>Seek</span>
        <span>, </span>
        <span className={classNames(styles.button)}>Stop.</span>
      </div>
    )
  }
}

const AudioPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayerComponent);

export default AudioPlayer;
