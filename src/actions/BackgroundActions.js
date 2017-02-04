export const SET_BACKGROUND_ACTIVE = 'SET_BACKGROUND_ACTIVE';
export function setBackgroundActive(isActive) {
  return {
    type: SET_BACKGROUND_ACTIVE,
    isActive
  }
}

export const SET_COLORS = 'SET_COLORS';
export function setColors(primaryColor, secondaryColor, image) {
  return {
    type: SET_COLORS,
    primaryColor,
    secondaryColor,
    image
  }
}

export const SET_MUSIC_DEF = 'SET_MUSIC_DEF';
export function setMusicDef(musicDef) {
  return {
    type: SET_MUSIC_DEF,
    musicDef
  }
}
