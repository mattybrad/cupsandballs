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
    if(def.arpeggiator) {
      this.arpeggiator = {};
      this.arpeggiator.notes = def.arpeggiator.notes;
      this.arpeggiator.pattern = def.arpeggiator.pattern || "random";
      this.steps = this.arpeggiator.notes.length;
    } else {
      this.steps = def.steps || 16;
      this.notes = (def.notes || []).map(function(n){
        return {
          step: n[1],
          note: getNoteNumFromString(n[0])
        }
      })
    }
  }

  scheduleNotes(moduleStep, nextStepTime) {
    var thisStep = moduleStep % this.steps;
    if(this.arpeggiator) {
      var arpNoteNum;
      if(this.arpeggiator.pattern == "up") {
        arpNoteNum = getNoteNumFromString(this.arpeggiator.notes[thisStep]);
      } else if(this.arpeggiator.pattern == "down") {
        arpNoteNum = getNoteNumFromString(this.arpeggiator.notes[thisStep]); // wrong but gonna sort this somewhere else
      } else if(this.arpeggiator.pattern == "random") {
        arpNoteNum = getNoteNumFromString(this.arpeggiator.notes[Math.floor(Math.random()*this.arpeggiator.notes.length)]);
      }
      var osc = this.actx.createOscillator();
      osc.type = "square";
      osc.frequency.value = 440 * Math.pow(2, (arpNoteNum - 49) / 12);
      osc.connect(this.moduleNode);
      osc.start(nextStepTime);
      osc.stop(nextStepTime + 0.1);
    } else {
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

}
