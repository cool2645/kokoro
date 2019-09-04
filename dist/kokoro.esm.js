/*!
 * kokoro - Headless music player written with Redux.
 * --------
 * @version 0.0.1
 * @homepage: https://github.com/cool2645/kokoro#readme
 * @license MIT
 * @author rikakomoe
 *
 */
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var PAUSE = 'PAUSE';
var PLAY = 'PLAY';
var TOGGLE_PLAY = 'TOGGLE_PLAY';
var NEXT = 'NEXT';
var PREVIOUS = 'PREVIOUS';
var SET_CURRENT_TIME = 'SET_CURRENT_TIME';
var SET_PLAY_ORDER = 'SET_PLAY_ORDER';
var NEXT_PLAY_ORDER = 'NEXT_PLAY_ORDER';
var SET_CURRENT_SONG = 'SET_CURRENT_SONG';
var SET_NEXT_SONG = 'SET_NEXT_SONG';
var REMOVE_SONG = 'REMOVE_SONG';
var SET_PLAYLIST = 'SET_PLAYLIST';
var CLEAR_PLAYLIST = 'CLEAR_PLAYLIST';
var SET_VOLUME = 'SET_VOLUME';
function pause() {
  return {
    type: PAUSE
  };
}
function play() {
  return {
    type: PLAY
  };
}
function togglePlay() {
  return {
    type: TOGGLE_PLAY
  };
}
function next() {
  return {
    type: NEXT
  };
}
function previous() {
  return {
    type: PREVIOUS
  };
}
function setCurrentTime(time) {
  return {
    type: SET_CURRENT_TIME,
    payload: time
  };
}
function setPlayOrder(playOrder) {
  return {
    type: SET_PLAY_ORDER,
    payload: playOrder
  };
}
function nextPlayOrder() {
  return {
    type: NEXT_PLAY_ORDER
  };
}

function getSongSrcOrNull(song) {
  return _typeof(song) === 'object' && song ? song.src instanceof Array ? song.src.length ? song.src[0] : null : song.src : song;
}

function setCurrentSong(songOrIndex) {
  var srcOrIndex = getSongSrcOrNull(songOrIndex);
  return {
    type: SET_CURRENT_SONG,
    payload: srcOrIndex
  };
}
function setNextSong(songOrIndex) {
  var srcOrIndex = getSongSrcOrNull(songOrIndex);
  return {
    type: SET_NEXT_SONG,
    payload: srcOrIndex
  };
}
function removeSong(songOrIndex) {
  var srcOrIndex = getSongSrcOrNull(songOrIndex);
  return {
    type: REMOVE_SONG,
    payload: srcOrIndex
  };
}
function setPlaylist(playlist) {
  return {
    type: SET_PLAYLIST,
    payload: playlist
  };
}
function clearPlaylist() {
  return {
    type: CLEAR_PLAYLIST
  };
}
function setVolume(volume) {
  return {
    type: SET_VOLUME,
    payload: volume
  };
}

var actions = /*#__PURE__*/Object.freeze({
  PAUSE: PAUSE,
  PLAY: PLAY,
  TOGGLE_PLAY: TOGGLE_PLAY,
  NEXT: NEXT,
  PREVIOUS: PREVIOUS,
  SET_CURRENT_TIME: SET_CURRENT_TIME,
  SET_PLAY_ORDER: SET_PLAY_ORDER,
  NEXT_PLAY_ORDER: NEXT_PLAY_ORDER,
  SET_CURRENT_SONG: SET_CURRENT_SONG,
  SET_NEXT_SONG: SET_NEXT_SONG,
  REMOVE_SONG: REMOVE_SONG,
  SET_PLAYLIST: SET_PLAYLIST,
  CLEAR_PLAYLIST: CLEAR_PLAYLIST,
  SET_VOLUME: SET_VOLUME,
  pause: pause,
  play: play,
  togglePlay: togglePlay,
  next: next,
  previous: previous,
  setCurrentTime: setCurrentTime,
  setPlayOrder: setPlayOrder,
  nextPlayOrder: nextPlayOrder,
  setCurrentSong: setCurrentSong,
  setNextSong: setNextSong,
  removeSong: removeSong,
  setPlaylist: setPlaylist,
  clearPlaylist: clearPlaylist,
  setVolume: setVolume
});

var defaultOptions = {
  storageKey: 'kokoro-store',
  audioTagId: 'kokoro-sevice'
};
var Kokoro =
/*#__PURE__*/
function () {
  _createClass(Kokoro, [{
    key: "ref",
    get: function get() {
      return this._ref;
    }
  }]);

  function Kokoro(options) {
    _classCallCheck(this, Kokoro);

    var op = Object.assign({}, defaultOptions, options);
    this._storageKey = op.storageKey;

    this._mount(op.audioTagId);
  }

  _createClass(Kokoro, [{
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;

      this._unmount();
    }
  }, {
    key: "_mount",
    value: function _mount(id) {
      this._ref = document.createElement('audio');
      if (id) this._ref.id = id;
      document.body.appendChild(this._ref);
    }
  }, {
    key: "_unmount",
    value: function _unmount() {
      this._ref.remove();
    }
  }]);

  return Kokoro;
}();
var LYRICS_TYPE_LRC = 'lrc';
var LYRICS_TYPE_L2C = 'l2c';
var PLAY_ORDER_LOOP = 'PLAY_ORDER_LOOP';
var PLAY_ORDER_SINGLE = 'PLAY_ORDER_SINGLE';
var PLAY_ORDER_RANDOM = 'PLAY_ORDER_RANDOM';
var PLAY_ORDER = [PLAY_ORDER_LOOP, PLAY_ORDER_RANDOM, PLAY_ORDER_SINGLE];

export default Kokoro;
export { Kokoro, LYRICS_TYPE_L2C, LYRICS_TYPE_LRC, PLAY_ORDER, PLAY_ORDER_LOOP, PLAY_ORDER_RANDOM, PLAY_ORDER_SINGLE, actions };
//# sourceMappingURL=kokoro.esm.js.map
