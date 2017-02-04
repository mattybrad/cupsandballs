export default class MusicModuleChannel {
  constructor(actx, def) {
    this.actx = actx;
    this.steps = def.steps || 16;
    this.notes = def.notes || [];
  }

  scheduleNotes(moduleStep, nextStepTime) {
    setTimeout(function(){
      console.log("PLAY STEP "+moduleStep);
    }, (nextStepTime - this.actx.currentTime)*1000);
  }

}
