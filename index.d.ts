import { ThunkAction } from 'redux-thunk'

export interface KokoroOptions {
  storageKey: string
  audioTagId: string
}

export declare class Kokoro {
  private _ref: HTMLAudioElement
  private _storageKey: string
  private _destroyed?: true

  readonly ref: HTMLAudioElement

  private _mount (id?: string): void
  private _unmount (): void

  constructor (options?: KokoroOptions)
  destroy (): void
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
  song: Song
  currentTime: number
  totalTime: number
  pause: boolean
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

export namespace actions {

  export const PAUSE = 'PAUSE'
  export const PLAY = 'PLAY'
  export const TOGGLE_PLAY = 'TOGGLE_PLAY'
  export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'

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
