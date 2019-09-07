export class Song {
  static id (song) {
    let src = song.src instanceof Array
      ? encodeURI(song.src[0])
      : encodeURI(song.src)

    let good = decodeURI(src)
    while (good !== src) {
      src = good
      good = decodeURI(src)
    }
    return encodeURI(good)
  }
}
