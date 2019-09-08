import Kokoro from '../src'
import './dom.mock'

describe('class state test', () => {
  let kokoro = new Kokoro()
  const playlist = [{
    title: '绿茶',
    artist: '孙羽幽',
    src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
  }, {
    title: '君だったら',
    artist: 'HAPPY BIRTHDAY',
    src: [
      'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
      'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
    ]
  }]
  it('should get store', () => {
    const store = kokoro.store
    expect(store.getState()).toEqual(kokoro.getState())
  })

  it('should subscribe and unsubscribe', () => {
    const listener = (state) => {
      expect(state.playing.paused).toEqual(true)
    }
    kokoro.subscribe(listener)
    kokoro.subscribe(listener)
    kokoro.pause()
    kokoro.unsubscribe(listener)
    kokoro.unsubscribe()
  })

  it('should mount and unmount', () => {
    expect(document.getElementById('kokoro-service')).not.toEqual(kokoro.ref)
    kokoro.mount(document.body, 'kokoro-service')
    expect(document.getElementById('kokoro-service')).toEqual(kokoro.ref)
    kokoro.unmount()
    expect(document.getElementById('kokoro-service')).not.toEqual(kokoro.ref)
    kokoro.mount('kokoro-service')
    expect(document.getElementById('kokoro-service')).toEqual(kokoro.ref)
    kokoro.unmount()
    expect(document.getElementById('kokoro-service')).not.toEqual(kokoro.ref)
    kokoro.mount()
    expect(document.getElementById('kokoro-service')).toEqual(kokoro.ref)
    kokoro.unmount()
    expect(document.getElementById('kokoro-service')).not.toEqual(kokoro.ref)
  })

  it('should dump state and recover', () => {
    kokoro.setVolume(0.7)
    const state = kokoro.dumpState()
    const expectedState = {
      player: { volume: 0.7, speed: 1 },
      playlist: {
        songs: {},
        orderedList: [],
        orderedIndexOfPlaying: null,
        shuffledList: [],
        shuffledIndexOfPlaying: null,
        historyList: [],
        playing: null,
        playOrder: 'PLAY_ORDER_LOOP'
      },
      playing: {
        src: null,
        srcIndex: 0,
        song: null,
        currentTime: 0,
        totalTime: 0,
        bufferedTime: null,
        paused: true
      }
    }
    kokoro = new Kokoro(state)
    expect(kokoro.getState()).toEqual(expectedState)
  })

  it('should destroy', () => {
    expect(kokoro.destroyed).toEqual(false)
    const listener = (state) => {
      expect(state.playing.paused).toEqual(true)
    }
    kokoro.subscribe(listener)
    kokoro.destroy()
    expect(kokoro.destroyed).toEqual(true)
    expect(kokoro._listeners).toEqual([])
  })

  it('should initialize', () => {
    kokoro = new Kokoro()
    kokoro.setPlaylist(playlist)
    let state = kokoro.dumpState()
    kokoro = new Kokoro(state)
    let expectedState = {
      player: { volume: 1, speed: 1 },
      playlist: {
        songs: {
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3': {
            title: '绿茶',
            artist: '孙羽幽',
            src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
          },
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3': {
            title: '君だったら',
            artist: 'HAPPY BIRTHDAY',
            src: [
              'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
              'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
            ]
          }
        },
        orderedList: [
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3',
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3'
        ],
        orderedIndexOfPlaying: 0,
        shuffledList: [],
        shuffledIndexOfPlaying: null,
        historyList: [
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
        ],
        playing: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3',
        playOrder: 'PLAY_ORDER_LOOP'
      },
      playing: {
        src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3',
        srcIndex: 0,
        song: {
          title: '绿茶',
          artist: '孙羽幽',
          src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
        },
        currentTime: 0,
        totalTime: 0,
        bufferedTime: null,
        paused: true
      }
    }
    expect(kokoro.getState()).toEqual(expectedState)
    kokoro.setPlaylist(playlist, 1)
    state = kokoro.dumpState()
    kokoro = new Kokoro(state)
    expectedState = {
      player: { volume: 1, speed: 1 },
      playlist: {
        songs: {
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3': {
            title: '绿茶',
            artist: '孙羽幽',
            src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
          },
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3': {
            title: '君だったら',
            artist: 'HAPPY BIRTHDAY',
            src: [
              'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
              'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
            ]
          }
        },
        orderedList: [
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3',
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3'
        ],
        orderedIndexOfPlaying: 1,
        shuffledList: [],
        shuffledIndexOfPlaying: null,
        historyList: [
          'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
          'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
        ],
        playing: 'https://tokimekiwakuwaku.netlify.com/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
        playOrder: 'PLAY_ORDER_LOOP'
      },
      playing: {
        src: 'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
        srcIndex: 0,
        song: {
          title: '君だったら',
          artist: 'HAPPY BIRTHDAY',
          src: [
            'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
            'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
          ]
        },
        currentTime: 0,
        totalTime: 0,
        bufferedTime: null,
        paused: true
      }
    }
    expect(kokoro.getState()).toEqual(expectedState)
  })
})
