import { combineReducers } from 'redux';
import snake from './snake';
import apple from './apple';
import game from './game';

const rootReducer = combineReducers({
  snake,
  apple,
  game,
});

export default rootReducer;
