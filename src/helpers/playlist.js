import { Song } from './song'
import { PLAY_ORDER } from '../constants'

export class Playlist {
  static validate (playlist) {
    if (!(playlist.playlist instanceof Array)) {
      throw new TypeError('playlist must be an array')
    }
    if (!(playlist.randomPool instanceof Array)) {
      throw new TypeError('randomPool must be an array')
    }
    if (!(playlist.coolDownPool instanceof Array)) {
      throw new TypeError('coolDownPool must be an array')
    }
    const merged = [...playlist.randomPool, ...playlist.coolDownPool]
      .sort((a, b) => Song.id(a).localeCompare(Song.id(b)))
    const original = [...playlist.playlist]
      .sort((a, b) => Song.id(a).localeCompare(Song.id(b)))
    if (merged.length !== original.length) {
      throw new TypeError('the union of randomPool and cooldownPool must be exactly the same as playlist')
    }
    for (let i = 0; i < merged.length; i++) {
      if (Song.id(merged[i]) !== Song.id(original[i])) {
        throw new TypeError('the union of randomPool and cooldownPool must be exactly the same as playlist')
      }
    }
    if (playlist.playlist.length) {
      if (!playlist.playing) {
        throw new TypeError('playing is required when playlist is non-empty')
      }
      Song.validate(playlist.playing)
    } else {
      if (playlist.playing) {
        throw new TypeError('playing must be null when playlist is empty')
      }
    }
    if (playlist.playOrder && [...PLAY_ORDER].indexOf(playlist.playOrder) === -1) {
      throw new TypeError('playOrder must be one of ' + PLAY_ORDER.toString())
    }
  }
}
