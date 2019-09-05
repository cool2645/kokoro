export class Song {
  static id (song) {
    Song.validate(song)
    return song.src instanceof Array
      ? song.src[0]
      : song.src
  }

  static validate (song) {
    if (!song || typeof song !== 'object') {
      throw new TypeError('song is not an object')
    }
    let src
    if (song.src instanceof Array) {
      if (!song.src.length) {
        throw new TypeError('invalid song object: src is an empty array')
      }
      src = song.src[0]
    } else {
      src = song.src
    }
    if (typeof src !== 'string') {
      throw new TypeError('invalid song object: src must be a string or string array')
    }
    if (!src) {
      throw new TypeError('invalid song object: src cannot be an empty string')
    }
    return true
  }
}
