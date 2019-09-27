import { mockRandomForEach, mockRandom } from 'jest-mock-random'

import Kokoro, { PLAY_ORDER_LOOP, PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE } from '../src'
import './dom.mock'
import { Song } from '../src/helpers'
import { autoNext } from '../src/actions'

describe('playlist state test', () => {
  mockRandomForEach([0.2, 0.6, 0.4, 0.5])
  const kokoro = new Kokoro()
  const playlist = [{
    title: '绿茶',
    artist: '孙羽幽',
    src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
  }, {
    title: 'あめあかり',
    artist: 'なぎ',
    src: 'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3'
  }, {
    title: '君だったら',
    artist: 'HAPPY BIRTHDAY',
    src: [
      'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
      'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
    ]
  }, {
    title: '聞こえますか',
    artist: 'HoneyWorks こいぬ',
    src: [
      'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
      'https://dl.stream.qqmusic.qq.com/M500004TORYk23lbBU.mp3?vkey=&guid=1118732657&fromtag=64'
    ]
  }]
  const songs = {}
  playlist.forEach(v => {
    songs[Song.id(v)] = v
  })

  it('should return initial state at the very first beginning', () => {
    const expectedState = {
      songs: {},
      orderedList: [],
      orderedIndexOfPlaying: null,
      shuffledList: [],
      shuffledIndexOfPlaying: null,
      historyList: [],
      playing: null,
      playOrder: PLAY_ORDER_LOOP
    }
    expect(kokoro.getState().playlist).toEqual(expectedState)
  })

  it('should accept playlist with and without args', () => {
    const expectedState = {
      songs,
      orderedList: [
        Song.id(playlist[0]),
        Song.id(playlist[1]),
        Song.id(playlist[2]),
        Song.id(playlist[3])
      ],
      orderedIndexOfPlaying: 0,
      shuffledList: [],
      shuffledIndexOfPlaying: null,
      historyList: [
        Song.id(playlist[0])
      ],
      playing: Song.id(playlist[0]),
      playOrder: 'PLAY_ORDER_LOOP'
    }

    kokoro.setPlaylist(playlist)
    expect(kokoro.getState().playlist).toEqual(expectedState)
    kokoro.clearPlaylist()
    expectedState.orderedIndexOfPlaying = 1
    expectedState.playing = expectedState.orderedList[1]
    expectedState.historyList = [expectedState.playing]
    kokoro.setPlaylist(playlist, 1)
    expect(kokoro.getState().playlist).toEqual(expectedState)
    kokoro.clearPlaylist()
    kokoro.setPlaylist(playlist, Song.id(playlist[1]))
    expect(kokoro.getState().playlist).toEqual(expectedState)
    kokoro.clearPlaylist()
    kokoro.setPlaylist(playlist, playlist[1])
    expect(kokoro.getState().playlist).toEqual(expectedState)
    kokoro.setPlaylist(playlist, playlist[1], PLAY_ORDER_SHUFFLE)
    expect(kokoro.getState().playlist.playing = Song.id(playlist[1]))
    expectedState.playOrder = 'PLAY_ORDER_SINGLE'
    kokoro.setPlaylist(playlist, playlist[1], PLAY_ORDER_SINGLE)
    expect(kokoro.getState().playlist).toEqual(expectedState)
  })

  it('should change play order', () => {
    const expectedState = {
      songs,
      orderedList: [
        Song.id(playlist[0]),
        Song.id(playlist[1]),
        Song.id(playlist[2]),
        Song.id(playlist[3])
      ],
      orderedIndexOfPlaying: 1,
      shuffledList: [
        Song.id(playlist[1]),
        Song.id(playlist[3]),
        Song.id(playlist[2]),
        Song.id(playlist[0])
      ],
      shuffledIndexOfPlaying: 0,
      historyList: [
        Song.id(playlist[1])
      ],
      playing: Song.id(playlist[1]),
      playOrder: 'PLAY_ORDER_SHUFFLE'
    }
    kokoro.nextPlayOrder()
    expect(kokoro.getState().playlist.playOrder).toEqual('PLAY_ORDER_LOOP')
    kokoro.nextPlayOrder()
    expect(kokoro.getState().playlist).toEqual(expectedState)
  })

  it('should previous and next', () => {
    kokoro.previous()
    expect(kokoro.getState().playlist.playing).toEqual(Song.id(playlist[0]))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(0)
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(3)
    kokoro.next()
    expect(kokoro.getState().playlist.playing).toEqual(Song.id(playlist[1]))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(1)
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(4)
    kokoro.next()
    kokoro.next()
    kokoro.next()
    kokoro.next()
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(8)
    kokoro.next()
    kokoro.next()
    kokoro.next()
    kokoro.next()
    expect(kokoro.getState().playlist.playing).toEqual(Song.id(playlist[1]))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(1)
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(12)
    expect(kokoro.getState().playlist.historyList).toEqual([
      Song.id(playlist[1]),
      Song.id(playlist[0]),
      Song.id(playlist[2]),
      Song.id(playlist[3])
    ])
    kokoro.previous()
    expect(kokoro.getState().playlist.playing).toEqual(Song.id(playlist[0]))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(0)
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(11)
    kokoro.setPlayOrder('PLAY_ORDER_LOOP')
    kokoro.previous()
    expect(kokoro.getState().playlist.playing).toEqual(Song.id(playlist[3]))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(3)
    kokoro.previous()
    expect(kokoro.getState().playlist.playing).toEqual(Song.id(playlist[2]))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(2)
    kokoro.next()
    expect(kokoro.getState().playlist.playing).toEqual(Song.id(playlist[3]))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(3)
    kokoro.next()
    expect(kokoro.getState().playlist.playing).toEqual(Song.id(playlist[0]))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(0)
  })

  it('should auto next', () => {
    kokoro.ref.dispatchEvent(new Event('ended'))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(1)
    kokoro.pause()
    kokoro.ref.dispatchEvent(new Event('error'))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(2)
    expect(kokoro.getState().playing.paused).toEqual(true)
    kokoro.play()
    kokoro.ref.dispatchEvent(new Event('error'))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(2)
    expect(kokoro.getState().playing.paused).toEqual(false)
    expect(kokoro.ref.src).toEqual(playlist[2].src[1])
    expect(kokoro.getState().playing.src).toEqual(playlist[2].src[1])
    expect(kokoro.getState().playing.srcIndex).toEqual(1)
    kokoro.ref.dispatchEvent(new Event('error'))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(3)
    expect(kokoro.getState().playing.srcIndex).toEqual(0)
    kokoro.setPlayOrder(PLAY_ORDER_SINGLE)
    kokoro.ref.dispatchEvent(new Event('ended'))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(3)
  })

  it('should set current song', () => {
    kokoro.setCurrentSong(3)
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(3)
    kokoro.setCurrentSong(Song.id(playlist[0]))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(0)
    kokoro.setCurrentSong(playlist[1])
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(1)
    kokoro.setPlayOrder(PLAY_ORDER_SHUFFLE)
    kokoro.setCurrentSong(3)
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(3)
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(1)
    kokoro.setCurrentSong(Song.id(playlist[0]))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(0)
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(3)
    kokoro.setCurrentSong(playlist[1])
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(1)
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(0)
  })

  it('should set next song', () => {
    kokoro.setNextSong(1)
    kokoro.next()
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).not.toEqual(1)
    kokoro.setNextSong(1)
    kokoro.next()
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(1)
    kokoro.setPlayOrder(PLAY_ORDER_SHUFFLE)
    kokoro.setNextSong(1)
    kokoro.next()
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).not.toEqual(1)
    kokoro.setNextSong(1)
    kokoro.next()
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(1)
  })

  it('should remove song', () => {
    kokoro.removeSong(1)
    kokoro.removeSong(Song.id(playlist[2]))
    kokoro.removeSong(playlist[0])
    let expectedState = {
      player: { volume: 1, speed: 1 },
      playing: {
        src: playlist[3].src[0],
        srcIndex: 0,
        song: playlist[3],
        currentTime: 0,
        totalTime: 0,
        bufferedTime: null,
        paused: false
      },
      playlist: {
        songs,
        orderedList: [
          Song.id(playlist[3])
        ],
        orderedIndexOfPlaying: 0,
        shuffledList: [
          Song.id(playlist[3])
        ],
        shuffledIndexOfPlaying: 0,
        historyList: [
          Song.id(playlist[3]),
          Song.id(playlist[0]),
          Song.id(playlist[2]),
          Song.id(playlist[1])
        ],
        playing: Song.id(playlist[3]),
        playOrder: 'PLAY_ORDER_SHUFFLE'
      }
    }
    expect(kokoro.getState()).toEqual(expectedState)
    kokoro.removeSong(0)
    expectedState = {
      player: { volume: 1, speed: 1 },
      playing: {
        src: '',
        srcIndex: 0,
        song: null,
        currentTime: 0,
        totalTime: 0,
        bufferedTime: null,
        paused: false
      },
      playlist: {
        songs,
        orderedList: [],
        orderedIndexOfPlaying: 0,
        shuffledList: [],
        shuffledIndexOfPlaying: 0,
        historyList: [
          Song.id(playlist[3]),
          Song.id(playlist[0]),
          Song.id(playlist[2]),
          Song.id(playlist[1])
        ],
        playing: null,
        playOrder: 'PLAY_ORDER_SHUFFLE'
      }
    }
    expect(kokoro.getState()).toEqual(expectedState)
    kokoro.setPlaylist(playlist)
    kokoro.setPlayOrder(PLAY_ORDER_SINGLE)
    kokoro.removeSong(0)
    kokoro.removeSong(0)
    kokoro.removeSong(0)
    expectedState = {
      player: { volume: 1, speed: 1 },
      playing: {
        src: playlist[3].src[0],
        srcIndex: 0,
        song: playlist[3],
        currentTime: 0,
        totalTime: 0,
        bufferedTime: null,
        paused: false
      },
      playlist: {
        songs,
        orderedList: [
          Song.id(playlist[3])
        ],
        orderedIndexOfPlaying: 0,
        shuffledList: [
          Song.id(playlist[1]),
          Song.id(playlist[3]),
          Song.id(playlist[2]),
          Song.id(playlist[0])
        ],
        shuffledIndexOfPlaying: 0,
        historyList: [
          Song.id(playlist[3]),
          Song.id(playlist[2]),
          Song.id(playlist[1]),
          Song.id(playlist[0])
        ],
        playing: Song.id(playlist[3]),
        playOrder: 'PLAY_ORDER_SINGLE'
      }
    }
    expect(kokoro.getState()).toEqual(expectedState)
    kokoro.removeSong(0)
    expectedState = {
      player: { volume: 1, speed: 1 },
      playing: {
        src: '',
        srcIndex: 0,
        song: null,
        currentTime: 0,
        totalTime: 0,
        bufferedTime: null,
        paused: false
      },
      playlist: {
        songs,
        orderedList: [],
        orderedIndexOfPlaying: 0,
        shuffledList: [
          Song.id(playlist[1]),
          Song.id(playlist[3]),
          Song.id(playlist[2]),
          Song.id(playlist[0])
        ],
        shuffledIndexOfPlaying: 0,
        historyList: [
          Song.id(playlist[3]),
          Song.id(playlist[2]),
          Song.id(playlist[1]),
          Song.id(playlist[0])
        ],
        playing: null,
        playOrder: 'PLAY_ORDER_SINGLE'
      }
    }
    expect(kokoro.getState()).toEqual(expectedState)
  })

  it('should set next song not shuffle', () => {
    kokoro.setPlaylist(playlist, 1)
    kokoro.setPlayOrder(PLAY_ORDER_LOOP)
    kokoro.setNextSong(Song.id(playlist[1]))
    kokoro.next()
    expect(kokoro.getState().playlist.playing).not.toEqual(Song.id(playlist[1]))
    kokoro.setNextSong(playlist[1])
    kokoro.next()
    expect(kokoro.getState().playlist.playing).toEqual(Song.id(playlist[1]))
  })

  it('should set current song as new song', () => {
    kokoro.setCurrentSong({
      src: 'new Song'
    })
    expect(kokoro.getState().playing.src).toEqual('new Song')
  })

  it('should be able to set nothing', () => {
    kokoro.setPlaylist([])
  })

  it('should set next song', () => {
    kokoro.setPlaylist(playlist, 1, PLAY_ORDER_SHUFFLE)
    kokoro.setNextSong(playlist[3])
    expect(kokoro.getState().playlist.shuffledList).toEqual([
      Song.id(playlist[1]),
      Song.id(playlist[3]),
      Song.id(playlist[2]),
      Song.id(playlist[0])
    ])
  })

  it('should remove song', () => {
    kokoro.setPlaylist(playlist, 0, PLAY_ORDER_SHUFFLE)
    kokoro.removeSong(0)
    expect(kokoro.getState().playing.src).toEqual(playlist[2].src[0])
    kokoro.setPlayOrder(PLAY_ORDER_LOOP)
    kokoro.setCurrentSong(2)
    kokoro.removeSong(2)
    expect(kokoro.getState().playing.src).toEqual(playlist[2].src[0])
    kokoro.removeSong(1)
    expect(kokoro.getState().playing.src).toEqual(playlist[1].src)
    kokoro.removeSong(0)
    expect(kokoro.getState().playing.src).toEqual('')
  })

  it('should stop', () => {
    kokoro.ref.dispatchEvent(new Event('error'))
  })

  it('should set current if set next on emptyl list', () => {
    kokoro.clearPlaylist()
    kokoro.setNextSong(playlist[0])
    expect(kokoro.getState().playing.src).toEqual(playlist[0].src)
  })

  it('should throw no error', () => {
    kokoro.clearPlaylist()
    kokoro.next()
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(null)
    kokoro.previous()
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(null)
    kokoro._dispatch(autoNext())
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(null)
    kokoro.setPlayOrder(PLAY_ORDER_SHUFFLE)
    kokoro.next()
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(null)
    kokoro.previous()
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(null)
    kokoro._dispatch(autoNext())
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(null)
  })

  it('should never play the same song twice', () => {
    mockRandom([0.1, 0.1, 0.1, 0.1])
    kokoro.setPlaylist(playlist, 0, PLAY_ORDER_SHUFFLE)
    mockRandom([0.9, 0.9, 0.9, 0.9])
    kokoro.next()
    expect(kokoro.getState().orderedIndexOfPlaying).not.toEqual(3)
    mockRandom([0.1, 0.1, 0.1, 0.1])
    kokoro.setPlaylist(playlist, 3, PLAY_ORDER_SHUFFLE)
    mockRandom([0.9, 0.9, 0.9, 0.9])
    kokoro.previous()
    expect(kokoro.getState().orderedIndexOfPlaying).not.toEqual(0)
  })
})
