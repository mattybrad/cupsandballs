export const SET_BACKGROUND_ACTIVE = 'SET_BACKGROUND_ACTIVE';
export function setBackgroundActive(isActive) {
  return {
    type: SET_BACKGROUND_ACTIVE,
    isActive
  }
}

export const SET_MUSIC_ACTIVE = 'SET_MUSIC_ACTIVE';
export function setMusicActive(isActive) {
  return {
    type: SET_MUSIC_ACTIVE,
    isActive
  }
}

export const SET_CONSOLE_ACTIVE = 'SET_CONSOLE_ACTIVE';
export function setConsoleActive(isActive) {
  return {
    type: SET_CONSOLE_ACTIVE,
    isActive
  }
}

export const SET_DOM_ACTIVE = 'SET_DOM_ACTIVE';
export function setDomActive(isActive) {
  return {
    type: SET_DOM_ACTIVE,
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

export const SET_AUDIO_PLAYER = 'SET_AUDIO_PLAYER';
export function setAudioPlayer(audioPlayer) {
  return {
    type: SET_AUDIO_PLAYER,
    audioPlayer
  }
}
