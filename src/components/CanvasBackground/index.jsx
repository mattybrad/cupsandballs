import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import * as Actions from '../../actions/BackgroundActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
		primaryColor: state.Background.primaryColor,
		secondaryColor: state.Background.secondaryColor,
    image: state.Background.image,
    imageElement: null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class CanvasBackgroundComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: null,
      changeTime: Date.now()
    }
  }

  componentDidMount() {
		this.initCanvas();
    this.startAnimation();
	}

  initCanvas() {
		var ctx = this.refs.cvs.getContext("2d");
    var style = window.getComputedStyle(ctx.canvas);
		ctx.canvas.width = parseInt(style.width);
		ctx.canvas.height = parseInt(style.height);
		this.setState({
			ctx: ctx
		})
	}

  startAnimation() {
    window.requestAnimationFrame(this.paint.bind(this));
  }

  paint() {
    if(this.state.ctx && this.props.primaryColor && this.props.secondaryColor) {
      var ctx = this.state.ctx;
      var x, y;
      var timeDiff = Date.now() - this.state.changeTime;
      var numCircles = 2 + Math.round(10 * Math.max(0, 1 - timeDiff / 5000));
      for(var i=0;i<numCircles;i++){
        x = Math.random() * ctx.canvas.width;
        y = Math.random() * ctx.canvas.height;
        ctx.globalAlpha = 0.04;
        ctx.fillStyle = Math.random()>0.5?this.props.primaryColor:this.props.secondaryColor;
        ctx.beginPath();
        var r = 50 + 100 * Math.random();
        ctx.arc(x,y,r,0,2 * Math.PI);
				ctx.fill();
        ctx.beginPath();
      }
    }
    window.requestAnimationFrame(this.paint.bind(this));
  }

  componentDidUpdate(prevProps) {
    if(prevProps.primaryColor != this.props.primaryColor || prevProps.secondaryColor != this.props.secondaryColor) {
      this.setState({
        changeTime: Date.now()
      })
    }
    if(prevProps.image != this.props.image) {
      this.setState({
        image: this.props.image
      })
      var img = new Image();
      img.addEventListener('load',function(){
        alert("image loaded");
      }.bind(this));
      img.src = "test.jpg";
    }
  }

  render() {
    return(
      <canvas ref="cvs" className={classNames(styles.canvasBackground)}></canvas>
    )
  }
}

const CanvasBackground = connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasBackgroundComponent);

export default CanvasBackground;
