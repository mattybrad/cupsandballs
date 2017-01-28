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
      ctx: null
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
			for(var i=0;i<3;i++){
        x = Math.random() * (ctx.canvas.width + 200) - 100;
        y = Math.random() * (ctx.canvas.height + 200) -100;
        var xDiff = 0;
        if(x<window.innerWidth/2-700/2-150||x>window.innerWidth/2+700/2+150) {
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
