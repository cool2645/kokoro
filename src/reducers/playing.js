import { cloneDeep } from 'lodash-es'

import {
  CLEAR_PLAYLIST,
  NEXT_SRC,
  PAUSE,
  PLAY,
  SET_BUFFERED_TIME,
  SET_CURRENT_TIME,
  SET_PLAYLIST,
  SET_TOTAL_TIME,
  TOGGLE_PLAY
} from '../actions'

const initialState = {
  src: null,
  srcIndex: 0,
  song: null,
  currentTime: 0,
  totalTime: 0,
  bufferedTime: null,
  paused: true
}

export { initialState as initialPlayingState }

export default function (state = initialState, action) {
  switch (action) {
    case CLEAR_PLAYLIST:
      return cloneDeep(initialState)
    case SET_PLAYLIST:
      return {
        currentTime: 0,
        totalTime: 0,
        paused: false,
        song: cloneDeep(action.payload.songs[action.payload.playing]),
        src: action.payload.songs[action.payload.playing].src instanceof Array
          ? action.payload.songs[action.payload.playing].src[0]
          : action.payload.songs[action.payload.playing].src,
        srcIndex: 0
      }
    case NEXT_SRC: {
      const srcId = state.song.src instanceof Array
        ? state.srcIndex + 1 < state.song.src.length
          ? state.srcIndex + 1 : 0
        : 0
      if (srcId !== state.srcIndex && state.song.src instanceof Array) {
        return {
          ...cloneDeep(state),
          srcIndex: srcId,
          src: state.song.src[srcId]
        }
      } else return state
    }
    case SET_CURRENT_TIME:
      return {
        ...cloneDeep(state),
        currentTime: action.payload
      }
    case SET_TOTAL_TIME:
      return {
        ...cloneDeep(state),
        totalTime: action.payload
      }
    case SET_BUFFERED_TIME:
      return {
        ...cloneDeep(state),
        bufferedTime: cloneDeep(action.payload)
      }
    case PAUSE:
      return {
        ...cloneDeep(state),
        paused: true
      }
    case PLAY:
      return {
        ...cloneDeep(state),
        paused: false
      }
    case TOGGLE_PLAY:
      return {
        ...cloneDeep(state),
        paused: !state.paused
      }
    default:
      return state
  }
}
