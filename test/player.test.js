import Kokoro from '../src'

describe('player related api test', () => {
  const kokoro = new Kokoro()
  it('should return initial state at the very first beginning', () => {
    const expectedState = {
      volume: 1,
      speed: 1
    }
    expect(kokoro.getState().player).toEqual(expectedState)
  })

  it('should set volume', () => {
    kokoro.setVolume(0)
    expect(kokoro.ref.volume).toEqual(0)
    expect(kokoro.getState().player.volume).toEqual(0)
  })

  it('should set speed', () => {
    kokoro.setSpeed(1.5)
    expect(kokoro.ref.playbackRate).toEqual(1.5)
    expect(kokoro.getState().player.speed).toEqual(1.5)
  })
})
