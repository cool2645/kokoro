import Kokoro from '../src'
import { mockTimeRanges } from './dom.mock'
import { Song } from '../src/helpers'

describe('playing related api test', () => {
  const playlist = [{
    title: '绿茶',
    artist: '孙羽幽',
    lyrics: {
      type: 'lrc',
      text: '1'
    },
    src: 'https://m10.music.126.net/20190907220705/18f1879d4223f025cc0f50746741ed18/ymusic/0f5b/075c/015c/8109f4dd6d06939775f0666388a36fbc.mp3'
  }, {
    title: '君だったら',
    artist: 'HAPPY BIRTHDAY',
    lyrics: {
      type: 'lrc',
      text: '1'
    },
    src: [
      'https://tokimekiwakuwaku.netlify.com/HAPPY BIRTHDAY - 君だったら.mp3',
      'https://m10.music.126.net/20190907220812/bf90964e93d2ff771c36a7d2d9053972/ymusic/7edf/41ea/0302/6dbeaf542ffb22cf537ab7bef86cd275.mp3'
    ]
  }]
  const kokoro = new Kokoro()
  it('should return initial state at the very first beginning', () => {
    const expectedState = {
      src: '',
      srcIndex: 0,
      song: null,
      currentTime: 0,
      totalTime: 0,
      bufferedTime: null,
      paused: true
    }
    expect(kokoro.getState().playing).toEqual(expectedState)
  })

  it('should play and then pause and then play', () => {
    kokoro.play()
    expect(kokoro.ref.paused).toEqual(false)
    expect(kokoro.getState().playing.paused).toEqual(false)
    kokoro.pause()
    expect(kokoro.ref.paused).toEqual(true)
    expect(kokoro.getState().playing.paused).toEqual(true)
    kokoro.togglePlay()
    expect(kokoro.ref.paused).toEqual(false)
    expect(kokoro.getState().playing.paused).toEqual(false)
    kokoro.togglePlay()
    expect(kokoro.ref.paused).toEqual(true)
    expect(kokoro.getState().playing.paused).toEqual(true)
  })

  it('should update on its time', () => {
    kokoro.ref.buffered = mockTimeRanges([[0, 30]])
    kokoro.ref.dispatchEvent(new Event('canplay'))
    expect(kokoro.getState().playing.bufferedTime).toEqual([[0, 30]])
    kokoro.ref.buffered = mockTimeRanges([[0, 40]])
    kokoro.ref.dispatchEvent(new Event('canplaythrough'))
    expect(kokoro.getState().playing.bufferedTime).toEqual([[0, 40]])
    kokoro.ref.buffered = mockTimeRanges([[0, 50]])
    kokoro.ref.dispatchEvent(new Event('progress'))
    expect(kokoro.getState().playing.bufferedTime).toEqual([[0, 50]])
    kokoro.setCurrentTime(100)
    kokoro.ref.dispatchEvent(new Event('timeupdate'))
    expect(kokoro.getState().playing.currentTime).toEqual(100)
    kokoro.ref.duration = 300
    kokoro.ref.dispatchEvent(new Event('loadedmetadata'))
    expect(kokoro.getState().playing.totalTime).toEqual(300)
    kokoro.ref.duration = 500
    kokoro.ref.dispatchEvent(new Event('durationchange'))
    expect(kokoro.getState().playing.totalTime).toEqual(500)
  })

  it('should update on lyrics', () => {
    kokoro.setCurrentSong(playlist[0])
    expect(kokoro.getState().playing.song.lyrics.text).toEqual('1')
    expect(kokoro.getState().playlist.songs[Song.id(playlist[0])].lyrics.text).toEqual('1')
    playlist[0].lyrics = {
      type: 'lrc',
      text: '2'
    }
    kokoro.updateSong(playlist[0])
    expect(kokoro.getState().playing.song.lyrics.text).toEqual('2')
    expect(kokoro.getState().playlist.songs[Song.id(playlist[0])].lyrics.text).toEqual('2')
    kokoro.setCurrentSong(playlist[1])
    playlist[0].lyrics = {
      type: 'lrc',
      text: '3'
    }
    kokoro.updateSong(playlist[0])
    expect(kokoro.getState().playing.song.lyrics.text).toEqual('1')
    expect(kokoro.getState().playlist.songs[Song.id(playlist[0])].lyrics.text).toEqual('3')
    kokoro.clearPlaylist()
    playlist[0].lyrics = {
      type: 'lrc',
      text: '4'
    }
    kokoro.updateSong(playlist[0])
    expect(kokoro.getState().playing.song).toEqual(null)
    expect(kokoro.getState().playlist.songs[Song.id(playlist[0])].lyrics.text).toEqual('4')
  })
})
