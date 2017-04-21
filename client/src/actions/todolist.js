/**
 * This module defines all the actions.
 * The state structure in the store may seem something like this:
 * http://7xrz9i.com1.z0.glb.clouddn.com/store 
 */
import {

  GET_TODOLIST,
  GET_TODOLIST_SUCCESS,
  GET_TODOLIST_FAILURE,

  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,

  UPLOAD_TODO,
  UPLOAD_TODO_SUCESS,
  UPLOAD_TODO_FAILURE,

  SNIP_TODO,
  SNIP_TODO_SUCESS,
  SNIP_TODO_FAILURE,

  SET_EDITED_TODO,
  SET_SELECTED_TODO,
  SET_ALERT_NAME,
  SET_EDITOR,

} 
from '../../../utils/constants/redux';

function getTodoList () {
  return {
    type: GET_TODOLIST
  };
}

//if succeed fetching
function getTodoListSuccess (todolist) {
  return {
    type: GET_TODOLIST_SUCCESS,
    todolist
  };
}

function getTodoListFailure () {
  return {
    type: GET_TODOLIST_FAILURE
  };
}

function deleteTodo (item) {
  return {
    type: DELETE_TODO,
    item
  };
}

function deleteTodoSuccess (todolist) {
  return {
    type: DELETE_TODO_SUCCESS,
    todolist
  };
}

function deleteTodoFailure () {
  return {
    type: DELETE_TODO_FAILURE
  };
}

function uploadTodo ( ) {
  return {
    type: UPLOAD_TODO
  };
}

function uploadTodoSuccess (todolist) {
  return {
    type: UPLOAD_TODO_SUCESS,
    todolist
  };
}

function uploadTodoFailure () {
  return {
    type: UPLOAD_TODO_FAILURE
  };
}

function snipTodo () {
  return {
    type: SNIP_TODO
  };
}

function snipTodoSuccess (todolist) {
  return {
    type: SNIP_TODO_SUCESS,
    todolist
  };
}

function snipTodoFailure () {
  return {
    type: SNIP_TODO_FAILURE
  };
}



function setEditedTodo (editedTodo) {
  return {
    type: SET_EDITED_TODO,
    editedTodo
  };
}

function setSelectedTodo ( selectedTodo ) {
  return {
    type: SET_SELECTED_TODO,
    selectedTodo
  };
}

function setAlertName ( alertName ) {
  return {
    type: SET_ALERT_NAME,
    alertName
  };
}

function setEditor ( showEditor ) {
  return {
    type: SET_EDITOR,
    showEditor
  };
}

export {
  getTodoList,
  getTodoListSuccess,
  getTodoListFailure,

  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailure,

  uploadTodo,
  uploadTodoSuccess,
  uploadTodoFailure,

  snipTodo,
  snipTodoSuccess,
  snipTodoFailure,

  setEditedTodo,
  setSelectedTodo,
  setAlertName,
  setEditor
};

