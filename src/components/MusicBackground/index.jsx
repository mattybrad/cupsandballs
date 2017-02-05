import React from 'react';
import classNames from 'classnames';
import * as Actions from '../../actions/BackgroundActions';
import MusicModule from './MusicModule';
import { connect } from 'react-redux';

const LOOK_AHEAD_TIME = 0.1; // seconds
const TICK_INTERVAL = 25; // milliseconds
const STEPS_PER_BEAT = 4;

const mapStateToProps = (state) => {
  return {
		musicDef: state.Background.musicDef
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class MusicBackgroundComponent extends React.Component {
  constructor(props) {
    super(props);
    this.actx = null;
    this.currentModule = null;
    this.obsoleteModules = [];
    this.step = 0;
    this.nextStepTime = 0;
    this.tempo = 120;
  }

  componentDidMount() {
    this.actx = new (AudioContext||webkitAudioContext)();
    this.nextStepTime = this.actx.currentTime;
    this.tick();
	}

  componentDidUpdate(prevProps) {
    if(prevProps.musicDef != this.props.musicDef) {
      this.initNewModule();
    }
  }

  initNewModule() {
    if(this.currentModule) this.obsoleteModules.push(this.currentModule);
    this.currentModule = new MusicModule(this.actx, this.props.musicDef);
    for(var i = 0; i < this.obsoleteModules.length; i ++) {
      this.obsoleteModules[i].dying = true;
    }
    if(this.props.musicDef.tempo) this.tempo = this.props.musicDef.tempo;
  }

  tick() {
    // probably remove module tick at some point, but for now...
    if(this.currentModule) this.currentModule.tick();
    for(var i = 0; i < this.obsoleteModules.length; i ++) {
      this.obsoleteModules[i].tick();
    }
    // end of bit to be removed later

    while(this.nextStepTime < this.actx.currentTime + LOOK_AHEAD_TIME) {
      if(this.currentModule) this.currentModule.scheduleNotes(this.step, this.nextStepTime);
      for(var i = 0; i < this.obsoleteModules.length; i ++) {
        this.obsoleteModules[i].scheduleNotes(this.step, this.nextStepTime);
      }
      this.step ++;
      this.nextStepTime += 60 / this.tempo / STEPS_PER_BEAT;
    }
    this.removeDeadModules();
    setTimeout(this.tick.bind(this), TICK_INTERVAL);
  }

  removeDeadModules() {
    for(var i = 0; i < this.obsoleteModules.length; i ++) {
      if(!this.obsoleteModules[i].alive) {
        this.obsoleteModules.splice(i, 1);
        i --;
      }
    }
  }

  render() {
    return null;
  }
}

const MusicBackground = connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicBackgroundComponent);

export default MusicBackground;
