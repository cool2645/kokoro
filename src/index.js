import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const defaultOptions = {
  storageKey: 'kokoro-store',
  audioTagId: 'kokoro-sevice'
}

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

  constructor (options) {
    const op = Object.assign({}, defaultOptions, options)
    this._storageKey = op.storageKey
    this._mount(op.audioTagId)
    this._store = createStore(reducers, applyMiddleware(thunk))
    this._listeners = []
  }

  destroy () {
    this._destroyed = true
    this._unmount()
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

  _mount (id) {
    this._ref = document.createElement('audio')
    if (id) this._ref.id = id
    document.body.appendChild(this._ref)
  }

  _unmount () {
    this._ref.remove()
  }
}

export default Kokoro

export * from './constants'
export * as actions from './actions'
