import * as Actions from '../actions/BackgroundActions';

export default function Background(
  state = {
    active: true,
    primaryColor: '#00cc00',
    secondaryColor: '#0000cc'
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
      secondaryColor: action.secondaryColor
    });

    default:
    return state
  }
}
