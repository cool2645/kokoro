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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var LYRICS_TYPE_LRC = 'lrc';
var LYRICS_TYPE_L2C = 'l2c';
var PLAY_ORDER_LOOP = 'PLAY_ORDER_LOOP';
var PLAY_ORDER_SINGLE = 'PLAY_ORDER_SINGLE';
var PLAY_ORDER_RANDOM = 'PLAY_ORDER_RANDOM';
var PLAY_ORDER = [PLAY_ORDER_LOOP, PLAY_ORDER_RANDOM, PLAY_ORDER_SINGLE];

var SET_VOLUME = 'SET_VOLUME';
var SET_SPEED = 'SET_SPEED';
function setVolume(volume) {
  return {
    type: SET_VOLUME,
    payload: volume
  };
}
function setSpeed(speed) {
  return {
    type: SET_SPEED,
    payload: speed
  };
}

var PAUSE = 'PAUSE';
var PLAY = 'PLAY';
var TOGGLE_PLAY = 'TOGGLE_PLAY';
var SET_CURRENT_TIME = 'SET_CURRENT_TIME';
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
function setCurrentTime(time) {
  return {
    type: SET_CURRENT_TIME,
    payload: time
  };
}

var SET_PLAYLIST = 'SET_PLAYLIST';
var CLEAR_PLAYLIST = 'CLEAR_PLAYLIST';
function setPlayOrder(playOrder) {}
function nextPlayOrder() {}
function setCurrentSong(songOrIndex) {}
function setNextSong(songOrIndex) {}
function removeSong(songOrIndex) {}
function setPlaylist(playlist, currentSong, playOrder) {}
function clearPlaylist() {}
function next() {}
function previous() {}



var index = /*#__PURE__*/Object.freeze({
  SET_VOLUME: SET_VOLUME,
  SET_SPEED: SET_SPEED,
  setVolume: setVolume,
  setSpeed: setSpeed,
  PAUSE: PAUSE,
  PLAY: PLAY,
  TOGGLE_PLAY: TOGGLE_PLAY,
  SET_CURRENT_TIME: SET_CURRENT_TIME,
  pause: pause,
  play: play,
  togglePlay: togglePlay,
  setCurrentTime: setCurrentTime,
  SET_PLAYLIST: SET_PLAYLIST,
  CLEAR_PLAYLIST: CLEAR_PLAYLIST,
  setPlayOrder: setPlayOrder,
  nextPlayOrder: nextPlayOrder,
  setCurrentSong: setCurrentSong,
  setNextSong: setNextSong,
  removeSong: removeSong,
  setPlaylist: setPlaylist,
  clearPlaylist: clearPlaylist,
  next: next,
  previous: previous
});

var Song =
/*#__PURE__*/
function () {
  function Song() {
    _classCallCheck(this, Song);
  }

  _createClass(Song, null, [{
    key: "id",
    value: function id(song) {
      Song.validate(song);
      return song.src instanceof Array ? song.src[0] : song.src;
    }
  }, {
    key: "validate",
    value: function validate(song) {
      if (!song || _typeof(song) !== 'object') {
        throw new TypeError('song is not an object');
      }

      var src;

      if (song.src instanceof Array) {
        if (!song.src.length) {
          throw new TypeError('invalid song object: src is an empty array');
        }

        src = song.src[0];
      } else {
        src = song.src;
      }

      if (typeof src !== 'string') {
        throw new TypeError('invalid song object: src must be a string or string array');
      }

      if (!src) {
        throw new TypeError('invalid song object: src cannot be an empty string');
      }

      return true;
    }
  }]);

  return Song;
}();

var Playlist =
/*#__PURE__*/
function () {
  function Playlist() {
    _classCallCheck(this, Playlist);
  }

  _createClass(Playlist, null, [{
    key: "validate",
    value: function validate(playlist) {
      if (!(playlist.playlist instanceof Array)) {
        throw new TypeError('playlist must be an array');
      }

      if (!(playlist.randomPool instanceof Array)) {
        throw new TypeError('randomPool must be an array');
      }

      if (!(playlist.coolDownPool instanceof Array)) {
        throw new TypeError('coolDownPool must be an array');
      }

      var merged = [].concat(_toConsumableArray(playlist.randomPool), _toConsumableArray(playlist.coolDownPool)).sort(function (a, b) {
        return Song.id(a).localeCompare(Song.id(b));
      });

      var original = _toConsumableArray(playlist.playlist).sort(function (a, b) {
        return Song.id(a).localeCompare(Song.id(b));
      });

      if (merged.length !== original.length) {
        throw new TypeError('the union of randomPool and cooldownPool must be exactly the same as playlist');
      }

      for (var i = 0; i < merged.length; i++) {
        if (Song.id(merged[i]) !== Song.id(original[i])) {
          throw new TypeError('the union of randomPool and cooldownPool must be exactly the same as playlist');
        }
      }

      if (playlist.playlist.length) {
        if (!playlist.playing) {
          throw new TypeError('playing is required when playlist is non-empty');
        }

        Song.validate(playlist.playing);
      } else {
        if (playlist.playing) {
          throw new TypeError('playing must be null when playlist is empty');
        }
      }

      if (playlist.playOrder && _toConsumableArray(PLAY_ORDER).indexOf(playlist.playOrder) === -1) {
        throw new TypeError('playOrder must be one of ' + PLAY_ORDER.toString());
      }
    }
  }]);

  return Playlist;
}();



var index$1 = /*#__PURE__*/Object.freeze({
  Song: Song,
  Playlist: Playlist
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

export default Kokoro;
export { Kokoro, LYRICS_TYPE_L2C, LYRICS_TYPE_LRC, PLAY_ORDER, PLAY_ORDER_LOOP, PLAY_ORDER_RANDOM, PLAY_ORDER_SINGLE, index as actions, index$1 as helpers };
//# sourceMappingURL=kokoro.esm.js.map
