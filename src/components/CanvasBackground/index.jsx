import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class CanvasBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className={classNames(styles.canvasBackground)}></div>
    )
  }
}
