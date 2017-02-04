export default class MusicModule {
  constructor(actx, def) {
    this.actx = actx;
    this.def = def;
    setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    if(this.def.freq) {
      var osc = this.actx.createOscillator();
      osc.frequency.value = this.def.freq;
      osc.connect(this.actx.destination);
      osc.start();
      osc.stop(this.actx.currentTime + 0.1);
    }
  }

  kill() {

  }
}
