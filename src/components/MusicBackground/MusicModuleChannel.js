export default class MusicModuleChannel {
  constructor(actx, moduleNode, def) {
    this.actx = actx;
    this.moduleNode = moduleNode;
    this.steps = def.steps || 16;
    this.notes = def.notes || [];
  }

  scheduleNotes(moduleStep, nextStepTime) {
    var thisStep = moduleStep % this.steps;
    var n;
    for(var i = 0; i < this.notes.length; i ++) {
      n = this.notes[i];
      if(n[1] == thisStep) {
        var osc = this.actx.createOscillator();
        osc.type = "square";
        osc.frequency.value = 440;
        osc.connect(this.moduleNode);
        osc.start(nextStepTime);
        osc.stop(nextStepTime + 0.1);
      }
    }
  }

}
