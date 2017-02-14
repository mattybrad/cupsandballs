export const UPDATE_SOUND_TOY = 'UPDATE_SOUND_TOY';
export function updateSoundToy(toy, vars) {
  return {
    type: UPDATE_SOUND_TOY,
    toy,
    vars
  }
}
