export const PAUSE = 'PAUSE'
export const PLAY = 'PLAY'
export const TOGGLE_PLAY = 'TOGGLE_PLAY'
export const NEXT = 'NEXT'
export const PREVIOUS = 'PREVIOUS'

export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'

export const SET_PLAY_ORDER = 'SET_PLAY_ORDER'
export const NEXT_PLAY_ORDER = 'NEXT_PLAY_ORDER'

export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const SET_NEXT_SONG = 'SET_NEXT_SONG'

export const REMOVE_SONG = 'REMOVE_SONG'
export const SET_PLAYLIST = 'SET_PLAYLIST'
export const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'

export const SET_VOLUME = 'SET_VOLUME'

export function pause () {
  return {
    type: PAUSE
  }
}

export function play () {
  return {
    type: PLAY
  }
}

export function togglePlay () {
  return {
    type: TOGGLE_PLAY
  }
}

export function next () {
  return {
    type: NEXT
  }
}

export function previous () {
  return {
    type: PREVIOUS
  }
}

export function setCurrentTime (time) {
  return {
    type: SET_CURRENT_TIME,
    payload: time
  }
}

export function setPlayOrder (playOrder) {
  return {
    type: SET_PLAY_ORDER,
    payload: playOrder
  }
}

export function nextPlayOrder () {
  return {
    type: NEXT_PLAY_ORDER
  }
}

function getSongSrcOrNull (song) {
  return typeof song === 'object' && song
    ? song.src instanceof Array
      ? song.src.length ? song.src[0] : null
      : song.src
    : song
}

export function setCurrentSong (songOrIndex) {
  const srcOrIndex = getSongSrcOrNull(songOrIndex)
  return {
    type: SET_CURRENT_SONG,
    payload: srcOrIndex
  }
}

export function setNextSong (songOrIndex) {
  const srcOrIndex = getSongSrcOrNull(songOrIndex)
  return {
    type: SET_NEXT_SONG,
    payload: srcOrIndex
  }
}

export function removeSong (songOrIndex) {
  const srcOrIndex = getSongSrcOrNull(songOrIndex)
  return {
    type: REMOVE_SONG,
    payload: srcOrIndex
  }
}

export function setPlaylist (playlist) {
  return {
    type: SET_PLAYLIST,
    payload: playlist
  }
}

export function clearPlaylist () {
  return {
    type: CLEAR_PLAYLIST
  }
}

export function setVolume (volume) {
  return {
    type: SET_VOLUME,
    payload: volume
  }
}
