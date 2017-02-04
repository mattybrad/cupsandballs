const MODULE_VOLUME = 0.1;

export default class MusicModule {
  constructor(actx, def) {
    this.actx = actx;
    this.def = def;
    this.dying = false;
    this.alive = true;
    this.lastTickTime = this.actx.currentTime;
    this.mainNode = this.actx.createGain();
    this.mainNode.gain.value = 0;
    this.mainNode.connect(this.actx.destination);
    setTimeout(this.tick.bind(this), 100);
  }

  tick() {
    var timeSinceTick = this.actx.currentTime - this.lastTickTime;
    if(this.def.freq) {
      var osc = this.actx.createOscillator();
      osc.frequency.value = this.def.freq;
      osc.connect(this.mainNode);
      osc.start();
      osc.stop(this.actx.currentTime + 0.03);
    }
    if(this.dying) {
      this.mainNode.gain.value = Math.max(0, this.mainNode.gain.value - MODULE_VOLUME * timeSinceTick / 10);
    } else if(this.mainNode.gain.value < MODULE_VOLUME) {
      this.mainNode.gain.value = Math.min(1, this.mainNode.gain.value + MODULE_VOLUME * timeSinceTick / 10);
    }
    this.lastTickTime = this.actx.currentTime;
    if(this.dying && this.mainNode.gain.value == 0) this.alive = false;
    if(this.alive) setTimeout(this.tick.bind(this), 100);
  }

}
