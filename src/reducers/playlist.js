import { cloneDeep, Song } from '../helpers'
import { CLEAR_PLAYLIST, SET_PLAYLIST, UPDATE_SONG } from '../actions'
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
    case UPDATE_SONG: {
      const newSong = cloneDeep(action.payload)
      const newSongs = cloneDeep(state.songs)
      newSongs[Song.id(newSong)] = newSong
      return {
        ...cloneDeep(state),
        songs: newSongs
      }
    }
    case CLEAR_PLAYLIST:
      return {
        ...cloneDeep(initialState),
        playOrder: state.playOrder
      }
    default:
      return state
  }
}
