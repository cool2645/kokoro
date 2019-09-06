/*!
 * kokoro - Headless music player written with Redux.
 * --------
 * @version 0.0.1
 * @homepage: https://github.com/cool2645/kokoro#readme
 * @license MIT
 * @author rikakomoe
 *
 */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cloneDeep } from 'lodash-es';

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

var LYRICS_TYPE_LRC = 'lrc';
var LYRICS_TYPE_L2C = 'l2c';
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

function createSetPlaylistAction(payload) {
  return {
    type: SET_PLAYLIST,
    payload: payload
  };
}

function pushHistory(historyList, song) {
  var newHistoryList = _toConsumableArray(historyList);

  var historyIndex = historyList.indexOf(song);

  if (historyIndex !== -1) {
    newHistoryList.splice(historyIndex, 1);
  }

  newHistoryList.unshift(song);
  return newHistoryList;
}

function id(song) {
  return song.src instanceof Array ? song.src[0] : song.src;
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

    if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
      if (playlist.shuffledIndexOfPlaying + 1 === playlist.shuffledList.length) {
        var _newPlaylistState$shu;

        (_newPlaylistState$shu = newPlaylistState.shuffledList).push.apply(_newPlaylistState$shu, _toConsumableArray(shuffle(playlist.orderedList)));
      }

      newPlaylistState.shuffledIndexOfPlaying++;
      newPlaylistState.playing = newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying];
      newPlaylistState.orderedIndexOfPlaying = playlist.orderedList.indexOf(newPlaylistState.playing);
    } else {
      if (playlist.orderedIndexOfPlaying + 1 === playlist.orderedList.length) {
        newPlaylistState.orderedIndexOfPlaying = 0;
      } else {
        newPlaylistState.orderedIndexOfPlaying++;
      }

      newPlaylistState.playing = newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying];
    }

    newPlaylistState.historyList = pushHistory(playlist.historyList, newPlaylistState.playing);
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

    if (playlist.playOrder === PLAY_ORDER_SHUFFLE) {
      if (playlist.shuffledIndexOfPlaying - 1 === -1) {
        var _newPlaylistState$shu2;

        (_newPlaylistState$shu2 = newPlaylistState.shuffledList).unshift.apply(_newPlaylistState$shu2, _toConsumableArray(shuffle(playlist.orderedList)));

        newPlaylistState.shuffledIndexOfPlaying += playlist.orderedList;
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
      songId = id(song);
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
      songId = id(song);
      newPlaylistState.songs[songId] = song;
    }

    if (songId !== playlist.playing) {
      var orderedIndex = playlist.orderedList.indexOf(songId);

      if (orderedIndex !== -1) {
        newPlaylistState.orderedList.splice(orderedIndex, 1);
      }

      newPlaylistState.orderedList.splice(newPlaylistState.orderedIndexOfPlaying + 1, 0, songId);

      if (playlist.playOrder === PLAY_ORDER_SHUFFLE && !(playlist.shuffledIndexOfPlaying + 1 < playlist.shuffledList.length && playlist.shuffledList[playlist.shuffledIndexOfPlaying + 1] === songId)) {
        newPlaylistState.shuffledList.splice(playlist.shuffledIndexOfPlaying + 1, 0, songId);
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
      songId = id(song);
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
      newPlaylistState.shuffledIndexOfPlaying = playlist.shuffledIndexOfPlaying - shuffledIndexReduction;
      newPlaylistState.orderedIndexOfPlaying = newPlaylistState.orderedList.indexOf(newPlaylistState.shuffledList[newPlaylistState.shuffledIndexOfPlaying]);
    } else {
      newPlaylistState.orderedIndexOfPlaying = playlist.orderedIndexOfPlaying - orderedIndexReduction;
    }

    newPlaylistState.playing = newPlaylistState.orderedList[newPlaylistState.orderedIndexOfPlaying];
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

        var _songId = id(song);

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
      if (currentSong) {
        var songId;

        if (typeof currentSong === 'number') {
          songId = newPlaylistState.orderedList[currentSong];
        } else if (typeof currentSong === 'string') {
          songId = currentSong;
        } else {
          songId = id(currentSong);
        }

        newPlaylistState.orderedIndexOfPlaying = newPlaylistState.orderedList.indexOf(songId);

        if (newPlaylistState.playOrder === PLAY_ORDER_SHUFFLE) {
          newPlaylistState.shuffledList = shuffle(newPlaylistState.orderedList);
          newPlaylistState.shuffledIndexOfPlaying = newPlaylistState.shuffledList.indexOf(songId);
          newPlaylistState.playing = songId;
        }
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
    }
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
  TOGGLE_PLAY: TOGGLE_PLAY,
  SET_CURRENT_TIME: SET_CURRENT_TIME,
  SET_TOTAL_TIME: SET_TOTAL_TIME,
  SET_BUFFERED_TIME: SET_BUFFERED_TIME,
  SET_TIMES: SET_TIMES,
  NEXT_SRC: NEXT_SRC,
  pause: pause,
  play: play,
  togglePlay: togglePlay,
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

  switch (action) {
    case SET_VOLUME:
      if (typeof action.payload !== 'number') {
        return state;
      }

      action.payload = Math.min(Math.max(action.payload, 0), 1);
      return _objectSpread2({}, state, {
        volume: action.payload
      });

    case SET_SPEED:
      if (typeof action.payload !== 'number') {
        return state;
      }

      action.payload = Math.min(Math.max(action.payload, 0), 1);
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

  switch (action) {
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
  src: null,
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

  switch (action) {
    case CLEAR_PLAYLIST:
      return cloneDeep(initialState$2);

    case SET_PLAYLIST:
      return {
        currentTime: 0,
        totalTime: 0,
        paused: state.paused,
        song: cloneDeep(action.payload.songs[action.payload.playing]),
        src: action.payload.songs[action.payload.playing].src instanceof Array ? action.payload.songs[action.payload.playing].src[0] : action.payload.songs[action.payload.playing].src,
        srcIndex: 0
      };

    case NEXT_SRC:
      {
        var srcId = state.song.src instanceof Array ? state.srcIndex + 1 < state.song.src.length ? state.srcIndex + 1 : 0 : 0;

        if (srcId !== state.srcIndex && state.song.src instanceof Array) {
          return _objectSpread2({}, cloneDeep(state), {
            currentTime: 0,
            totalTime: 0,
            srcIndex: srcId,
            src: state.song.src[srcId]
          });
        } else return state;
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

    case TOGGLE_PLAY:
      return _objectSpread2({}, cloneDeep(state), {
        paused: !state.paused
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
  if (!state) return undefined;
  var importedState = cloneDeep(state);
  importedState.playing = initialState$2;
  importedState.playing.song = importedState.playlist.songs[importedState.playlist.playing];
  importedState.playing.src = importedState.playing.song.src instanceof Array ? importedState.playing.song.src[0] : importedState.playing.song.src;
  return importedState;
}

var defaultOptions = {
  audioTagId: 'kokoro-sevice',
  initializeState: null
};
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
  }]);

  function Kokoro(options) {
    _classCallCheck(this, Kokoro);

    var op = Object.assign({}, defaultOptions, options);
    this._store = op.initializeState ? createStore(reducers, loadState(op.initializeState), composeWithDevTools(applyMiddleware(thunk))) : createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
    this._listeners = [];

    this._mount(op.audioTagId);
  }

  _createClass(Kokoro, [{
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;

      this._unmount();

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
    }
  }, {
    key: "subscribe",
    value: function subscribe(listener) {
      var _this = this;

      var o = this._listeners.find(function (item) {
        return item.listener === listener;
      });

      if (o) {
        return o.unsub;
      }

      var unsub = this._store.subscribe(function () {
        return listener(_this.getState());
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
    key: "_mount",
    value: function _mount(id) {
      var _this2 = this;

      this._ref = document.createElement('audio');
      if (id) this._ref.id = id;

      this._ref.addEventListener('canplay', function () {
        _this2._dispatch(setBufferedTime(_this2._ref.buffered));
      });

      this._ref.addEventListener('canplaythrough', function () {
        _this2._dispatch(setBufferedTime(_this2._ref.buffered));
      });

      this._ref.addEventListener('durationchange', function () {
        _this2._dispatch(setTotalTime(_this2._ref.duration));
      });

      this._ref.addEventListener('ended', function () {
        _this2._dispatch(autoNext());

        _this2._onSrcProbablyChanged();
      });

      this._ref.addEventListener('error', function () {
        var state = _this2.getState();

        if (state.playing.song.src instanceof Array && state.playing.srcIndex + 1 < state.playing.song.src.length) {
          _this2._dispatch(nextSrc());
        } else {
          _this2._dispatch(autoNext());
        }

        _this2._onSrcProbablyChanged();
      });

      this._ref.addEventListener('loadedmetadata', function () {
        _this2._dispatch(setTotalTime(_this2._ref.duration));
      });

      this._ref.addEventListener('pause', function () {
        _this2._dispatch(pause());
      });

      this._ref.addEventListener('play', function () {
        _this2._dispatch(play());
      });

      this._ref.addEventListener('progress', function () {
        _this2._dispatch(setBufferedTime(_this2._ref.buffered));
      });

      this._ref.addEventListener('ratechange', function () {
        _this2._dispatch(setSpeed(_this2._ref.playbackRate));
      });

      this._ref.addEventListener('timeupdate', function () {
        _this2._dispatch(setTimes({
          currentTime: _this2._ref.currentTime,
          totalTime: _this2._ref.duration,
          bufferedTime: _this2._ref.buffered
        }));
      });

      this._ref.addEventListener('volumechange', function () {
        _this2._dispatch(setVolume(_this2._ref.volume));
      });

      document.body.appendChild(this._ref);
    }
  }, {
    key: "_unmount",
    value: function _unmount() {
      this._ref.remove();
    }
  }, {
    key: "_onSrcProbablyChanged",
    value: function _onSrcProbablyChanged() {
      var state = this.getState();

      if (state.playing.src !== this._ref.src) {
        this._ref.src = state.playing.src;
      }

      this._ref.currentTime = state.playing.currentTime;
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
      var state = this.getState;

      if (state.playing.paused) {
        this._ref.play();
      } else this._ref.pause();
    }
  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(time) {
      this._ref.currentTime = time;
    }
  }, {
    key: "next",
    value: function next$1() {
      this._dispatch(next());

      this._onSrcProbablyChanged();
    }
  }, {
    key: "previous",
    value: function previous$1() {
      this._dispatch(previous());

      this._onSrcProbablyChanged();
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
    value: function setVolume(volume) {
      this._ref.volume = volume;
    }
  }, {
    key: "setSpeed",
    value: function setSpeed(speed) {
      this._ref.playbackRate = speed;
    }
  }]);

  return Kokoro;
}();

export default Kokoro;
export { Kokoro, LYRICS_TYPE_L2C, LYRICS_TYPE_LRC, PLAY_ORDER, PLAY_ORDER_LOOP, PLAY_ORDER_SHUFFLE, PLAY_ORDER_SINGLE, index as actions };
//# sourceMappingURL=kokoro.esm.js.map
