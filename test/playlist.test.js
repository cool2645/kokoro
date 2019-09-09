import { mockRandomForEach } from 'jest-mock-random'

import Kokoro, { PLAY_ORDER_LOOP, PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE } from '../src'
import './dom.mock'
import { Song } from '../src/helpers'

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

  it('should accept playlist with and without args', function () {
    const expectedState = {
      songs: {
        'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3': {
          title: '绿茶',
          artist: '孙羽幽',
          src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
        },
        'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3': {
          title: 'あめあかり',
          artist: 'なぎ',
          src: 'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3'
        },
        'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3': {
          title: '君だったら',
          artist: 'HAPPY BIRTHDAY',
          src: [
            'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
            'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
          ]
        },
        'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3': {
          title: '聞こえますか',
          artist: 'HoneyWorks こいぬ',
          src: [
            'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
            'https://dl.stream.qqmusic.qq.com/M500004TORYk23lbBU.mp3?vkey=&guid=1118732657&fromtag=64'
          ]
        }
      },
      orderedList: [
        'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3',
        'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3',
        'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
        'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3'
      ],
      orderedIndexOfPlaying: 0,
      shuffledList: [],
      shuffledIndexOfPlaying: null,
      historyList: [
        'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
      ],
      playing: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3',
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

  it('should change play order', function () {
    const expectedState = {
      songs: {
        'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3': {
          title: '绿茶',
          artist: '孙羽幽',
          src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
        },
        'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3': {
          title: 'あめあかり',
          artist: 'なぎ',
          src: 'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3'
        },
        'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3': {
          title: '君だったら',
          artist: 'HAPPY BIRTHDAY',
          src: [
            'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
            'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
          ]
        },
        'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3': {
          title: '聞こえますか',
          artist: 'HoneyWorks こいぬ',
          src: [
            'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
            'https://dl.stream.qqmusic.qq.com/M500004TORYk23lbBU.mp3?vkey=&guid=1118732657&fromtag=64'
          ]
        }
      },
      orderedList: [
        'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3',
        'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3',
        'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
        'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3'
      ],
      orderedIndexOfPlaying: 1,
      shuffledList: [
        'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3',
        'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
        'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
        'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
      ],
      shuffledIndexOfPlaying: 0,
      historyList: [
        'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3'
      ],
      playing: 'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3',
      playOrder: 'PLAY_ORDER_SHUFFLE'
    }
    kokoro.nextPlayOrder()
    expect(kokoro.getState().playlist.playOrder).toEqual('PLAY_ORDER_LOOP')
    kokoro.nextPlayOrder()
    expect(kokoro.getState().playlist).toEqual(expectedState)
  })

  it('should previous and next', () => {
    kokoro.previous()
    expect(kokoro.getState().playlist.playing).toEqual('https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3')
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(0)
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(3)
    kokoro.next()
    expect(kokoro.getState().playlist.playing).toEqual('https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3')
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
    expect(kokoro.getState().playlist.playing).toEqual('https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3')
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(1)
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(12)
    expect(kokoro.getState().playlist.historyList).toEqual([
      'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3',
      'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3',
      'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
      'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3'
    ])
    kokoro.previous()
    expect(kokoro.getState().playlist.playing).toEqual('https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3')
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(0)
    expect(kokoro.getState().playlist.shuffledIndexOfPlaying).toEqual(11)
    kokoro.setPlayOrder('PLAY_ORDER_LOOP')
    kokoro.previous()
    expect(kokoro.getState().playlist.playing).toEqual('https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3')
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(3)
    kokoro.previous()
    expect(kokoro.getState().playlist.playing).toEqual('https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3')
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(2)
    kokoro.next()
    expect(kokoro.getState().playlist.playing).toEqual('https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3')
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(3)
    kokoro.next()
    expect(kokoro.getState().playlist.playing).toEqual('https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3')
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(0)
  })

  it('should auto next', () => {
    kokoro.ref.dispatchEvent(new Event('ended'))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(1)
    kokoro.ref.dispatchEvent(new Event('error'))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(2)
    kokoro.ref.dispatchEvent(new Event('error'))
    expect(kokoro.getState().playlist.orderedIndexOfPlaying).toEqual(2)
    expect(kokoro.ref.src).toEqual('https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3')
    expect(kokoro.getState().playing.src).toEqual('https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3')
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

  it('should remove song', function () {
    kokoro.removeSong(1)
    kokoro.removeSong(Song.id(playlist[2]))
    kokoro.removeSong(playlist[0])
    let expectedState = {
      player: { volume: 1, speed: 1 },
      playing: {
        src: 'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
        srcIndex: 0,
        song: {
          title: '聞こえますか',
          artist: 'HoneyWorks こいぬ',
          src: [
            'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
            'https://dl.stream.qqmusic.qq.com/M500004TORYk23lbBU.mp3?vkey=&guid=1118732657&fromtag=64'
          ]
        },
        currentTime: 0,
        totalTime: 0,
        bufferedTime: null,
        paused: false
      },
      playlist: {
        songs: {
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3': {
            title: '绿茶',
            artist: '孙羽幽',
            src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
          },
          'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3': {
            title: 'あめあかり',
            artist: 'なぎ',
            src: 'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3'
          },
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3': {
            title: '君だったら',
            artist: 'HAPPY BIRTHDAY',
            src: [
              'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
              'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
            ]
          },
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3': {
            title: '聞こえますか',
            artist: 'HoneyWorks こいぬ',
            src: [
              'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
              'https://dl.stream.qqmusic.qq.com/M500004TORYk23lbBU.mp3?vkey=&guid=1118732657&fromtag=64'
            ]
          }
        },
        orderedList: [
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3'
        ],
        orderedIndexOfPlaying: 0,
        shuffledList: [
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3'
        ],
        shuffledIndexOfPlaying: 0,
        historyList: [
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3',
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
          'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3'
        ],
        playing: 'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
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
        songs: {
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3': {
            title: '绿茶',
            artist: '孙羽幽',
            src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
          },
          'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3': {
            title: 'あめあかり',
            artist: 'なぎ',
            src: 'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3'
          },
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3': {
            title: '君だったら',
            artist: 'HAPPY BIRTHDAY',
            src: [
              'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
              'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
            ]
          },
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3': {
            title: '聞こえますか',
            artist: 'HoneyWorks こいぬ',
            src: [
              'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
              'https://dl.stream.qqmusic.qq.com/M500004TORYk23lbBU.mp3?vkey=&guid=1118732657&fromtag=64'
            ]
          }
        },
        orderedList: [],
        orderedIndexOfPlaying: 0,
        shuffledList: [],
        shuffledIndexOfPlaying: 0,
        historyList: [
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3',
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
          'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3'
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
        src: 'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
        srcIndex: 0,
        song: {
          title: '聞こえますか',
          artist: 'HoneyWorks こいぬ',
          src: [
            'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
            'https://dl.stream.qqmusic.qq.com/M500004TORYk23lbBU.mp3?vkey=&guid=1118732657&fromtag=64'
          ]
        },
        currentTime: 0,
        totalTime: 0,
        bufferedTime: null,
        paused: false
      },
      playlist: {
        songs: {
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3': {
            title: '绿茶',
            artist: '孙羽幽',
            src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
          },
          'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3': {
            title: 'あめあかり',
            artist: 'なぎ',
            src: 'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3'
          },
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3': {
            title: '君だったら',
            artist: 'HAPPY BIRTHDAY',
            src: [
              'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
              'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
            ]
          },
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3': {
            title: '聞こえますか',
            artist: 'HoneyWorks こいぬ',
            src: [
              'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
              'https://dl.stream.qqmusic.qq.com/M500004TORYk23lbBU.mp3?vkey=&guid=1118732657&fromtag=64'
            ]
          }
        },
        orderedList: [
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3'
        ],
        orderedIndexOfPlaying: 0,
        shuffledList: [
          'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3',
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
        ],
        shuffledIndexOfPlaying: 0,
        historyList: [
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
          'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3',
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
        ],
        playing: 'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
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
        songs: {
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3': {
            title: '绿茶',
            artist: '孙羽幽',
            src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
          },
          'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3': {
            title: 'あめあかり',
            artist: 'なぎ',
            src: 'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3'
          },
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3': {
            title: '君だったら',
            artist: 'HAPPY BIRTHDAY',
            src: [
              'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
              'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
            ]
          },
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3': {
            title: '聞こえますか',
            artist: 'HoneyWorks こいぬ',
            src: [
              'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
              'https://dl.stream.qqmusic.qq.com/M500004TORYk23lbBU.mp3?vkey=&guid=1118732657&fromtag=64'
            ]
          }
        },
        orderedList: [],
        orderedIndexOfPlaying: 0,
        shuffledList: [
          'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3',
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
        ],
        shuffledIndexOfPlaying: 0,
        historyList: [
          'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
          'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3',
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
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
      'https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3',
      'https://m10.music.126.net/20190907220851/d84398f2c351b63982b1bcbc66aed7af/ymusic/f48e/d897/54df/59ceadfde02d18cbb90cb445fb904fb5.mp3',
      'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
      'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
    ])
  })

  it('should remove song', () => {
    kokoro.setPlaylist(playlist, 0, PLAY_ORDER_SHUFFLE)
    kokoro.removeSong(0)
    expect(kokoro.getState().playing.src).toEqual('https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3')
    kokoro.setPlayOrder(PLAY_ORDER_LOOP)
    kokoro.setCurrentSong(2)
    kokoro.removeSong(2)
    expect(kokoro.getState().playing.src).toEqual('https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3')
    kokoro.removeSong(1)
    expect(kokoro.getState().playing.src).toEqual('https://m10.music.126.net/20190907220739/5b23069fcaf89430a00b6a64f9608a9b/ymusic/995a/cab7/3a80/d97a78d23db5a917fee14073312bb054.mp3')
    kokoro.removeSong(0)
    expect(kokoro.getState().playing.src).toEqual('')
  })

  it('should stop', () => {
    kokoro.ref.dispatchEvent(new Event('error'))
  })

  it('should set current if set next on emptyl list', () => {
    kokoro.clearPlaylist()
    kokoro.setNextSong(playlist[0])
    expect(kokoro.getState().playing.src).toEqual('https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3')
  })
})
