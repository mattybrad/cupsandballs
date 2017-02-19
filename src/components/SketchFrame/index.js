import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

const frameThickness = 15;

export default class SketchFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width + frameThickness,
      height: this.props.height + frameThickness
    }
  }
  componentDidMount() {
    this.generateImage("left", true);
    this.generateImage("right", true);
    this.generateImage("top", false);
    this.generateImage("bottom", false);
  }

  generateImage(refName, vertical) {
    var c = this.refs[refName].getContext("2d");
    c.beginPath();
    var majorLength = vertical ? c.canvas.height : c.canvas.width;
    var minLength = 0.1 * majorLength;
    var l, a1, a2, b1, b2;
    for(var i = 0; i < 0.04 * majorLength; i ++) {
      l = minLength + Math.random() * (majorLength - minLength);
      a1 = Math.random() * (majorLength - l);
      a2 = a1 + l;
      b1 = Math.random() * frameThickness;
      b2 = Math.random() * frameThickness;
      if(vertical) {
        c.moveTo(b1,a1);
        c.lineTo(b2,a2);
      } else {
        c.moveTo(a1,b1);
        c.lineTo(a2,b2);
      }
    }
    c.rect(frameThickness/2, frameThickness/2, this.props.width, this.props.height);
    c.strokeStyle = "white";
    c.stroke();
  }

  render() {
    var divStyle = {
      width: this.state.width+"px",
      height: this.state.height+"px",
      top: -frameThickness/2+"px",
      left: -frameThickness/2+"px"
    }
    var contentStyle = {
      width: this.props.width+"px",
      height: this.props.height+"px"
    }
    return  (
      <div>
        <div className={classNames(styles.outer)}>
          <div className={classNames(styles.inner)} style={divStyle}>
            <canvas width={frameThickness} height={this.state.height} ref="left"></canvas>
            <canvas className={classNames(styles.rightCanvas)} width={frameThickness} height={this.state.height} ref="right"></canvas>
            <canvas width={this.state.width} height={frameThickness} ref="top"></canvas>
            <canvas className={classNames(styles.bottomCanvas)} width={this.state.width} height={frameThickness} ref="bottom"></canvas>
          </div>
        </div>
        <div style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
