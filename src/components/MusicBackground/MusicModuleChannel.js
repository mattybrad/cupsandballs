export default class MusicModuleChannel {
  constructor(actx, def) {
    this.steps = def.steps || 16;
    this.notes = def.notes || [];
  }

  tick() {
    console.log(this.notes[0][0])
  }

}
