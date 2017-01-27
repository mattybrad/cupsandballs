import React from 'react';
import classNames from 'classnames';
import DomDisplay from '../DomDisplay';
import Logger from '../Logger';
import styles from './index.css';

export default class Main extends React.Component {

  render() {
    return(
      <div className={classNames(styles.this)}>
        <div className={classNames(styles.content)}>
          {this.props.children}
        </div>
        <DomDisplay mainAppComponent={this.props.children} />
        <Logger />
      </div>
    )
  }
}
