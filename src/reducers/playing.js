import { PAUSE, PLAY, SET_CURRENT_TIME, TOGGLE_PLAY } from '../actions'

const initialState = {
  currentTime: 0,
  totalTime: 0,
  pause: false
}

export default function (state = initialState, action) {
  switch (action) {
    case SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload
      }
    case PAUSE:
      return {
        ...state,
        pause: true
      }
    case PLAY:
      return {
        ...state,
        pause: false
      }
    case TOGGLE_PLAY:
      return {
        ...state,
        pause: !state.pause
      }
    default:
      return state
  }
}
