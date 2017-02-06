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
    this.attack = def.attack || 0.0;
    this.decay = def.decay || 0.5;
    this.sustain = def.sustain || 0.5;
    this.release = def.release || 1.0;
    if(def.arpeggiator) {
      this.arpeggiator = {};
      this.arpeggiator.pattern = def.arpeggiator.pattern || "random";
      this.arpeggiator.octaves = def.arpeggiator.octaves || 1;
      this.arpeggiator.notes = def.arpeggiator.notes;
      if(this.arpeggiator.pattern == "down" || this.arpeggiator.pattern == "down-up") {
        this.arpeggiator.notes.reverse();
      }
      if(this.arpeggiator.pattern == "up-down" || this.arpeggiator.pattern == "down-up") {
        this.arpeggiator.notes = this.arpeggiator.notes.concat(this.arpeggiator.notes.slice(1,-1).reverse());
      }
      this.steps = this.arpeggiator.notes.length;
      this.arpeggiator.lastNoteNum = null;
    } else {
      this.steps = def.steps || 16;
      this.notes = (def.notes || []).map(function(n){
        return {
          step: n[1],
          note: getNoteNumFromString(n[0]),
          duration: n[2]
        }
      })
    }
  }

  scheduleNotes(moduleStep, nextStepTime, currentStepLength) {
    var thisStep = moduleStep % this.steps;
    if(this.arpeggiator) {
      var arpNoteNum;
      if(this.arpeggiator.pattern == "random") {
        arpNoteNum = this.arpeggiator.lastNoteNum;
        while(arpNoteNum == this.arpeggiator.lastNoteNum && this.arpeggiator.notes.length > 1) {
          arpNoteNum = getNoteNumFromString(this.arpeggiator.notes[Math.floor(Math.random()*this.arpeggiator.notes.length)]) + 12 * Math.floor(Math.random()*this.arpeggiator.octaves);
        }
        this.arpeggiator.lastNoteNum = arpNoteNum;
      } else {
        arpNoteNum = getNoteNumFromString(this.arpeggiator.notes[thisStep]);
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
          this.scheduleOscillatorWithAmplifier(nextStepTime, n.note, n.duration * currentStepLength);
        }
      }
    }
  }

  scheduleOscillatorWithAmplifier(startTime, noteNumber, duration) {
    var osc = this.actx.createOscillator();
    var gainNode = this.actx.createGain();
    osc.type = "square";
    osc.frequency.value = 440 * Math.pow(2, (noteNumber - 49) / 12);
    osc.connect(gainNode);
    gainNode.connect(this.moduleNode);
    gainNode.gain.value = 0;
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(1, startTime + this.attack);
    gainNode.gain.linearRampToValueAtTime(this.sustain, startTime + this.attack + this.decay);
    gainNode.gain.setValueAtTime(this.sustain, startTime + duration);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration + this.release);
    osc.start(startTime);
    osc.stop(startTime + duration + this.release);
  }
}
