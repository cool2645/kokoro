export interface KokoroOptions {
}

export class Kokoro {
  constructor (options?: KokoroOptions)
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
  src: string
  lyrics?: Lyrics
}

export interface PlayList {
  name: string
  cover: string
  description: string
  songs: Song[]
}

export default Kokoro
