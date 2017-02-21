import React from 'react';
import classNames from 'classnames';
import SketchFrame from '../../../components/SketchFrame';
import styles from './index.css';

export default class SelfPortait extends React.Component {
  componentDidMount() {
    this.ctx = this.refs.cvs.getContext("2d");
    var img = new Image();
    img.addEventListener("load", this.onImageLoaded.bind(this, img));
    img.src = "/assets/images/portrait.png";
    this.doFrame();
    this.startTime = Date.now();
  }

  onImageLoaded(img) {
    var imgCanvas = document.createElement("canvas");
    imgCanvas.width = 300;
    imgCanvas.height = 400;
    var imgContext = imgCanvas.getContext('2d');
    imgContext.drawImage(img, 0, 0);
    this.imgCtx = imgContext;
  }

  doFrame() {
    var c = this.ctx;
    var elapsed = Date.now() - this.startTime;
    if(this.imgCtx) {
      for(var i = 0; i < 10; i ++) {
        var x = Math.floor(Math.random() * c.canvas.width);
        var y = Math.floor(Math.random() * c.canvas.height);
        var imgData = this.imgCtx.getImageData(x,y,1,1).data;
        var whiteness = Math.floor((imgData[0]+imgData[1]+imgData[2]) / 3);
        var trans = imgData[3] / 255;
        var faceDistance = Math.sqrt(Math.pow(x-90,2)+Math.pow(y-200,2));
        c.beginPath();
        c.arc(x,y,Math.max(2, 30 * (1 - elapsed / 8000), faceDistance / 20),0,2*Math.PI);
        if(trans > 0.2) {
          c.globalAlpha = 0.6;
          c.fillStyle = "rgb("+[whiteness,whiteness,whiteness].join(",")+")";
        } else {
          c.globalAlpha = 0.3;
          c.fillStyle = Math.random() > 0.5 ? "#cccccc" : "#999999";
        }
        c.fill();
      }
    }
    window.requestAnimationFrame(this.doFrame.bind(this));
  }

  render() {
    return(
      <SketchFrame width={300} height={400}>
        <canvas width={300} height={400} ref="cvs"></canvas>
      </SketchFrame>
    )
  }
}
