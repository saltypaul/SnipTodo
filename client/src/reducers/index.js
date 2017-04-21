/**
 * This module combines all sub-reducers into one reducer,
 * as there should be only one reducer when creating store.
 * For now, only one reducer is used, extensible in future versions.
 * Here combineReducers from redux-immutable is utilized.
 */
import { combineReducers } from 'redux-immutable';
import todolist from './todolist'; 

// combineReducers merges all reducers.
export default combineReducers({
  todolist
});