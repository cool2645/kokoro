import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers, { loadState, saveState } from './reducers'
import {
  autoNext, clearPlaylist, next, nextPlayOrder,
  nextSrc,
  pause,
  play, previous, removeSong,
  setBufferedTime, setCurrentSong, setCurrentTime, setNextSong,
  setPlaylist, setPlayOrder,
  setSpeed, setTimes,
  setTotalTime,
  setVolume
} from './actions'
import { Song, TimeRanges } from './helpers'

export class Kokoro {
  get ref () {
    return this._ref
  }

  get store () {
    return this._store
  }

  get _dispatch () {
    return this._store.dispatch
  }

  get getState () {
    return this._store.getState
  }

  get destroyed () {
    return this._destroyed || false
  }

  constructor (initializeState) {
    this._store = initializeState
      ? createStore(reducers, loadState(initializeState), composeWithDevTools(applyMiddleware(thunk)))
      : createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

    this._ref = new window.Audio()

    this._ref.addEventListener('canplay', () => {
      this._dispatch(setBufferedTime(TimeRanges.toArray(this._ref.buffered)))
    })
    this._ref.addEventListener('canplaythrough', () => {
      this._dispatch(setBufferedTime(TimeRanges.toArray(this._ref.buffered)))
    })
    this._ref.addEventListener('durationchange', () => {
      this._dispatch(setTotalTime(this._ref.duration))
    })
    this._ref.addEventListener('ended', () => {
      this._dispatch(autoNext())
      this._onSrcProbablyChanged()
      this._triggerPlay()
    })
    this._ref.addEventListener('error', () => {
      const state = this.getState()
      if (state.playing.song.src instanceof Array &&
        state.playing.srcIndex + 1 < state.playing.song.src.length) {
        this._dispatch(nextSrc())
      } else {
        this._dispatch(autoNext())
      }
      this._onSrcProbablyChanged()
      this._triggerPlay()
    })
    this._ref.addEventListener('loadedmetadata', () => {
      this._dispatch(setTotalTime(this._ref.duration))
    })
    this._ref.addEventListener('pause', () => {
      this._dispatch(pause())
    })
    this._ref.addEventListener('play', () => {
      this._dispatch(play())
    })
    this._ref.addEventListener('progress', () => {
      this._dispatch(setBufferedTime(TimeRanges.toArray(this._ref.buffered)))
    })
    this._ref.addEventListener('ratechange', () => {
      this._dispatch(setSpeed(this._ref.playbackRate))
    })
    this._ref.addEventListener('timeupdate', () => {
      this._dispatch(setTimes({
        currentTime: this._ref.currentTime,
        totalTime: this._ref.duration,
        bufferedTime: TimeRanges.toArray(this._ref.buffered)
      }))
    })
    this._ref.addEventListener('volumechange', () => {
      this._dispatch(setVolume(this._ref.volume))
    })

    this._listeners = []
  }

  destroy () {
    this._destroyed = true
    for (const item of this._listeners) {
      item.unsub()
    }
    this.unmount()
    this._ref.load()
  }

  subscribe (listener) {
    const o = this._listeners.find(item => item.listener === listener)
    if (o) {
      return o.unsub
    }
    const unsub = this._store.subscribe(() => listener(this.getState()))
    this._listeners.push({
      listener,
      unsub
    })
    return unsub
  }

  unsubscribe (listener) {
    const o = this._listeners.find(item => item.listener === listener)
    if (o) {
      o.unsub()
      this._listeners = this._listeners.filter(item => item.listener !== listener)
    }
  }

  dumpState () {
    return saveState(this.getState())
  }

  mount (parentNode, id) {
    if (typeof parentNode === 'string' || id) {
      this._ref.id = typeof parentNode === 'string'
        ? parentNode : id
    }
    const parent = parentNode instanceof window.HTMLElement
      ? parentNode : document.body
    parent.appendChild(this._ref)
  }

  unmount () {
    this._ref.remove()
  }

  _onSrcProbablyChanged () {
    const state = this.getState()
    if (Song.id(state.playing) !== Song.id(this._ref)) {
      this._ref.src = state.playing.src
    }
  }

  _triggerPlay () {
    this._ref.currentTime = 0
    this._ref.play()
  }

  pause () {
    this._ref.pause()
  }

  play () {
    this._ref.play()
  }

  togglePlay () {
    const state = this.getState()
    if (state.playing.paused) {
      this._ref.play()
    } else this._ref.pause()
  }

  setCurrentTime (time) {
    this._ref.currentTime = time
    this._dispatch(setCurrentTime(time))
  }

  next () {
    this._dispatch(next())
    this._onSrcProbablyChanged()
    this._triggerPlay()
  }

  previous () {
    this._dispatch(previous())
    this._onSrcProbablyChanged()
    this._triggerPlay()
  }

  setPlayOrder (playOrder) {
    this._dispatch(setPlayOrder(playOrder))
  }

  nextPlayOrder () {
    this._dispatch(nextPlayOrder())
  }

  setCurrentSong (song) {
    this._dispatch(setCurrentSong(song))
    this._onSrcProbablyChanged()
    this._triggerPlay()
  }

  setNextSong (song) {
    this._dispatch(setNextSong(song))
  }

  removeSong (song) {
    this._dispatch(removeSong(song))
    this._onSrcProbablyChanged()
  }

  setPlaylist (songs, currentSong, playOrder) {
    this._dispatch(setPlaylist(songs, currentSong, playOrder))
    this._onSrcProbablyChanged()
  }

  clearPlaylist () {
    this._dispatch(clearPlaylist())
    this._onSrcProbablyChanged()
  }

  setVolume (volume) {
    this._dispatch(setVolume(volume))
    this._ref.volume = volume
  }

  setSpeed (speedRate) {
    this._dispatch(setSpeed(speedRate))
    this._ref.playbackRate = speedRate
  }
}

export default Kokoro

export * from './constants'
export * as actions from './actions'
export * as helpers from './helpers'
