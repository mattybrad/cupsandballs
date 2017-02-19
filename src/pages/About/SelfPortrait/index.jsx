import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class SelfPortait extends React.Component {
  componentDidMount() {
    this.ctx = this.refs.cvs.getContext("2d");
    this.doFrame();
  }

  doFrame() {
    this.ctx.fillRect(Math.random()*this.ctx.canvas.width,Math.random()*this.ctx.canvas.height,2,2);
    window.requestAnimationFrame(this.doFrame.bind(this));
  }

  render() {
    return(
      <canvas className={this.props.className} ref="cvs"></canvas>
    )
  }
}
