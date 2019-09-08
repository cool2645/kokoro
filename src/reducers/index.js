import { combineReducers } from 'redux'

import { cloneDeep } from '../helpers'
import player from './player'
import playlist from './playlist'
import playing, { initialPlayingState } from './playing'

export default combineReducers({
  player,
  playing,
  playlist
})

export function saveState (state) {
  const exportedState = cloneDeep(state)
  delete exportedState.playing
  return exportedState
}

export function loadState (state) {
  const importedState = cloneDeep(state)
  importedState.playing = initialPlayingState
  importedState.playing.song = importedState.playlist.playing
    ? importedState.playlist.songs[importedState.playlist.playing] : null
  importedState.playing.src = importedState.playing.song
    ? importedState.playing.song.src instanceof Array
      ? importedState.playing.song.src[0]
      : importedState.playing.song.src
    : null
  return importedState
}
