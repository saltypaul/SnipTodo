/**
 * This module offers a reducer for local actions.
 * By local, it means those actions without interaction with the server.
 * 
 */
import Immutable from 'immutable';

import {

  GET_TODOLIST_SUCCESS,
  GET_TODOLIST_FAILURE,

  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,

  UPLOAD_TODO_SUCESS,
  UPLOAD_TODO_FAILURE,

  SNIP_TODO_SUCESS,
  SNIP_TODO_FAILURE,

  SET_EDITED_TODO,
  SET_SELECTED_TODO,
  SET_ALERT_NAME,
  SET_EDITOR

} from '../../../utils/constants/redux';

/**
 * Work as a criteria for sorting items by their creation time, ascendingly.
 * @param  itemA  {Object}
 * @param  itemB  {Object}
 * @return {Number}
 */
const sortByCreateTimeAsc = (itemA, itemB) => {
  if (itemA.create_time < itemB.create_time) 
    return -1;
  else if (itemA.create_time > itemB.create_time)
    return 1;
  else 
    return 0;
}

/**
 * The initial state, an empty map.
 * @type {Immutable.Map}
 */
const initialState = Immutable.Map();

/**
 * The reducer.
 * @param  state   {Immutable.Map}  current state
 * @param  action  {Object}         the dispatched action
 * @return {Immutable.Map}          next state
 */
export default (state=initialState, action) => {

  switch (action.type) {

    case SET_EDITED_TODO: {
      return state.merge({ editedTodo: action.editedTodo });
    }
    case SET_SELECTED_TODO: {
      return state.merge({ selectedTodo: action.selectedTodo })
    }
    case SET_ALERT_NAME: {
      return state.merge({ alertName: action.alertName });
    }
    case SET_EDITOR: {
      return state.merge({ showEditor: action.showEditor });
    }

    /**
     * If GET_TODOLIST_SUCCESS, DELETE_TODO_SUCCESS, UPLOAD_TODO_SUCESS, SNIP_TODO_SUCESS,
     * return a new state containing new data. Note the state list is sorted.
     * Corresponding actions are dispatched by saga.
     */
    case GET_TODOLIST_SUCCESS:
    case DELETE_TODO_SUCCESS:
    case UPLOAD_TODO_SUCESS: 
    case SNIP_TODO_SUCESS: {
      return state.merge({ list: action.todolist.sort( sortByCreateTimeAsc ) });
    }

    /**
     * If GET_TODOLIST_FAILURE, DELETE_TODO_FAILURE, DELETE_TODO_FAILURE,
     * or any other unhandled actions, just return the old state.
     */
    default:
      return state;
  }
}