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

export interface Playlist {
  name: string
  cover: string
  description: string
  songs: Song[]
}

export declare const PLAY_ORDER_LOOP = 'PLAY_ORDER_LOOP'
export declare const PLAY_ORDER_SINGLE = 'PLAY_ORDER_SINGLE'
export declare const PLAY_ORDER_RANDOM = 'PLAY_ORDER_RANDOM'
export declare const PLAY_ORDER: string[]
export type PlayOrder =
  | typeof PLAY_ORDER_LOOP
  | typeof PLAY_ORDER_SINGLE
  | typeof PLAY_ORDER_RANDOM

export default Kokoro

export namespace actions {

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
  export const REORDER_PLAYLIST = 'REORDER_PLAYLIST'
  export const SET_PLAYLIST = 'SET_PLAYLIST'
  export const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'

  export const SET_VOLUME = 'SET_VOLUME'
  export const SET_SPEED = 'SET_SPEED'

  export interface Action {
    type: string
    payload?: any
  }

  export function pause (): Action
  export function play (): Action
  export function togglePlay (): Action
  export function next (): Action
  export function previous (): Action
  export function setCurrentTime (time: number): Action
  export function setPlayOrder (playOrder: PlayOrder): Action
  export function nextPlayOrder (): Action
  export function setCurrentSong (songOrIndex: Song | number): Action
  export function setNextSong (songOrIndex: Song | number): Action
  export function removeSong (songOrIndex: Song | number): Action
  export function setPlaylist (playlist: Playlist): Action
  export function clearPlaylist (): Action
  export function setVolume (volume: number): Action

}
