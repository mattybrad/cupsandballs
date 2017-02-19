import * as Actions from '../actions/SoundToyActions';

export default function SoundToy(
  state = {
    randomspiel: {
      cols: 10,
      rows: 5,
      ballRate: 60,
      ballSize: 50
    },
    wavemaker: {
      exampleEquation: null
    }
  },
  action
) {
  switch(action.type) {
    case Actions.UPDATE_SOUND_TOY:
    var updateObject = {};
    updateObject[action.toy] = Object.assign({}, state[action.toy], action.vars);
    return Object.assign({}, state, updateObject);

    default:
    return state
  }
}
