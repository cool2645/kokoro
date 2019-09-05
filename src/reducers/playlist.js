import { CLEAR_PLAYLIST, SET_PLAYLIST } from '../actions'
import { PLAY_ORDER_LOOP } from '../constants'
import { Playlist } from '../helpers'

const initialState = {
  playlist: [],
  randomPool: [],
  coolDownPool: [],
  playing: null,
  playOrder: PLAY_ORDER_LOOP
}

export default function (state = initialState, action) {
  switch (action) {
    case SET_PLAYLIST:
      Playlist.validate(action.payload)
      return {
        playlist: [
          ...action.payload.playlist
        ],
        randomPool: [
          ...action.payload.randomPool
        ],
        coolDownPool: [
          ...action.payload.coolDownPool
        ],
        playing: action.payload.playing ? {
          ...action.payload.playing
        } : action.payload.playing,
        playOrder: action.payload.playOrder
          ? action.payload.playOrder : state.playOrder
      }
    case CLEAR_PLAYLIST:
      return {
        ...initialState,
        playOrder: state.playOrder
      }
    default:
      return state
  }
}
