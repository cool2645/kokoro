/*!
 * kokoro - Headless music player written with Redux.
 * --------
 * @version 0.1.0-beta.4
 * @homepage: https://github.com/cool2645/kokoro#readme
 * @license MIT
 * @author rikakomoe
 *
 */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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

var version = "0.1.0-beta.4";

var Song =
/*#__PURE__*/
function () {
  function Song() {
    _classCallCheck(this, Song);
  }

  _createClass(Song, null, [{
    key: "id",
    value: function id(song) {
      var src = song.src instanceof Array ? encodeURI(song.src[0]) : encodeURI(song.src);
      var good = decodeURI(src);

      while (good !== src) {
        src = good;
        good = decodeURI(src);
      }

      return encodeURI(good);
    }
  }]);

  return Song;
}();
var TimeRanges =
/*#__PURE__*/
function () {
  function TimeRanges() {
    _classCallCheck(this, TimeRanges);
  }

  _createClass(TimeRanges, null, [{
    key: "toArray",
    value: function toArray(timeRanges) {
      var length = timeRanges.length;
      var arr = [];

      for (var i = 0; i < length; i++) {
        arr.push([timeRanges.start(i), timeRanges.end(i)]);
      }

      return arr;
    }
  }]);

  return TimeRanges;
}();
function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

var helpers = /*#__PURE__*/Object.freeze({
  Song: Song,
  TimeRanges: TimeRanges,
  cloneDeep: cloneDeep
});

var SET_VOLUME = 'SET_VOLUME';
var SET_SPEED = 'SET_SPEED';
function setVolume(volume) {
  return {
    type: SET_VOLUME,
    payload: volume
  };
}
function setSpeed(speedRate) {
  return {
    type: SET_SPEED,
    payload: speedRate
  };
}

var PAUSE = 'PAUSE';
var PLAY = 'PLAY';
var SET_CURRENT_TIME = 'SET_CURRENT_TIME';
var SET_TOTAL_TIME = 'SET_TOTAL_TIME';
var SET_BUFFERED_TIME = 'SET_BUFFERED_TIME';
var SET_TIMES = 'SET_TIMES';
var NEXT_SRC = 'NEXT_SRC';
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
function setCurrentTime(time) {
  return {
    type: SET_CURRENT_TIME,
    payload: time
  };
}
function setTotalTime(time) {
  return {
    type: SET_TOTAL_TIME,
    payload: time
  };
}
function setBufferedTime(buffered) {
  return {
    type: SET_BUFFERED_TIME,
    payload: buffered
  };
}
function setTimes(times) {
  return {
    type: SET_TIMES,
    payload: times
  };
}
function nextSrc() {
  return {
    type: NEXT_SRC
  };
}

var PLAY_ORDER_LOOP = 'PLAY_ORDER_LOOP';
var PLAY_ORDER_SINGLE = 'PLAY_ORDER_SINGLE';
var PLAY_ORDER_SHUFFLE = 'PLAY_ORDER_SHUFFLE';
var PLAY_ORDER = [PLAY_ORDER_LOOP, PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE];

var SET_PLAYLIST = 'SET_PLAYLIST';
var CLEAR_PLAYLIST = 'CLEAR_PLAYLIST';

function shuffle(original) {
  var shuffled = _toConsumableArray(original);

  shuffled.sort(function () {
    return Math.random() - 0.5;
  });
  return shuffled;
}

function swap(original) {
  var swapped = _toConsumableArray(original);

  var a = swapped[0];
  swapped[0] = swapped[swapped.length - 1];
  swapped[swapped.length - 1] = a;
  return swapped;
}

function createSetPlaylistAction(payload) {
  return {
    type: SET_PLAYLIST,
    payload: payload
  };
}

function pushHistory(historyList, song) {
  if (!song) return historyList;

  var newHistoryList = _toConsumableArray(historyList);

  var historyIndex = historyList.indexOf(song);

  if (historyIndex !== -1) {
    newHistoryList.splice(historyIndex, 1);
  }

  newHistoryList.unshift(song);
  return newHistoryList;
}

function setPlayOrder(playOrder) {
  return function (dispatch, getState) {
    var _getState = getState(),
        playlist = _getState.playlist;

    var newPlaylistState = _objectSpread2({}, playlist, {
      playOrder: playOrder
    });

    if (playOrder === PLAY_ORDER_SHUFFLE) {
      var shuffledList = shuffle(playlist.orderedList);
      var shuffledIndexOfPlaying = shuffledList.indexOf(playlist.playing);
      newPlaylistState.shuffledList = shuffledList;
      newPlaylistState.shuffledIndexOfPlaying = shuffledIndexOfPlaying;
    }

    dispatch(createSetPlaylistAction(newPlaylistState));
  };
}
function nextPlayOrder() {
  return function (dispatch, getState) {
    var _getState2 = getState(),
        playlist = _getState2.playlist;

    var currentPlayOrder = playlist.playOrder;
    var currentPlayOrderIndex = PLAY_ORDER.indexOf(currentPlayOrder);
    var nextPlayOrderIndex = currentPlayOrderIndex + 1 >= PLAY_ORDER.length ? 0 : currentPlayOrderIndex + 1;
    var nextPlayOrder = PLAY_ORDER[nextPlayOrderIndex];
    setPlayOrder(nextPlayOrder)(dispatch, getState);
  };
}
function next() {
  return function (dispatch, getState) {
    var _getState3 = getState(),
        playlist = _getState3.playlist;

    var newPlaylistState = _objectSpread2({}, playlist);

    if (playlist.orderedList.length) {
      if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
        if (playlist.shuffledIndexOfPlaying + 1 === playlist.shuffledList.length) {
          var _newPlaylistState$shu;

          var newShuffledList = shuffle(playlist.orderedList);

          if (newShuffledList[0] === playlist.shuffledList[playlist.shuffledList.length - 1]) {
            newShuffledList = swap(newShuffledList);
          }

          (_newPlaylistState$shu = newPlaylistState.shuffledList).push.apply(_newPlaylistState$shu, _toConsumableArray(newShuffledList));
        }

        newPlaylistState.shuffledIndexOfPlaying++;
        newPlaylistState.playing = newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying];
        newPlaylistState.orderedIndexOfPlaying = playlist.orderedList.indexOf(newPlaylistState.playing);
      } else {
        if (playlist.orderedIndexOfPlaying + 1 >= playlist.orderedList.length) {
          newPlaylistState.orderedIndexOfPlaying = 0;
        } else {
          newPlaylistState.orderedIndexOfPlaying++;
        }

        newPlaylistState.playing = newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying];
      }

      newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing);
    }

    dispatch(createSetPlaylistAction(newPlaylistState));
  };
}
function autoNext() {
  return function (dispatch, getState) {
    var _getState4 = getState(),
        playlist = _getState4.playlist;

    if (playlist.playOrder === PLAY_ORDER_SINGLE) {
      dispatch(createSetPlaylistAction(playlist));
    } else {
      next()(dispatch, getState);
    }
  };
}
function previous() {
  return function (dispatch, getState) {
    var _getState5 = getState(),
        playlist = _getState5.playlist;

    var newPlaylistState = _objectSpread2({}, playlist);

    if (playlist.orderedList.length) {
      if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
        if (playlist.shuffledIndexOfPlaying - 1 === -1) {
          var _newPlaylistState$shu2;

          var newShuffledList = shuffle(playlist.orderedList);

          if (newShuffledList[newShuffledList.length - 1] === playlist.shuffledList[0]) {
            newShuffledList = swap(newShuffledList);
          }

          (_newPlaylistState$shu2 = newPlaylistState.shuffledList).unshift.apply(_newPlaylistState$shu2, _toConsumableArray(newShuffledList));

          newPlaylistState.shuffledIndexOfPlaying += newShuffledList.length;
        }

        newPlaylistState.shuffledIndexOfPlaying--;
        newPlaylistState.playing = newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying];
        newPlaylistState.orderedIndexOfPlaying = playlist.orderedList.indexOf(newPlaylistState.playing);
      } else {
        if (playlist.orderedIndexOfPlaying - 1 === -1) {
          newPlaylistState.orderedIndexOfPlaying = playlist.orderedList.length - 1;
        } else {
          newPlaylistState.orderedIndexOfPlaying--;
        }

        newPlaylistState.playing = newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying];
      }

      newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing);
    }

    dispatch(createSetPlaylistAction(newPlaylistState));
  };
}
function setCurrentSong(song) {
  return function (dispatch, getState) {
    var _getState6 = getState(),
        playlist = _getState6.playlist;

    var newPlaylistState = _objectSpread2({}, playlist);

    var songId;

    if (typeof song === 'number') {
      songId = playlist.orderedList[song];
    } else if (typeof song === 'string') {
      songId = song;
    } else {
      songId = Song.id(song);
      newPlaylistState.songs[songId] = song;

      if (playlist.orderedList.indexOf(songId) === -1) {
        newPlaylistState.orderedList.splice(newPlaylistState.orderedIndexOfPlaying + 1, 0, songId);
      }
    }

    newPlaylistState.playing = songId;
    newPlaylistState.orderedIndexOfPlaying = playlist.orderedList.indexOf(songId);

    if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
      newPlaylistState.shuffledList = shuffle(newPlaylistState.orderedList);
      newPlaylistState.shuffledIndexOfPlaying = newPlaylistState.shuffledList.indexOf(songId);
    }

    newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing);
    dispatch(createSetPlaylistAction(newPlaylistState));
  };
}
function setNextSong(song) {
  return function (dispatch, getState) {
    var _getState7 = getState(),
        playlist = _getState7.playlist;

    var newPlaylistState = _objectSpread2({}, playlist);

    var songId;

    if (typeof song === 'number') {
      songId = playlist.orderedList[song];
    } else if (typeof song === 'string') {
      songId = song;
    } else {
      songId = Song.id(song);
      newPlaylistState.songs[songId] = song;
    }

    if (songId !== playlist.playing) {
      if (playlist.playOrder !== PLAY_ORDER_SHUFFLE) {
        var orderedIndexReduction = playlist.orderedList.slice(0, playlist.orderedIndexOfPlaying).filter(function (item) {
          return item === songId;
        }).length;
        newPlaylistState.orderedList = playlist.orderedList.filter(function (item) {
          return item !== songId;
        });
        newPlaylistState.orderedIndexOfPlaying -= orderedIndexReduction;
        newPlaylistState.orderedList.splice(newPlaylistState.orderedIndexOfPlaying + 1, 0, songId);
      } else if (playlist.playOrder === PLAY_ORDER_SHUFFLE && !(playlist.shuffledIndexOfPlaying + 1 < playlist.shuffledList.length && playlist.shuffledList[playlist.shuffledIndexOfPlaying + 1] === songId)) {
        newPlaylistState.shuffledList.splice(playlist.shuffledIndexOfPlaying + 1, 0, songId);
      }

      if (newPlaylistState.orderedList.length === 1) {
        newPlaylistState.playing = newPlaylistState.orderedList[0];
      }
    }

    dispatch(createSetPlaylistAction(newPlaylistState));
  };
}
function removeSong(song) {
  return function (dispatch, getState) {
    var _getState8 = getState(),
        playlist = _getState8.playlist;

    var newPlaylistState = _objectSpread2({}, playlist);

    var songId;

    if (typeof song === 'number') {
      songId = playlist.orderedList[song];
    } else if (typeof song === 'string') {
      songId = song;
    } else {
      songId = Song.id(song);
    }

    var orderedIndexReduction = playlist.orderedList.slice(0, playlist.orderedIndexOfPlaying).filter(function (item) {
      return item === songId;
    }).length;
    newPlaylistState.orderedList = playlist.orderedList.filter(function (item) {
      return item !== songId;
    });

    if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
      var shuffledIndexReduction = playlist.shuffledList.slice(0, playlist.shuffledIndexOfPlaying).filter(function (item) {
        return item === songId;
      }).length;
      newPlaylistState.shuffledList = playlist.shuffledList.filter(function (item) {
        return item !== songId;
      });
      newPlaylistState.shuffledIndexOfPlaying -= shuffledIndexReduction;

      if (newPlaylistState.shuffledIndexOfPlaying >= newPlaylistState.shuffledList.length) {
        newPlaylistState.shuffledIndexOfPlaying = newPlaylistState.shuffledList.length - 1 > 0 ? newPlaylistState.shuffledList.length - 1 : 0;
      }

      newPlaylistState.orderedIndexOfPlaying = newPlaylistState.shuffledList.length - 1 > 0 ? newPlaylistState.orderedList.indexOf(newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying]) : 0;
    } else {
      newPlaylistState.orderedIndexOfPlaying -= orderedIndexReduction;

      if (newPlaylistState.orderedIndexOfPlaying >= newPlaylistState.orderedList.length) {
        newPlaylistState.orderedIndexOfPlaying = newPlaylistState.orderedList.length - 1 > 0 ? newPlaylistState.orderedList.length - 1 : 0;
      }
    }

    newPlaylistState.playing = newPlaylistState.orderedList.length ? newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying] : null;
    newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing);
    dispatch(createSetPlaylistAction(newPlaylistState));
  };
}
function setPlaylist(songs, currentSong, playOrder) {
  return function (dispatch, getState) {
    var _getState9 = getState(),
        playlist = _getState9.playlist;

    var newPlaylistState = _objectSpread2({}, playlist, {
      songs: {},
      orderedList: [],
      orderedIndexOfPlaying: null,
      shuffledList: [],
      shuffledIndexOfPlaying: null,
      playing: null,
      playOrder: playOrder || playlist.playOrder
    });

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = songs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var song = _step.value;

        var _songId = Song.id(song);

        newPlaylistState.songs[_songId] = song;
        newPlaylistState.orderedList.push(_songId);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (newPlaylistState.orderedList.length) {
      var songId;
      var currentSongValid = false;

      if (typeof currentSong === 'number') {
        songId = newPlaylistState.orderedList[currentSong];
        currentSongValid = true;
      } else if (typeof currentSong === 'string') {
        songId = currentSong;
        currentSongValid = true;
      } else if (currentSong) {
        songId = Song.id(currentSong);
        currentSongValid = true;
      }

      if (currentSongValid) {
        newPlaylistState.orderedIndexOfPlaying = newPlaylistState.orderedList.indexOf(songId);

        if (newPlaylistState.playOrder === PLAY_ORDER_SHUFFLE) {
          newPlaylistState.shuffledList = shuffle(newPlaylistState.orderedList);
          newPlaylistState.shuffledIndexOfPlaying = newPlaylistState.shuffledList.indexOf(songId);
        }

        newPlaylistState.playing = songId;
      } else {
        if (newPlaylistState.playOrder === PLAY_ORDER_SHUFFLE) {
          newPlaylistState.shuffledList = shuffle(newPlaylistState.orderedList);
          newPlaylistState.shuffledIndexOfPlaying = 0;
          newPlaylistState.playing = newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying];
          newPlaylistState.orderedIndexOfPlaying = newPlaylistState.orderedList.indexOf(newPlaylistState.playing);
        } else {
          newPlaylistState.orderedIndexOfPlaying = 0;
          newPlaylistState.playing = newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying];
        }
      }

      newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing);
    }

    dispatch(createSetPlaylistAction(newPlaylistState));
  };
}
function clearPlaylist() {
  return {
    type: CLEAR_PLAYLIST
  };
}



var index = /*#__PURE__*/Object.freeze({
  SET_VOLUME: SET_VOLUME,
  SET_SPEED: SET_SPEED,
  setVolume: setVolume,
  setSpeed: setSpeed,
  PAUSE: PAUSE,
  PLAY: PLAY,
  SET_CURRENT_TIME: SET_CURRENT_TIME,
  SET_TOTAL_TIME: SET_TOTAL_TIME,
  SET_BUFFERED_TIME: SET_BUFFERED_TIME,
  SET_TIMES: SET_TIMES,
  NEXT_SRC: NEXT_SRC,
  pause: pause,
  play: play,
  setCurrentTime: setCurrentTime,
  setTotalTime: setTotalTime,
  setBufferedTime: setBufferedTime,
  setTimes: setTimes,
  nextSrc: nextSrc,
  SET_PLAYLIST: SET_PLAYLIST,
  CLEAR_PLAYLIST: CLEAR_PLAYLIST,
  setPlayOrder: setPlayOrder,
  nextPlayOrder: nextPlayOrder,
  next: next,
  autoNext: autoNext,
  previous: previous,
  setCurrentSong: setCurrentSong,
  setNextSong: setNextSong,
  removeSong: removeSong,
  setPlaylist: setPlaylist,
  clearPlaylist: clearPlaylist
});

var initialState = {
  volume: 1,
  speed: 1
};
function player () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_VOLUME:
      return _objectSpread2({}, state, {
        volume: action.payload
      });

    case SET_SPEED:
      return _objectSpread2({}, state, {
        speed: action.payload
      });

    default:
      return state;
  }
}

var initialState$1 = {
  songs: {},
  orderedList: [],
  orderedIndexOfPlaying: null,
  shuffledList: [],
  shuffledIndexOfPlaying: null,
  historyList: [],
  playing: null,
  playOrder: PLAY_ORDER_LOOP
};
function playlist () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$1;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_PLAYLIST:
      return cloneDeep(action.payload);

    case CLEAR_PLAYLIST:
      return _objectSpread2({}, cloneDeep(initialState$1), {
        playOrder: state.playOrder
      });

    default:
      return state;
  }
}

var initialState$2 = {
  src: '',
  srcIndex: 0,
  song: null,
  currentTime: 0,
  totalTime: 0,
  bufferedTime: null,
  paused: true
};
function playing () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$2;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case CLEAR_PLAYLIST:
      return cloneDeep(initialState$2);

    case SET_PLAYLIST:
      return _objectSpread2({}, state, {
        song: action.payload.playing ? cloneDeep(action.payload.songs[action.payload.playing]) : null,
        src: action.payload.playing ? action.payload.songs[action.payload.playing].src instanceof Array ? action.payload.songs[action.payload.playing].src[0] : action.payload.songs[action.payload.playing].src : '',
        srcIndex: 0
      });

    case NEXT_SRC:
      {
        // condition is always true
        // const srcId = state.song.src instanceof Array
        //  ? state.srcIndex + 1 < state.song.src.length
        //    ? state.srcIndex + 1 : 0
        //  : 0
        var srcId = state.srcIndex + 1; // if (srcId !== state.srcIndex && state.song.src instanceof Array) {

        return _objectSpread2({}, cloneDeep(state), {
          srcIndex: srcId,
          src: state.song.src[srcId] // } else return state

        });
      }

    case SET_CURRENT_TIME:
      return _objectSpread2({}, cloneDeep(state), {
        currentTime: action.payload
      });

    case SET_TOTAL_TIME:
      return _objectSpread2({}, cloneDeep(state), {
        totalTime: action.payload
      });

    case SET_BUFFERED_TIME:
      return _objectSpread2({}, cloneDeep(state), {
        bufferedTime: cloneDeep(action.payload)
      });

    case SET_TIMES:
      return _objectSpread2({}, cloneDeep(state), {
        currentTime: action.payload.currentTime,
        totalTime: action.payload.totalTime,
        bufferedTime: cloneDeep(action.payload.bufferedTime)
      });

    case PAUSE:
      return _objectSpread2({}, cloneDeep(state), {
        paused: true
      });

    case PLAY:
      return _objectSpread2({}, cloneDeep(state), {
        paused: false
      });

    default:
      return state;
  }
}

var reducers = combineReducers({
  player: player,
  playing: playing,
  playlist: playlist
});
function saveState(state) {
  var exportedState = cloneDeep(state);
  delete exportedState.playing;
  return exportedState;
}
function loadState(state) {
  var importedState = cloneDeep(state);
  importedState.playing = initialState$2;
  importedState.playing.song = importedState.playlist.playing ? importedState.playlist.songs[importedState.playlist.playing] : null;
  importedState.playing.src = importedState.playing.song ? importedState.playing.song.src instanceof Array ? importedState.playing.song.src[0] : importedState.playing.song.src : null;
  return importedState;
}

var Kokoro =
/*#__PURE__*/
function () {
  _createClass(Kokoro, [{
    key: "ref",
    get: function get() {
      return this._ref;
    }
  }, {
    key: "store",
    get: function get() {
      return this._store;
    }
  }, {
    key: "_dispatch",
    get: function get() {
      return this._store.dispatch;
    }
  }, {
    key: "getState",
    get: function get() {
      return this._store.getState;
    }
  }, {
    key: "destroyed",
    get: function get() {
      return this._destroyed || false;
    }
  }, {
    key: "version",
    get: function get() {
      return version;
    }
  }]);

  function Kokoro(initializeState) {
    var _this = this;

    _classCallCheck(this, Kokoro);

    this._store = initializeState ? createStore(reducers, loadState(initializeState), composeWithDevTools(applyMiddleware(thunk))) : createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
    this._ref = new window.Audio();

    this._ref.addEventListener('canplay', function () {
      _this._dispatch(setBufferedTime(TimeRanges.toArray(_this._ref.buffered)));
    });

    this._ref.addEventListener('canplaythrough', function () {
      _this._dispatch(setBufferedTime(TimeRanges.toArray(_this._ref.buffered)));
    });

    this._ref.addEventListener('durationchange', function () {
      _this._dispatch(setTotalTime(_this._ref.duration));
    });

    this._ref.addEventListener('ended', function () {
      _this._dispatch(autoNext());

      _this._onSrcProbablyChanged();

      _this._triggerPlay();
    });

    this._ref.addEventListener('error', function () {
      var state = _this.getState();

      if (state.playing.song === null) return;

      if (state.playing.song.src instanceof Array && state.playing.srcIndex + 1 < state.playing.song.src.length) {
        _this._dispatch(nextSrc());
      } else {
        _this._dispatch(autoNext());
      }

      _this._onSrcProbablyChanged();

      _this._triggerPlay();
    });

    this._ref.addEventListener('loadedmetadata', function () {
      _this._dispatch(setTotalTime(_this._ref.duration));
    });

    this._ref.addEventListener('pause', function () {
      _this._dispatch(pause());
    });

    this._ref.addEventListener('play', function () {
      _this._dispatch(play());
    });

    this._ref.addEventListener('progress', function () {
      _this._dispatch(setBufferedTime(TimeRanges.toArray(_this._ref.buffered)));
    });

    this._ref.addEventListener('ratechange', function () {
      _this._dispatch(setSpeed(_this._ref.playbackRate));
    });

    this._ref.addEventListener('timeupdate', function () {
      _this._dispatch(setTimes({
        currentTime: _this._ref.currentTime,
        totalTime: _this._ref.duration,
        bufferedTime: TimeRanges.toArray(_this._ref.buffered)
      }));
    });

    this._ref.addEventListener('volumechange', function () {
      if (_this._ref.muted) _this._dispatch(setVolume(0));else _this._dispatch(setVolume(_this._ref.volume));
    });

    this._listeners = [];
  }

  _createClass(Kokoro, [{
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          item.unsub();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._listeners = [];
      this.unmount();

      this._ref.removeAttribute('src');

      this._ref.load();
    }
  }, {
    key: "subscribe",
    value: function subscribe(listener) {
      var _this2 = this;

      var o = this._listeners.find(function (item) {
        return item.listener === listener;
      });

      if (o) {
        return o.unsub;
      }

      var unsub = this._store.subscribe(function () {
        return listener(_this2.getState());
      });

      this._listeners.push({
        listener: listener,
        unsub: unsub
      });

      return unsub;
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(listener) {
      var o = this._listeners.find(function (item) {
        return item.listener === listener;
      });

      if (o) {
        o.unsub();
        this._listeners = this._listeners.filter(function (item) {
          return item.listener !== listener;
        });
      }
    }
  }, {
    key: "dumpState",
    value: function dumpState() {
      return saveState(this.getState());
    }
  }, {
    key: "mount",
    value: function mount(parentNode, id) {
      if (typeof parentNode === 'string' || id) {
        this._ref.id = typeof parentNode === 'string' ? parentNode : id;
      }

      var parent = parentNode instanceof window.HTMLElement ? parentNode : document.body;
      parent.appendChild(this._ref);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      this._ref.remove();
    }
  }, {
    key: "_onSrcProbablyChanged",
    value: function _onSrcProbablyChanged() {
      var state = this.getState();

      if (Song.id(state.playing) !== Song.id(this._ref)) {
        if (state.playing.src) this._ref.src = state.playing.src;else {
          this._ref.removeAttribute('src');

          this._ref.load();
        }
      }
    }
  }, {
    key: "_triggerPlay",
    value: function _triggerPlay() {
      this._ref.currentTime = 0;

      this._ref.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      this._ref.pause();
    }
  }, {
    key: "play",
    value: function play() {
      this._ref.play();
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      var state = this.getState();

      if (state.playing.paused) {
        this._ref.play();
      } else this._ref.pause();
    }
  }, {
    key: "setCurrentTime",
    value: function setCurrentTime$1(time) {
      this._ref.currentTime = time;

      this._dispatch(setCurrentTime(time));
    }
  }, {
    key: "next",
    value: function next$1() {
      this._dispatch(next());

      this._onSrcProbablyChanged();

      this._triggerPlay();
    }
  }, {
    key: "previous",
    value: function previous$1() {
      this._dispatch(previous());

      this._onSrcProbablyChanged();

      this._triggerPlay();
    }
  }, {
    key: "setPlayOrder",
    value: function setPlayOrder$1(playOrder) {
      this._dispatch(setPlayOrder(playOrder));
    }
  }, {
    key: "nextPlayOrder",
    value: function nextPlayOrder$1() {
      this._dispatch(nextPlayOrder());
    }
  }, {
    key: "setCurrentSong",
    value: function setCurrentSong$1(song) {
      this._dispatch(setCurrentSong(song));

      this._onSrcProbablyChanged();

      this._triggerPlay();
    }
  }, {
    key: "setNextSong",
    value: function setNextSong$1(song) {
      this._dispatch(setNextSong(song));
    }
  }, {
    key: "removeSong",
    value: function removeSong$1(song) {
      this._dispatch(removeSong(song));

      this._onSrcProbablyChanged();
    }
  }, {
    key: "setPlaylist",
    value: function setPlaylist$1(songs, currentSong, playOrder) {
      this._dispatch(setPlaylist(songs, currentSong, playOrder));

      this._onSrcProbablyChanged();
    }
  }, {
    key: "clearPlaylist",
    value: function clearPlaylist$1() {
      this._dispatch(clearPlaylist());

      this._onSrcProbablyChanged();
    }
  }, {
    key: "setVolume",
    value: function setVolume$1(volume) {
      this._dispatch(setVolume(volume));

      this._ref.volume = volume;
    }
  }, {
    key: "setSpeed",
    value: function setSpeed$1(speedRate) {
      this._dispatch(setSpeed(speedRate));

      this._ref.playbackRate = speedRate;
    }
  }]);

  return Kokoro;
}();

export default Kokoro;
export { Kokoro, PLAY_ORDER, PLAY_ORDER_LOOP, PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE, index as actions, helpers };
//# sourceMappingURL=kokoro.esm.js.map
