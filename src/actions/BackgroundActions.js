export const SET_BACKGROUND_ACTIVE = 'SET_BACKGROUND_ACTIVE';
export function setBackgroundActive(isActive) {
  return {
    type: SET_BACKGROUND_ACTIVE,
    isActive
  }
}

export const SET_COLORS = 'SET_COLORS';
export function setColors(primaryColor, secondaryColor) {
  return {
    type: SET_COLORS,
    primaryColor,
    secondaryColor
  }
}
