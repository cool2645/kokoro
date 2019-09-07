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

export class TimeRanges {
  static toArray (timeRanges) {
    const length = timeRanges.length
    const arr = []
    for (let i = 0; i < length; i++) {
      arr.push([
        timeRanges.start(i),
        timeRanges.end(i)
      ])
    }
    return arr
  }
}

export function cloneDeep (obj) {
  return JSON.parse(JSON.stringify(obj))
}
