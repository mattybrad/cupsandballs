import * as Actions from '../actions/SoundToyActions';

export default function SoundToy(
  state = {
    randomspiel: {cols: 30}
  },
  action
) {
  switch(action.type) {
    case Actions.UPDATE_SOUND_TOY:
    return Object.assign({}, state, {
      randomspiel: Object.assign({}, state.randomspiel, action.vars)
    });

    default:
    return state
  }
}
