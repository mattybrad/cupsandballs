import MusicModuleChannel from './MusicModuleChannel';

const MODULE_VOLUME = 0.1;
const LOOK_AHEAD_TIME = 0.1; // seconds
const TICK_INTERVAL = 25; // milliseconds

export default class MusicModule {
  constructor(actx, def) {
    this.actx = actx;
    this.def = def;
    this.step = 0;
    this.nextStepTime = actx.currentTime;
    this.dying = false;
    this.alive = true;
    this.lastTickTime = this.actx.currentTime;
    this.mainNode = this.actx.createGain();
    this.mainNode.gain.value = 0;
    this.mainNode.connect(this.actx.destination);
    if(this.def.channels) {
      this.channels = this.def.channels.map(function(channelDef) {
        return new MusicModuleChannel(this.actx, this.mainNode, channelDef);
      }.bind(this));
    } else {
      this.channels = [];
    }
    setTimeout(this.tick.bind(this), TICK_INTERVAL);
  }

  tick() {
    var timeSinceTick = this.actx.currentTime - this.lastTickTime;
    while(this.nextStepTime < this.actx.currentTime + LOOK_AHEAD_TIME) {
      for(var i = 0; i < this.channels.length; i ++) {
        this.channels[i].scheduleNotes(this.step, this.nextStepTime);
      }
      this.step ++;
      this.nextStepTime += 60 / 120;
    }
    if(this.dying) {
      this.mainNode.gain.value = Math.max(0, this.mainNode.gain.value - MODULE_VOLUME * timeSinceTick / 10);
    } else if(this.mainNode.gain.value < MODULE_VOLUME) {
      this.mainNode.gain.value = Math.min(1, this.mainNode.gain.value + MODULE_VOLUME * timeSinceTick / 10);
    }
    this.lastTickTime = this.actx.currentTime;
    if(this.dying && this.mainNode.gain.value == 0) this.alive = false;
    if(this.alive) setTimeout(this.tick.bind(this), TICK_INTERVAL);
  }

}
