export interface KokoroOptions {
  storageKey: string
  audioTagId: string
}

export class Kokoro {
  private _ref: HTMLAudioElement
  private _storageKey: string
  private _destroyed?: true

  readonly ref: HTMLAudioElement

  private _mount (id?: string): void
  private _unmount (): void

  constructor (options?: KokoroOptions)
  destroy (): void
}

export const LYRICS_TYPE_LRC = 'lrc'

export interface LrcLyrics {
  type: typeof LYRICS_TYPE_LRC
  text: string
  translation?: {
    text: string
    lang: string
    name: string
  }[]
}

export const LYRICS_TYPE_L2C = 'l2c'

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

export const PLAY_ORDER_LOOP = 'PLAY_ORDER_LOOP'
export const PLAY_ORDER_SINGLE = 'PLAY_ORDER_SINGLE'
export const PLAY_ORDER_RANDOM = 'PLAY_ORDER_RANDOM'
export const PLAY_ORDER: string[]
export type PlayOrder =
  | typeof PLAY_ORDER_LOOP
  | typeof PLAY_ORDER_SINGLE
  | typeof PLAY_ORDER_RANDOM

export default Kokoro
