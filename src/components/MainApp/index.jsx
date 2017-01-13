import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class MainApp extends React.Component {
  componentDidMount() {
    this.props.onRender();
  }
  componentDidUpdate() {
    this.props.onRender();
  }

  render() {
    return(
      <div className={classNames(styles.outer)}>
        <div className={classNames(styles.inner)}>
          <h1>Main App</h1>
          <p>This is the main app!</p>
          <ul>
            <li>Testing</li>
            <li>Hello</li>
            <li>Hi</li>
          </ul>
        </div>
      </div>
    )
  }
}
