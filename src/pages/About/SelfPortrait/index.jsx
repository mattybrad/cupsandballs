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
    if(this.imgCtx) {
      for(var i = 0; i < 10; i ++) {
        var x = Math.floor(Math.random() * c.canvas.width);
        var y = Math.floor(Math.random() * c.canvas.height);
        var imgData = this.imgCtx.getImageData(x,y,1,1).data;
        var whiteness = Math.floor((imgData[0]+imgData[1]+imgData[2]) / 3);
        var trans = imgData[3] / 255;
        var faceDistance = Math.sqrt(Math.pow(x-90,2)+Math.pow(y-200,2));
        c.beginPath();
        c.arc(x,y,Math.max(2, faceDistance / 20),0,2*Math.PI);
        if(trans > 0.2) {
          c.fillStyle = "rgb("+[whiteness,whiteness,whiteness].join(",")+")";
        } else {
          c.fillStyle = Math.random() > 0.5 ? "#003300" : "#339933";
        }
        // not working yet...
        var closestEdge = Math.min(
          c.canvas.width - x,
          c.canvas.height - y
        )
        c.fill();
      }
    }
    window.requestAnimationFrame(this.doFrame.bind(this));
  }

  render() {
    return(
      <div className={this.props.className}>
        <SketchFrame width={300} height={400} />
        <canvas width={300} height={400} ref="cvs"></canvas>
      </div>
    )
  }
}
