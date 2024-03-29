import { PLAY_ORDER, PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE } from '../constants'
import { Song } from '../helpers'

export const SET_PLAYLIST = 'SET_PLAYLIST'
export const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'

function shuffle (original) {
  const shuffled = [...original]
  shuffled.sort(() => (Math.random() - 0.5))
  return shuffled
}

function swap (original) {
  const swapped = [...original]
  const a = swapped[0]
  swapped[0] = swapped[swapped.length - 1]
  swapped[swapped.length - 1] = a
  return swapped
}

function createSetPlaylistAction (payload) {
  return {
    type: SET_PLAYLIST,
    payload
  }
}

function pushHistory (historyList, song) {
  if (!song) return historyList
  const newHistoryList = [...historyList]
  const historyIndex = historyList.indexOf(song)
  if (historyIndex !== -1) {
    newHistoryList.splice(historyIndex, 1)
  }
  newHistoryList.unshift(song)
  return newHistoryList
}

export function setPlayOrder (playOrder) {
  return (dispatch, getState) => {
    const { playlist } = getState()
    const newPlaylistState = {
      ...playlist,
      playOrder
    }
    if (playOrder === PLAY_ORDER_SHUFFLE) {
      const shuffledList = shuffle(playlist.orderedList)
      const shuffledIndexOfPlaying = shuffledList.indexOf(playlist.playing)
      newPlaylistState.shuffledList = shuffledList
      newPlaylistState.shuffledIndexOfPlaying = shuffledIndexOfPlaying
    }
    dispatch(createSetPlaylistAction(newPlaylistState))
  }
}

export function nextPlayOrder () {
  return (dispatch, getState) => {
    const { playlist } = getState()
    const currentPlayOrder = playlist.playOrder
    const currentPlayOrderIndex = PLAY_ORDER.indexOf(currentPlayOrder)
    const nextPlayOrderIndex = currentPlayOrderIndex + 1 >= PLAY_ORDER.length ? 0 : currentPlayOrderIndex + 1
    const nextPlayOrder = PLAY_ORDER[nextPlayOrderIndex]
    setPlayOrder(nextPlayOrder)(dispatch, getState)
  }
}

export function next () {
  return (dispatch, getState) => {
    const { playlist } = getState()
    const newPlaylistState = { ...playlist }
    if (playlist.orderedList.length) {
      if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
        if (playlist.shuffledIndexOfPlaying + 1 === playlist.shuffledList.length) {
          let newShuffledList = shuffle(playlist.orderedList)
          if (newShuffledList[0] === playlist.shuffledList[playlist.shuffledList.length - 1]) {
            newShuffledList = swap(newShuffledList)
          }
          newPlaylistState.shuffledList.push(...newShuffledList)
        }
        newPlaylistState.shuffledIndexOfPlaying++
        newPlaylistState.playing = newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying]
        newPlaylistState.orderedIndexOfPlaying = playlist.orderedList.indexOf(newPlaylistState.playing)
      } else {
        if (playlist.orderedIndexOfPlaying + 1 >= playlist.orderedList.length) {
          newPlaylistState.orderedIndexOfPlaying = 0
        } else {
          newPlaylistState.orderedIndexOfPlaying++
        }
        newPlaylistState.playing = newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying]
      }
      newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing)
    }
    dispatch(createSetPlaylistAction(newPlaylistState))
  }
}

export function autoNext () {
  return (dispatch, getState) => {
    const { playlist } = getState()
    if (playlist.playOrder === PLAY_ORDER_SINGLE) {
      dispatch(createSetPlaylistAction(playlist))
    } else {
      next()(dispatch, getState)
    }
  }
}

export function previous () {
  return (dispatch, getState) => {
    const { playlist } = getState()
    const newPlaylistState = { ...playlist }
    if (playlist.orderedList.length) {
      if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
        if (playlist.shuffledIndexOfPlaying - 1 === -1) {
          let newShuffledList = shuffle(playlist.orderedList)
          if (newShuffledList[newShuffledList.length - 1] === playlist.shuffledList[0]) {
            newShuffledList = swap(newShuffledList)
          }
          newPlaylistState.shuffledList.unshift(...newShuffledList)
          newPlaylistState.shuffledIndexOfPlaying += newShuffledList.length
        }
        newPlaylistState.shuffledIndexOfPlaying--
        newPlaylistState.playing = newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying]
        newPlaylistState.orderedIndexOfPlaying = playlist.orderedList.indexOf(newPlaylistState.playing)
      } else {
        if (playlist.orderedIndexOfPlaying - 1 === -1) {
          newPlaylistState.orderedIndexOfPlaying = playlist.orderedList.length - 1
        } else {
          newPlaylistState.orderedIndexOfPlaying--
        }
        newPlaylistState.playing = newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying]
      }
      newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing)
    }
    dispatch(createSetPlaylistAction(newPlaylistState))
  }
}

export function setCurrentSong (song) {
  return (dispatch, getState) => {
    const { playlist } = getState()
    const newPlaylistState = { ...playlist }
    let songId
    if (typeof song === 'number') {
      songId = playlist.orderedList[song]
    } else if (typeof song === 'string') {
      songId = song
    } else {
      songId = Song.id(song)
      newPlaylistState.songs[songId] = song
      if (playlist.orderedList.indexOf(songId) === -1) {
        newPlaylistState.orderedList.splice(
          newPlaylistState.orderedIndexOfPlaying + 1, 0, songId
        )
      }
    }
    newPlaylistState.playing = songId
    newPlaylistState.orderedIndexOfPlaying = playlist.orderedList.indexOf(songId)
    if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
      newPlaylistState.shuffledList = shuffle(newPlaylistState.orderedList)
      newPlaylistState.shuffledIndexOfPlaying = newPlaylistState.shuffledList.indexOf(songId)
    }
    newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing)
    dispatch(createSetPlaylistAction(newPlaylistState))
  }
}

export function setNextSong (song) {
  return (dispatch, getState) => {
    const { playlist } = getState()
    const newPlaylistState = { ...playlist }
    let songId
    if (typeof song === 'number') {
      songId = playlist.orderedList[song]
    } else if (typeof song === 'string') {
      songId = song
    } else {
      songId = Song.id(song)
      newPlaylistState.songs[songId] = song
    }
    if (songId !== playlist.playing) {
      const orderedIndexReduction = playlist.orderedList.slice(0, playlist.orderedIndexOfPlaying)
        .filter(item => item === songId).length
      newPlaylistState.orderedList = playlist.orderedList.filter(item => item !== songId)
      newPlaylistState.orderedIndexOfPlaying -= orderedIndexReduction
      newPlaylistState.orderedList.splice(newPlaylistState.orderedIndexOfPlaying + 1, 0, songId)
      if (playlist.playOrder === PLAY_ORDER_SHUFFLE &&
        !(playlist.shuffledIndexOfPlaying + 1 < playlist.shuffledList.length &&
          playlist.shuffledList[playlist.shuffledIndexOfPlaying + 1] === songId
        )
      ) {
        newPlaylistState.shuffledList.splice(playlist.shuffledIndexOfPlaying + 1, 0, songId)
      }
      if (newPlaylistState.orderedList.length === 1) {
        newPlaylistState.playing = newPlaylistState.orderedList[0]
      }
    }
    dispatch(createSetPlaylistAction(newPlaylistState))
  }
}

export function removeSong (song) {
  return (dispatch, getState) => {
    const { playlist } = getState()
    const newPlaylistState = { ...playlist }
    let songId
    if (typeof song === 'number') {
      songId = playlist.orderedList[song]
    } else if (typeof song === 'string') {
      songId = song
    } else {
      songId = Song.id(song)
    }
    const orderedIndexReduction = playlist.orderedList.slice(0, playlist.orderedIndexOfPlaying)
      .filter(item => item === songId).length
    newPlaylistState.orderedList = playlist.orderedList.filter(item => item !== songId)
    if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
      const shuffledIndexReduction = playlist.shuffledList.slice(0, playlist.shuffledIndexOfPlaying)
        .filter(item => item === songId).length
      newPlaylistState.shuffledList = playlist.shuffledList.filter(item => item !== songId)
      newPlaylistState.shuffledIndexOfPlaying -= shuffledIndexReduction
      if (newPlaylistState.shuffledIndexOfPlaying >= newPlaylistState.shuffledList.length) {
        newPlaylistState.shuffledIndexOfPlaying = newPlaylistState.shuffledList.length - 1 > 0
          ? newPlaylistState.shuffledList.length - 1 : 0
      }
      newPlaylistState.orderedIndexOfPlaying = newPlaylistState.shuffledList.length - 1 > 0
        ? newPlaylistState.orderedList.indexOf(
          newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying]
        ) : 0
    } else {
      newPlaylistState.orderedIndexOfPlaying -= orderedIndexReduction
      if (newPlaylistState.orderedIndexOfPlaying >= newPlaylistState.orderedList.length) {
        newPlaylistState.orderedIndexOfPlaying = newPlaylistState.orderedList.length - 1 > 0
          ? newPlaylistState.orderedList.length - 1 : 0
      }
    }
    newPlaylistState.playing = newPlaylistState.orderedList.length
      ? newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying] : null
    newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing)
    dispatch(createSetPlaylistAction(newPlaylistState))
  }
}

export function setPlaylist (songs, currentSong, playOrder) {
  return (dispatch, getState) => {
    const { playlist } = getState()
    const newPlaylistState = {
      ...playlist,
      songs: {},
      orderedList: [],
      orderedIndexOfPlaying: null,
      shuffledList: [],
      shuffledIndexOfPlaying: null,
      playing: null,
      playOrder: playOrder || playlist.playOrder
    }
    for (const song of songs) {
      const songId = Song.id(song)
      newPlaylistState.songs[songId] = song
      newPlaylistState.orderedList.push(songId)
    }
    if (newPlaylistState.orderedList.length) {
      let songId
      let currentSongValid = false
      if (typeof currentSong === 'number') {
        songId = newPlaylistState.orderedList[currentSong]
        currentSongValid = true
      } else if (typeof currentSong === 'string') {
        songId = currentSong
        currentSongValid = true
      } else if (currentSong) {
        songId = Song.id(currentSong)
        currentSongValid = true
      }
      if (currentSongValid) {
        newPlaylistState.orderedIndexOfPlaying = newPlaylistState.orderedList.indexOf(songId)
        if (newPlaylistState.playOrder === PLAY_ORDER_SHUFFLE) {
          newPlaylistState.shuffledList = shuffle(newPlaylistState.orderedList)
          newPlaylistState.shuffledIndexOfPlaying = newPlaylistState.shuffledList.indexOf(songId)
        }
        newPlaylistState.playing = songId
      } else {
        if (newPlaylistState.playOrder === PLAY_ORDER_SHUFFLE) {
          newPlaylistState.shuffledList = shuffle(newPlaylistState.orderedList)
          newPlaylistState.shuffledIndexOfPlaying = 0
          newPlaylistState.playing = newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying]
          newPlaylistState.orderedIndexOfPlaying = newPlaylistState.orderedList.indexOf(newPlaylistState.playing)
        } else {
          newPlaylistState.orderedIndexOfPlaying = 0
          newPlaylistState.playing = newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying]
        }
      }
      newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing)
    }
    dispatch(createSetPlaylistAction(newPlaylistState))
  }
}

export function clearPlaylist () {
  return {
    type: CLEAR_PLAYLIST
  }
}
