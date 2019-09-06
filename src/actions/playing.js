export const PAUSE = 'PAUSE'
export const PLAY = 'PLAY'
export const TOGGLE_PLAY = 'TOGGLE_PLAY'
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
export const SET_TOTAL_TIME = 'SET_TOTAL_TIME'
export const SET_BUFFERED_TIME = 'SET_BUFFERED_TIME'
export const NEXT_SRC = 'NEXT_SRC'

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

export function setTotalTime (time) {
  return {
    type: SET_TOTAL_TIME,
    payload: time
  }
}

export function setBufferedTime (buffered) {
  return {
    type: SET_BUFFERED_TIME,
    payload: buffered
  }
}

export function nextSrc () {
  return {
    type: NEXT_SRC
  }
}
