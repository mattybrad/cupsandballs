import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import * as Actions from '../../actions/BackgroundActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    active: state.Background.backgroundActive,
		primaryColor: state.Background.primaryColor,
		secondaryColor: state.Background.secondaryColor,
    image: state.Background.image,
    audioPlayer: state.Background.audioPlayer
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
      changeTime: Date.now(),
      imageElement: null
    }
    this.animationFrame = null;
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
    this.animationFrame = window.requestAnimationFrame(this.paint.bind(this));
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
        var r;
        r = 50 + 100 * Math.random();
        if(this.props.audioPlayer) {
          ctx.globalAlpha = 0.1;
          ctx.fillStyle = Math.random()>0.5?"#222222":"#000000";
        } else {
          ctx.globalAlpha = 0.04;
          ctx.fillStyle = Math.random()>0.5?this.props.primaryColor:this.props.secondaryColor;
          var otherColors = [
            '#cc0000',
            '#00cc00',
            '#0000cc',
            '#000000',
            '#663300'
          ]
          if(Math.random()>0.95) ctx.fillStyle = otherColors[Math.floor(Math.random() * otherColors.length)];
        }
        ctx.beginPath();
        ctx.arc(x,y,r,0,2 * Math.PI);
				ctx.fill();
        ctx.beginPath(); // um... what's this doing?
      }
    }
    if(this.state.imageElement && Math.random() > 0.98) {
      ctx.globalAlpha = 0.01;
      ctx.drawImage(
        this.state.imageElement,
        -this.state.imageElement.width/2,
        ctx.canvas.height/2 - this.state.imageElement.height/2);
    }
    if(this.props.audioPlayer) {
      var aData = this.props.audioPlayer.getAnalyserData();
      var aDataLen = aData.length;
      var barWidth = ctx.canvas.width / (aDataLen - 1);
      ctx.fillStyle = this.props.primaryColor;
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      ctx.moveTo(0, ctx.canvas.height);
      for(var i = 0; i < aDataLen; i ++) {
        ctx.lineTo(i>0?(i+0.5-Math.random())*barWidth:0, ctx.canvas.height * (1 - 0.5 * aData[i]));
      }
      ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = this.props.secondaryColor;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fill();
    }
    this.animationFrame = window.requestAnimationFrame(this.paint.bind(this));
  }

  componentDidUpdate(prevProps) {
    if(prevProps.primaryColor != this.props.primaryColor || prevProps.secondaryColor != this.props.secondaryColor) {
      this.setState({
        changeTime: Date.now(),
        imageElement: null
      })
    }
    if(prevProps.image != this.props.image) {
      this.setState({
        image: this.props.image,
        imageElement: null
      })
      var img = new Image();
      img.addEventListener('load',function(){
        this.setState({
          imageElement: img
        })
      }.bind(this));
      img.src = "/assets/images/"+this.props.image;
    }
    if(prevProps.audioPlayer != this.props.audioPlayer) {
      this.setState({
        changeTime: Date.now()
      })
    }
    if(prevProps.active && !this.props.active) {
      window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    } else if(!prevProps.active && this.props.active) {
      if(this.animationFrame) window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = window.requestAnimationFrame(this.paint.bind(this));
      this.initCanvas();
      this.setState({
        changeTime: Date.now()
      })
    }
  }

  render() {
    return(
        this.props.active ?
        <canvas ref="cvs" className={classNames(styles.canvasBackground)}></canvas> :
        null
    )
  }
}

const CanvasBackground = connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasBackgroundComponent);

export default CanvasBackground;
