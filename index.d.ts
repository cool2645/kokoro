import { ThunkAction } from 'redux-thunk'
import { Dispatch, Store, Unsubscribe } from 'redux'

export declare class Kokoro {
  protected _ref: HTMLAudioElement
  protected _destroyed?: true
  protected _store: Store<IState>
  protected _listeners: {
    listener: (state: IState) => void
    unsub: () => void
  }[]

  readonly ref: HTMLAudioElement
  readonly store: Store<IState>
  readonly destroyed: boolean
  readonly version: string

  protected _onSrcProbablyChanged (): void
  protected _triggerPlay (): void

  protected _dispatch (): Dispatch

  constructor (initializeState?: IInitializeState)
  mount (parentNode?: HTMLElement, id?: string): void
  unmount (): void
  destroy (): void
  subscribe (listener: (state: IState) => void): Unsubscribe
  unsubscribe (listener: (state: IState) => void): void
  getState (): IState
  dumpState (): IInitializeState

  pause (): void
  play (): void
  togglePlay (): void
  setCurrentTime (time: number): void
  next (): void
  previous (): void
  setPlayOrder (playOrder: IPlayOrder): void
  nextPlayOrder (): void
  setCurrentSong (song: ISong | number | string): void
  setNextSong (song: ISong | number | string): void
  removeSong (song: ISong | number | string): void
  setPlaylist (songs: ISong[], currentSong?: ISong | number | string, playOrder?: IPlayOrder): void
  clearPlaylist (): void
  updateSong (song: ISong): void
  setVolume (volume: number): void
  setSpeed (speedRate: number): void
}

interface ILyricsBase {
  value: string
}

export interface ILyrics extends ILyricsBase {
  type?: string
  translations?: ILyricsTranslation[]
}

export interface ILyricsTranslation extends ILyricsBase {
  lang: string
  name: string
}

export interface ISong {
  title?: string
  artist?: string
  album?: string
  cover?: string
  src: string | string[]
  lyrics?: ILyrics
}

export declare const PLAY_ORDER_LOOP = 'PLAY_ORDER_LOOP'
export declare const PLAY_ORDER_SINGLE = 'PLAY_ORDER_SINGLE'
export declare const PLAY_ORDER_SHUFFLE = 'PLAY_ORDER_SHUFFLE'
export declare const PLAY_ORDER: string[]
export type IPlayOrder =
  | typeof PLAY_ORDER_LOOP
  | typeof PLAY_ORDER_SINGLE
  | typeof PLAY_ORDER_SHUFFLE

export default Kokoro

export type ITimeRanges = [number, number][]

export interface IPlayerState {
  volume: number
  speed: number
}

export interface IPlayingState {
  src: string
  srcIndex: number
  song: ISong | null
  currentTime: number
  totalTime: number
  bufferedTime: ITimeRanges | null
  paused: boolean
}

export interface ITimes {
  currentTime: number
  totalTime: number
  bufferedTime: ITimeRanges | null
}

export interface IPlaylistState {
  songs: { [key: string]: ISong }
  orderedList: string[]
  orderedIndexOfPlaying: number | null
  shuffledList: string[]
  shuffledIndexOfPlaying: number | null
  historyList: string[]
  playing: string | null
  playOrder: IPlayOrder
}

export interface IState {
  player: IPlayerState
  playing: IPlayingState
  playlist: IPlaylistState
}

export interface IInitializeState {
  player: IPlayerState
  playlist: IPlaylistState
}

export namespace actions {

  export const PAUSE = 'PAUSE'
  export const PLAY = 'PLAY'
  export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
  export const SET_TOTAL_TIME = 'SET_TOTAL_TIME'
  export const SET_BUFFERED_TIME = 'SET_BUFFERED_TIME'
  export const SET_TIMES = 'SET_TIMES'
  export const NEXT_SRC = 'NEXT_SRC'
  export const UPDATE_SONG = 'UPDATE_SONG'

  export const SET_PLAYLIST = 'SET_PLAYLIST'
  export const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'

  export const SET_VOLUME = 'SET_VOLUME'
  export const SET_SPEED = 'SET_SPEED'

  export interface IAction<T, P> {
    type: T
    payload: P
  }

  export function pause (): IAction<typeof PAUSE, undefined>
  export function play (): IAction<typeof PLAY, undefined>
  export function setCurrentTime (time: number): IAction<typeof SET_CURRENT_TIME, number>
  export function setTotalTime (time: number): IAction<typeof SET_TOTAL_TIME, number>
  export function setBufferedTime (buffered: ITimeRanges): IAction<typeof SET_BUFFERED_TIME, ITimeRanges>
  export function setTimes(times: ITimes): IAction<typeof SET_TIMES, ITimes>
  export function nextSrc(): IAction<typeof NEXT_SRC, undefined>
  export function updateSong (song: ISong): IAction<typeof UPDATE_SONG, ISong>
  export function next (): ThunkAction<undefined, IState, undefined, IAction<typeof SET_PLAYLIST, IPlaylistState>>
  export function autoNext (): ThunkAction<undefined, IState, undefined, IAction<typeof SET_PLAYLIST, IPlaylistState>>
  export function previous (): ThunkAction<undefined, IState, undefined, IAction<typeof SET_PLAYLIST, IPlaylistState>>
  export function setPlayOrder (playOrder: IPlayOrder): ThunkAction<undefined, IState, undefined, IAction<typeof SET_PLAYLIST, IPlaylistState>>
  export function nextPlayOrder (): ThunkAction<undefined, IState, undefined, IAction<typeof SET_PLAYLIST, IPlaylistState>>
  export function setCurrentSong (song: ISong | number | string): ThunkAction<undefined, IState, undefined, IAction<typeof SET_PLAYLIST, IPlaylistState>>
  export function setNextSong (song: ISong | number | string): ThunkAction<undefined, IState, undefined, IAction<typeof SET_PLAYLIST, IPlaylistState>>
  export function removeSong (song: ISong | number | string): ThunkAction<undefined, IState, undefined, IAction<typeof SET_PLAYLIST, IPlaylistState>>
  export function setPlaylist (songs: ISong[], currentSong?: ISong | number | string, playOrder?: IPlayOrder): ThunkAction<undefined, IState, undefined, IAction<typeof SET_PLAYLIST, IPlaylistState>>
  export function clearPlaylist (): IAction<typeof CLEAR_PLAYLIST, undefined>
  export function setVolume (volume: number): IAction<typeof SET_VOLUME, number>
  export function setSpeed (speedRate: number): IAction<typeof SET_SPEED, number>

}

type DOMTimeRanges = TimeRanges

export namespace helpers {

  export class Song {
    static id (song: ISong): string
  }

  export class TimeRanges {
    static toArray (timeRanges: DOMTimeRanges): ITimeRanges
  }

  export function cloneDeep (obj: any): any

}
