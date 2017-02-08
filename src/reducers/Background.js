import * as Actions from '../actions/BackgroundActions';

export default function Background(
  state = {
    active: true,
    primaryColor: '#00cc00',
    secondaryColor: '#0000cc',
    audioPlayer: null
  },
  action
) {
  switch(action.type) {
    case Actions.SET_BACKGROUND_ACTIVE:
    return Object.assign({}, state, {
      active: action.isActive
    });

    case Actions.SET_COLORS:
    return Object.assign({}, state, {
      primaryColor: action.primaryColor,
      secondaryColor: action.secondaryColor,
      image: action.image
    });

    case Actions.SET_MUSIC_DEF:
    return Object.assign({}, state, {
      musicDef: action.musicDef
    });

    case Actions.SET_AUDIO_PLAYER:
    return Object.assign({}, state, {
      audioPlayer: action.audioPlayer
    })

    default:
    return state
  }
}
