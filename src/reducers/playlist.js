import { cloneDeep } from '../helpers'
import { CLEAR_PLAYLIST, SET_PLAYLIST } from '../actions'
import { PLAY_ORDER_LOOP } from '../constants'

const initialState = {
  songs: {},
  orderedList: [],
  orderedIndexOfPlaying: null,
  shuffledList: [],
  shuffledIndexOfPlaying: null,
  historyList: [],
  playing: null,
  playOrder: PLAY_ORDER_LOOP
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLAYLIST:
      return cloneDeep(action.payload)
    case CLEAR_PLAYLIST:
      return {
        ...cloneDeep(initialState),
        playOrder: state.playOrder
      }
    default:
      return state
  }
}
