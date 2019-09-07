import Kokoro from '../src'
import { mockTimeRanges } from './dom.mock'

describe('playing related api test', () => {
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
})
