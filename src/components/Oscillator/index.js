export default class Oscillator {

  constructor(actx) {
    this.actx = actx;
    this.waveform = "square";
    var noteNumber = 20+Math.floor(Math.random()*30);
    this.volume = 0.05;
    this.attack = 0;
    this.decay = 0.1;
    this.sustain = 0.5;
    this.release = 0.5;
    var startTime = this.actx.currentTime;
    var duration = 0.2;
    this.moduleNode = this.actx.destination;

    var osc = this.actx.createOscillator();
    var gainNode = this.actx.createGain();
    osc.type = this.waveform;
    osc.frequency.value = 440 * Math.pow(2, (noteNumber - 49) / 12);
    osc.connect(gainNode);
    gainNode.connect(this.moduleNode);
    gainNode.gain.value = 0;
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(this.volume, startTime + this.attack);
    gainNode.gain.linearRampToValueAtTime(this.volume * this.sustain, startTime + this.attack + this.decay);
    gainNode.gain.setValueAtTime(this.volume * this.sustain, startTime + duration);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration + this.release);
    osc.start(startTime);
    osc.stop(startTime + duration + this.release);
  }

}
