import React from 'react';
import classNames from 'classnames';
import DomDisplay from '../DomDisplay';
import Logger from '../Logger';
import CanvasBackground from '../CanvasBackground';
import styles from './index.css';

//<DomDisplay mainAppComponent={this.props.children} />

export default class Main extends React.Component {

  componentDidUpdate() {
    console.log("rendering page: " + window.location.href);
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        <Logger />

        <CanvasBackground />
        <div className={classNames(styles.content)}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
