import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import * as Actions from '../../actions/BackgroundActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
		primaryColor: state.Background.primaryColor,
		secondaryColor: state.Background.secondaryColor
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
        //ctx.globalAlpha = 0.03 + 0.07 * Math.max(0, 1 - timeDiff / 5000);
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

  oldPaint() {
		if(this.state.ctx && this.props.primaryColor && this.props.secondaryColor) {
			var ctx = this.state.ctx;
      var x, y;
			for(var i=0;i<3;i++){
        x = Math.random() * (ctx.canvas.width + 200) - 100;
        y = Math.random() * (ctx.canvas.height + 200) -100;
        var xDiff = 0;
        if(x<window.innerWidth/2-800/2-150||x>window.innerWidth/2+800/2+150) {
          xDiff = 1;
        }
        ctx.globalAlpha = (xDiff>0)?0.06:0.04;
				ctx.fillStyle = Math.random()>0.5?this.props.primaryColor:this.props.secondaryColor;
				ctx.beginPath();
        var r = 50 + 100 * Math.random();
        if(xDiff>0) ctx.rect(x-r,y-r,r*2,r*2);
        else ctx.arc(x,y,50 + 100 * Math.random(),0,2 * Math.PI);
				ctx.fill();
        ctx.beginPath();
        // if(xDiff>0){
        //   ctx.fillStyle="#ffffff";
        //   ctx.fillRect(x, 0, 1, ctx.canvas.height);
        // }
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
