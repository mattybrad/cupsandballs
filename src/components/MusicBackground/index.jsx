import React from 'react';
import classNames from 'classnames';
import * as Actions from '../../actions/BackgroundActions';
import MusicModule from './MusicModule';
import { connect } from 'react-redux';

const LOOK_AHEAD_TIME = 0.2; // seconds
const TICK_INTERVAL = 25; // milliseconds
const STEPS_PER_BEAT = 4;
const DEFAULT_TEMPO = 120; // bpm
const TEMPO_RAMP_RATE = 5; // bpm per second

const mapStateToProps = (state) => {
  return {
    active: state.Background.musicActive,
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
    this.lookAheadTime = LOOK_AHEAD_TIME;
    this.tickInterval = TICK_INTERVAL;
    this.windowBlurred = false;
    this.actx = window.actx;
    this.currentModule = null;
    this.obsoleteModules = [];
    this.step = 0;
    this.nextStepTime = 0;
    this.lastTickTime = 0;
    this.targetTempo = this.tempo = null;
    this.firstModuleLoaded = false;
    this.tickTimeout = null;
  }

  onBlur() {
    this.lookAheadTime = 3;
    this.tickInterval = 1000;
    if(this.props.active) {
      if(this.tickTimeout) clearTimeout(this.tickTimeout);
      this.tick();
    }
  }

  onFocus() {
    this.lookAheadTime = LOOK_AHEAD_TIME;
    this.tickInterval = TICK_INTERVAL;
  }

  componentDidMount() {
    window.addEventListener("blur", this.onBlur.bind(this));
    window.addEventListener("focus", this.onFocus.bind(this));
    this.nextStepTime = this.actx.currentTime;
    this.lastTickTime = this.actx.currentTime;
    this.tick();
	}

  componentDidUpdate(prevProps) {
    if(prevProps.musicDef != this.props.musicDef) {
      this.initNewModule();
    }
    if(prevProps.active && !this.props.active) {
      window.clearTimeout(this.tickTimeout);
    } else if(!prevProps.active && this.props.active) {
      window.clearTimeout(this.tickTimeout);
      this.tick();
    }
  }

  initNewModule() {
    if(this.currentModule) this.obsoleteModules.push(this.currentModule);
    this.currentModule = new MusicModule(this.actx, this.props.musicDef);
    for(var i = 0; i < this.obsoleteModules.length; i ++) {
      this.obsoleteModules[i].dying = true;
    }
    if(this.props.musicDef.tempo) this.targetTempo = this.props.musicDef.tempo;

    // if this is the first module to play, go straight to its tempo without ramping
    if(!this.firstModuleLoaded) {
      this.firstModuleLoaded = true;
      if(this.targetTempo == null) this.targetTempo = DEFAULT_TEMPO; // in case module has no tempo
      this.tempo = this.targetTempo;
    }
  }

  tick() {
    // don't do stuff until a module has been laoded
    if(this.firstModuleLoaded && !this.windowBlurred) {

      // probably remove module tick at some point, but for now...
      if(this.currentModule) this.currentModule.tick();
      for(var i = 0; i < this.obsoleteModules.length; i ++) {
        this.obsoleteModules[i].tick();
      }
      // end of bit to be removed later

      this.rampTempo();
      var currentStepLength = 60 / this.tempo / STEPS_PER_BEAT;

      while(this.nextStepTime < this.actx.currentTime + this.lookAheadTime) {
        if(this.currentModule) this.currentModule.scheduleNotes(this.step, this.nextStepTime, currentStepLength);
        for(var i = 0; i < this.obsoleteModules.length; i ++) {
          this.obsoleteModules[i].scheduleNotes(this.step, this.nextStepTime, currentStepLength);
        }
        this.step ++;
        this.nextStepTime += currentStepLength;
      }
      this.removeDeadModules();
      this.lastTickTime = this.actx.currentTime;

    }
    this.tickTimeout = setTimeout(this.tick.bind(this), this.tickInterval);
  }

  rampTempo() {
    var timeSinceTick = this.actx.currentTime - this.lastTickTime;
    if(this.tempo < this.targetTempo) {
      this.tempo = Math.min(this.targetTempo, this.tempo + TEMPO_RAMP_RATE * timeSinceTick);
    } else if(this.tempo > this.targetTempo) {
      this.tempo = Math.max(this.targetTempo, this.tempo - TEMPO_RAMP_RATE * timeSinceTick);
    }
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
