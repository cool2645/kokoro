import { Playlist, PlayOrder, Song } from '../index'

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
