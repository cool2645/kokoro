export const SET_VOLUME = 'SET_VOLUME'
export const SET_SPEED = 'SET_SPEED'

export function setVolume (volume) {
  return {
    type: SET_VOLUME,
    payload: volume
  }
}

export function setSpeed (speedRate) {
  return {
    type: SET_SPEED,
    payload: speedRate
  }
}
