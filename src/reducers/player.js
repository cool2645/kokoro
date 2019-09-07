import { SET_SPEED, SET_VOLUME } from '../actions'

const initialState = {
  volume: 1,
  speed: 1
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_VOLUME:
      return {
        ...state,
        volume: action.payload
      }
    case SET_SPEED:
      return {
        ...state,
        speed: action.payload
      }
    default:
      return state
  }
}
