import React from 'react';
import classNames from 'classnames';
import DomDisplay from '../DomDisplay';
import Logger from '../Logger';
import CanvasBackground from '../CanvasBackground';
import MusicBackground from '../MusicBackground';
import styles from './index.css';
import Header from '../Header';

export default class Main extends React.Component {

  componentDidUpdate() {
    console.log("rendering page: " + window.location.href);
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        <Logger />
        <DomDisplay mainAppComponent={this.props.children} store={this.props.store} />
        <CanvasBackground />
        <MusicBackground />
        <div className={classNames(styles.content)}>
          <Header />
          {this.props.children}
        </div>
      </div>
    )
  }
}
