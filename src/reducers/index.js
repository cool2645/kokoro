import { combineReducers } from 'redux'

import player from './player'
import playlist from './playlist'
import playing from './playing'

export default combineReducers({
  player,
  playing,
  playlist
})
