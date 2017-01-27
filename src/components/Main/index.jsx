import React from 'react';
import classNames from 'classnames';
import CupsAndBalls from '../CupsAndBalls';
import styles from './index.css';

export default class Main extends React.Component {

  render() {
    return(
      <div className={classNames(styles.this)}>
        <div className={classNames(styles.content)}>
          {this.props.children}
        </div>
        <CupsAndBalls mainAppComponent={this.props.children} />
      </div>
    )
  }
}
