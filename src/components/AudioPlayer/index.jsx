import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import styles from './index.css';

export default class AudioPlayer extends React.Component {

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
      this.analyser.fftSize = 32;
      this.mediaNode.connect(this.analyser);
      this.analyser.connect(this.actx.destination);
    } else {
      this.audio.pause();
    }
    this.setState({
      playing: !this.state.playing
    })
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
