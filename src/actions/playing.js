export const PAUSE = 'PAUSE'
export const PLAY = 'PLAY'
export const TOGGLE_PLAY = 'TOGGLE_PLAY'
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'

export function pause () {
  return {
    type: PAUSE
  }
}

export function play () {
  return {
    type: PLAY
  }
}

export function togglePlay () {
  return {
    type: TOGGLE_PLAY
  }
}

export function setCurrentTime (time) {
  return {
    type: SET_CURRENT_TIME,
    payload: time
  }
}
