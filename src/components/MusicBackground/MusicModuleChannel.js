function getNoteNumFromString(s) {
  var octaveNumber = parseInt(s.match(/[0-9]+/)[0]);
  var noteName = s.match(/[A-Z][\#b]?/)[0];
  var sharpOrFlat = 0;
  if(noteName.length == 2) {
    if(noteName.charAt(1)=="#") sharpOrFlat = 1;
    else if(noteName.charAt(1)=="b") sharpOrFlat = -1;
  }
  var noteNumber = [-3,-1,0,2,4,5,7][noteName.charCodeAt(0)-65]+sharpOrFlat+12*octaveNumber+4;
  return noteNumber;
}

export default class MusicModuleChannel {
  constructor(actx, moduleNode, def) {
    this.actx = actx;
    this.moduleNode = moduleNode;
    this.steps = def.steps || 16;
    this.notes = (def.notes || []).map(function(n){
      return {
        step: n[1],
        note: getNoteNumFromString(n[0])
      }
    })
  }

  scheduleNotes(moduleStep, nextStepTime) {
    var thisStep = moduleStep % this.steps;
    var n;
    for(var i = 0; i < this.notes.length; i ++) {
      n = this.notes[i];
      if(n.step == thisStep) {
        var osc = this.actx.createOscillator();
        osc.type = "square";
        osc.frequency.value = 440 * Math.pow(2, (n.note - 49) / 12);
        osc.connect(this.moduleNode);
        osc.start(nextStepTime);
        osc.stop(nextStepTime + 0.1);
      }
    }
  }

}
