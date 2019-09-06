import { ThunkAction } from 'redux-thunk'
import { Dispatch, Store, Unsubscribe } from 'redux'

export interface KokoroOptions {
  audioTagId: string
  initializeState: InitializeState
}

export declare class Kokoro {
  private _ref: HTMLAudioElement
  private _storageKey: string
  private _destroyed?: true
  private _store: Store<State>
  private _listeners: {
    listener: (state: State) => void
    unsub: () => void
  }[]

  readonly ref: HTMLAudioElement
  readonly store: Store<State>

  private _mount (id?: string): void
  private _unmount (): void
  private _onSrcProbablyChanged (): void

  protected _dispatch (): Dispatch

  constructor (options?: KokoroOptions)
  destroy (): void
  subscribe (listener: (state: State) => void): Unsubscribe
  unsubscribe (listener: (state: State) => void): void
  getState (): State
  dumpState (): InitializeState

  pause (): void
  play (): void
  togglePlay (): void
  setCurrentTime (time: number): void
  next (): void
  previous (): void
  setPlayOrder (playOrder: PlayOrder): void
  nextPlayOrder (): void
  setCurrentSong (song: Song | number | string): void
  setNextSong (song: Song | number | string): void
  removeSong (song: Song | number | string): void
  setPlaylist (songs: Song[], currentSong?: Song | number | string, playOrder?: PlayOrder): void
  clearPlaylist (): void
  setVolume (volume: number): void
  setSpeed (speed: number): void
}

export declare const LYRICS_TYPE_LRC = 'lrc'

export interface LrcLyrics {
  type: typeof LYRICS_TYPE_LRC
  text: string
  translation?: {
    text: string
    lang: string
    name: string
  }[]
}

export declare const LYRICS_TYPE_L2C = 'l2c'

export interface L2cLyrics {
  type: typeof LYRICS_TYPE_L2C
  text: string
}

export type Lyrics = LrcLyrics | L2cLyrics

export interface Song {
  title?: string
  artist?: string
  album?: string
  cover?: string
  src: string | string[]
  lyrics?: Lyrics
}

export declare const PLAY_ORDER_LOOP = 'PLAY_ORDER_LOOP'
export declare const PLAY_ORDER_SINGLE = 'PLAY_ORDER_SINGLE'
export declare const PLAY_ORDER_SHUFFLE = 'PLAY_ORDER_SHUFFLE'
export declare const PLAY_ORDER: string[]
export type PlayOrder =
  | typeof PLAY_ORDER_LOOP
  | typeof PLAY_ORDER_SINGLE
  | typeof PLAY_ORDER_SHUFFLE

export default Kokoro

export interface PlayerState {
  volume: number
  speed: number
}

export interface PlayingState {
  src: string | null
  srcIndex: number
  song: Song | null
  currentTime: number
  totalTime: number
  bufferedTime: TimeRanges | null
  paused: boolean
}

export interface PlaylistState {
  songs: { [key: string]: Song }
  orderedList: string[]
  orderedIndexOfPlaying: number | null
  shuffledList: string[]
  shuffledIndexOfPlaying: number | null
  historyList: string[]
  playing: string | null
  playOrder: PlayOrder
}

export interface State {
  player: PlayerState
  playing: PlayingState
  playlist: PlaylistState
}

export interface InitializeState {
  player: PlayerState
  playlist: PlaylistState
}

export namespace actions {

  export const PAUSE = 'PAUSE'
  export const PLAY = 'PLAY'
  export const TOGGLE_PLAY = 'TOGGLE_PLAY'
  export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
  export const SET_TOTAL_TIME = 'SET_TOTAL_TIME'
  export const SET_BUFFERED_TIME = 'SET_BUFFERED_TIME'
  export const NEXT_SRC = 'NEXT_SRC'

  export const SET_PLAYLIST = 'SET_PLAYLIST'
  export const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'

  export const SET_VOLUME = 'SET_VOLUME'
  export const SET_SPEED = 'SET_SPEED'

  export interface Action<T, P> {
    type: T
    payload: P
  }

  export function pause (): Action<typeof PAUSE, undefined>
  export function play (): Action<typeof PLAY, undefined>
  export function togglePlay (): Action<typeof TOGGLE_PLAY, undefined>
  export function setCurrentTime (time: number): Action<typeof SET_CURRENT_TIME, number>
  export function setTotalTime (time: number): Action<typeof SET_TOTAL_TIME, number>
  export function setBufferedTime (buffered: TimeRanges): Action<typeof SET_BUFFERED_TIME, TimeRanges>
  export function nextSrc() : Action<typeof NEXT_SRC, undefined>
  export function next (): ThunkAction<undefined, State, undefined, Action<typeof SET_PLAYLIST, PlaylistState>>
  export function autoNext (): ThunkAction<undefined, State, undefined, Action<typeof SET_PLAYLIST, PlaylistState>>
  export function previous (): ThunkAction<undefined, State, undefined, Action<typeof SET_PLAYLIST, PlaylistState>>
  export function setPlayOrder (playOrder: PlayOrder): ThunkAction<undefined, State, undefined, Action<typeof SET_PLAYLIST, PlaylistState>>
  export function nextPlayOrder (): ThunkAction<undefined, State, undefined, Action<typeof SET_PLAYLIST, PlaylistState>>
  export function setCurrentSong (song: Song | number | string): ThunkAction<undefined, State, undefined, Action<typeof SET_PLAYLIST, PlaylistState>>
  export function setNextSong (song: Song | number | string): ThunkAction<undefined, State, undefined, Action<typeof SET_PLAYLIST, PlaylistState>>
  export function removeSong (song: Song | number | string): ThunkAction<undefined, State, undefined, Action<typeof SET_PLAYLIST, PlaylistState>>
  export function setPlaylist (songs: Song[], currentSong?: Song | number | string, playOrder?: PlayOrder): ThunkAction<undefined, State, undefined, Action<typeof SET_PLAYLIST, PlaylistState>>
  export function clearPlaylist (): Action<typeof CLEAR_PLAYLIST, undefined>
  export function setVolume (volume: number): Action<typeof SET_VOLUME, number>
  export function setSpeed (speed: number): Action<typeof SET_SPEED, number>

}
