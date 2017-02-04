export default class MusicModule {
  constructor(actx, def) {
    this.actx = actx;
    this.def = def;
    this.alive = true;
    this.mainNode = this.actx.createGain();
    this.mainNode.gain.value = 0.1;
    this.mainNode.connect(this.actx.destination);
    setTimeout(this.tick.bind(this), 1000);
  }

  tick() {
    if(this.def.freq) {
      var osc = this.actx.createOscillator();
      osc.frequency.value = this.def.freq;
      osc.connect(this.mainNode);
      osc.start();
      osc.stop(this.actx.currentTime + 0.1);
    }
    if(this.alive) setTimeout(this.tick.bind(this), 1000);
  }

}
