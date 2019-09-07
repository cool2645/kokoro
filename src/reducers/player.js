import { SET_SPEED, SET_VOLUME } from '../actions'

const initialState = {
  volume: 1,
  speed: 1
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_VOLUME:
      if (typeof action.payload !== 'number') {
        return state
      }
      return {
        ...state,
        volume: action.payload
      }
    case SET_SPEED:
      if (typeof action.payload !== 'number') {
        return state
      }
      return {
        ...state,
        speed: action.payload
      }
    default:
      return state
  }
}
