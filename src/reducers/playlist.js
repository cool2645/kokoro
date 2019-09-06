import { cloneDeep } from 'lodash-es'

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
  switch (action) {
    case SET_PLAYLIST:
      return cloneDeep(action.payload)
    case CLEAR_PLAYLIST:
      return {
        ...initialState,
        playOrder: state.playOrder
      }
    default:
      return state
  }
}
