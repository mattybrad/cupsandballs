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
  }

  onPlayClick() {
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
