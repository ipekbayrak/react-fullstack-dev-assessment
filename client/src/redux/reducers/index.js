import { combineReducers } from 'redux';
import changesReducer from './changesReducer.js';

export default combineReducers({
  changes: changesReducer
});
