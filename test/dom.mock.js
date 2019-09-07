Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  get () {
    return () => {
      this.paused = false
      this.dispatchEvent(new Event('play'))
    }
  }
})
Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  get () {
    return () => {
      this.paused = true
      this.dispatchEvent(new Event('pause'))
    }
  }
})
Object.defineProperty(HTMLMediaElement.prototype, 'load', {
  get () {
    return () => {
      this.paused = true
      this.dispatchEvent(new Event('abort'))
    }
  }
})
Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
  writable: true,
  value: true
})
Object.defineProperty(HTMLMediaElement.prototype, 'buffered', {
  writable: true
})
Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
  writable: true
})

export function mockTimeRanges (arr) {
  return {
    length: arr.length,
    start: i => {
      return arr[i][0]
    },
    end: i => {
      return arr[i][1]
    }
  }
}
