import { PLAY_ORDER, PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE } from '../constants'
import { Song } from '../helpers'

export const SET_PLAYLIST = 'SET_PLAYLIST'
export const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'

function shuffle (original) {
  const shuffled = [...original]
  shuffled.sort(() => (Math.random() - 0.5))
  return shuffled
}

function createSetPlaylistAction (payload) {
  return {
    type: SET_PLAYLIST,
    payload
  }
}

function pushHistory (historyList, song) {
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
    if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
      if (playlist.shuffledIndexOfPlaying + 1 === playlist.shuffledList.length) {
        newPlaylistState.shuffledList.push(...shuffle(playlist.orderedList))
      }
      newPlaylistState.shuffledIndexOfPlaying++
      newPlaylistState.playing = newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying]
      newPlaylistState.orderedIndexOfPlaying = playlist.orderedList.indexOf(newPlaylistState.playing)
    } else {
      if (playlist.orderedIndexOfPlaying + 1 === playlist.orderedList.length) {
        newPlaylistState.orderedIndexOfPlaying = 0
      } else {
        newPlaylistState.orderedIndexOfPlaying++
      }
      newPlaylistState.playing = newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying]
    }
    newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing)
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
    if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
      if (playlist.shuffledIndexOfPlaying - 1 === -1) {
        newPlaylistState.shuffledList.unshift(...shuffle(playlist.orderedList))
        newPlaylistState.shuffledIndexOfPlaying += playlist.orderedList
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
      const orderedIndex = playlist.orderedList.indexOf(songId)
      if (orderedIndex !== -1) {
        newPlaylistState.orderedList.splice(orderedIndex, 1)
      }
      newPlaylistState.orderedList.splice(
        newPlaylistState.orderedIndexOfPlaying + 1, 0, songId
      )
      if (playlist.playOrder === PLAY_ORDER_SHUFFLE &&
        !(playlist.shuffledIndexOfPlaying + 1 < playlist.shuffledList.length &&
          playlist.shuffledList[playlist.shuffledIndexOfPlaying + 1] === songId
        )
      ) {
        newPlaylistState.shuffledList.splice(playlist.shuffledIndexOfPlaying + 1, 0, songId)
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
      newPlaylistState.shuffledIndexOfPlaying = playlist.shuffledIndexOfPlaying - shuffledIndexReduction
      newPlaylistState.orderedIndexOfPlaying = newPlaylistState.orderedList.indexOf(
        newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying]
      )
    } else {
      newPlaylistState.orderedIndexOfPlaying = playlist.orderedIndexOfPlaying - orderedIndexReduction
    }
    newPlaylistState.playing = newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying]
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
      if (currentSong) {
        let songId
        if (typeof currentSong === 'number') {
          songId = newPlaylistState.orderedList[currentSong]
        } else if (typeof currentSong === 'string') {
          songId = currentSong
        } else {
          songId = Song.id(currentSong)
        }
        newPlaylistState.orderedIndexOfPlaying = newPlaylistState.orderedList.indexOf(songId)
        if (newPlaylistState.playOrder === PLAY_ORDER_SHUFFLE) {
          newPlaylistState.shuffledList = shuffle(newPlaylistState.orderedList)
          newPlaylistState.shuffledIndexOfPlaying = newPlaylistState.shuffledList.indexOf(songId)
          newPlaylistState.playing = songId
        }
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
