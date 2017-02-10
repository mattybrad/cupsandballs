import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import styles from './index.css';
import * as Actions from '../../actions/BackgroundActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    audioPlayer: state.Background.audioPlayer
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
      this.play();
    } else {
      this.pause();
    }
  }

  onStopClick() {
    this.stop();
  }

  pause() {
    this.audio.pause();
    if(this.props.audioPlayer == this) this.props.setAudioPlayer(null);
    this.setState({
      playing: false
    });
  }

  play() {
    if(!this.audio) {
      this.audio = new Audio(this.props.src);
      this.audio.play();
      this.mediaNode = this.actx.createMediaElementSource(this.audio);
      this.analyser = this.actx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.maxDecibels = -10;
      this.analyser.minDecibels = -110;
      this.mediaNode.connect(this.analyser);
      this.analyser.connect(this.actx.destination);
    } else {
      this.audio.play();
    }
    this.props.setAudioPlayer(this);
    this.setState({
      playing: true
    });
  }

  stop() {
    if(this.audio) {
      this.audio.currentTime = 0;
      this.pause();
    }
  }

  getAnalyserData() {
    var output = [];
    var frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(frequencyData);
    for(var i = frequencyData.length / 4; i < frequencyData.length / 2; i ++) {
      output.push(frequencyData[i] / 255);
    }
    return output;
  }

  componentDidUpdate(prevProps) {
    if(this.props.audioPlayer != this && this.state.playing) {
      this.pause();
    }
  }

  componentWillUnmount() {
    this.pause();
    this.props.setAudioPlayer(null);
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
        <span
          className={classNames(styles.button)}
          onClick={this.onStopClick.bind(this)}>
          Stop.
        </span>
      </div>
    )
  }
}

const AudioPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayerComponent);

export default AudioPlayer;
