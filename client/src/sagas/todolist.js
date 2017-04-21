/**
 * redux-saga helps handling asynchronous actions like data fetching.
 * 
 */
import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import { 

  GET_TODOLIST,
  DELETE_TODO,
  UPLOAD_TODO,
  SNIP_TODO

} from '../../../utils/constants/redux';

import { 

  URL_TODOLIST,
  URL_SNIP_TODO

} from '../../../utils/constants/urls';

import {  

  getTodoListSuccess, 
  getTodoListFailure,

  deleteTodoSuccess,
  deleteTodoFailure,

  uploadTodoSuccess,
  uploadTodoFailure,

  snipTodoSuccess,
  snipTodoFailure,

} from '../actions/todolist'; 

/**
 * Selector function for specific states. Called by saga select().
 */
const selectTodoList = (state) => {
  return state.getIn(['todolist', 'list']).toJS();
};

const selectEditedTodo = (state) => {
  return state.getIn(['todolist', 'editedTodo']).toJS();
}

const selectSelectedTodo = (state) => {
  return state.getIn(['todolist', 'selectedTodo']).toJS();
}

/**
 * The worker function that retrieves all todos from the server.
 * 
 * @return {Array}  the list of todos 
 */
const fetchTodoList = () => {
  return fetch( URL_TODOLIST, {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(response => response.json());
};

/**
 * The worker function for deleting a todo from the server.
 * 
 * @return {Object}  a message from server. 
 */
const deleteServerTodo = (id) => {
  return fetch( URL_TODOLIST+'/'+id, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'DELETE',
    })
    .then(response => response.json());
};

/**
 * The worker function that uploads a todo to the server.
 * 
 * @param  item   {Object}    the item to upload
 * @param  method {string}    the method arg for calling fetch, POST or PATCH
 * @param  subfix {string}    '' for POST and '/:someid' for PATCH method  
 * @return {Object}            the saved todo item.
 */
const uploadServerTodo = (item, method, subfix) => {

  return fetch( URL_TODOLIST+subfix, {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: method,
    body: JSON.stringify(item)
  })
  .then(response => response.json());

}

/**
 * The worker function that snips a todo, will resolve to getTodoSwr on server side.
 * By snip, it means removing stopwords and cutting passage to sentences.
 * 
 * @param  id {string}  the id of item to snip
 * @return {[type]}    [description]
 */
const snipServerTodo = (id) => {
  return fetch( URL_SNIP_TODO+'/'+id, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'GET',
    })
    .then(response => response.json());
}

/**
 * A generator function. Note yield call to fetchTodoList is put in a try catch 
 * in case the promise rejects.
 * 
 * @yield {Object} actions to take.
 */
function* getTodoList () {
  try{
    // Handled by saga watcher.
    const todolist = yield call(fetchTodoList);
    // Handled by reducer.
    yield put(getTodoListSuccess(todolist));
  } catch (err) {
    // Handled by reducer.
    yield put(getTodoListFailure());
  }
}

/**
 * A generator function. Note yield call to deleteServerTodo is put in a try catch 
 * in case the promise rejects.
 * 
 * @yield {Object} actions to take.
 */
function* deleteTodo ( ) {

  // The item to delete is the selected todo.
  const item = yield select(selectSelectedTodo);
  // Take all todos from state
  const todolist = yield select(selectTodoList);
  try {
    // Handled by saga watcher.
    yield call(deleteServerTodo, item._id);
    /**
     * New state excludes the deleted item.
     * Later, action is handled by reducer.
     */
    yield put(deleteTodoSuccess(todolist.filter(todo => todo._id !== item._id)));
  } catch (err) {
    // Handled by reducer.
    yield put(deleteTodoFailure());
  }
}

/**
 * A generator function.
 * 
 * @yield {Object} actions to take.
 */
function* uploadTodo () {

  // The item to upload is the edited todo.
  const item = yield select(selectEditedTodo); 

  let method;
  let subfix;
  let filterId;

  if ("_id" in item) { 
    // If editedTodo item contains an id, it's edited from old todo, so PATH.
    method = 'PATCH';
    subfix = '/' + item._id;
    filterId = item._id;
  } else {
    // Else it's a brand new todo, thus POST.
    method = 'POST';
    subfix = '';
    // Set filterId for later simplicity.
    filterId = '';
  }

  // Also, get the current todolist
  const todolist = yield select(selectTodoList);

  try{

    // The updated or newly created todo.
    const rez = yield call(uploadServerTodo, item, method, subfix);

    // Filter out old todo and add new todo to the todolist
    const newTodoList = todolist.filter(todo => todo._id !== filterId);
    newTodoList.push(rez);
    // Handled by reducer.
    yield put(uploadTodoSuccess(newTodoList));

  } catch (err) {
    // Handled by reducer.
    yield put(uploadTodoFailure());
  }

}

/**
 * A generator function. Note yield call to deleteServerTodo is put in a try catch 
 * in case the promise rejects.
 * 
 * @yield {Object} actions to take.
 */
function* snipTodo () {
  // The item to snip is the selected todo.
  const item = yield select(selectSelectedTodo);
  const todolist = yield select(selectTodoList);

  try{
    /**
     * The resulting group of new todos, created with each sentence in item.text,
     * with stopwords removed.
     */
    const rezList = yield call(snipServerTodo, item._id);
    // Filter out selected old todo, add all new ones.
    const newTodoList = todolist.filter(todo => todo._id !== item._id).concat(rezList);
    // Handled by reducer.
    yield put(snipTodoSuccess( newTodoList ));
  } catch (err) {
    // Handled by reducer.
    yield put(snipTodoFailure());
  }
}

/**
 * The watcher saga wait for dispatched GET_TODOLIST, DELETE_TODO,
 * UPLOAD_TODO, and SNIP_TODO actions, respectively.
 */
function* watchGetTodoList () {
  yield takeLatest(GET_TODOLIST, getTodoList);
}

function* watchDeleteTodo () {
  yield takeLatest(DELETE_TODO, deleteTodo)
}

function* watchUploadTodo () {
  yield takeLatest(UPLOAD_TODO, uploadTodo);
}

function* watchSnipTodo () {
  yield takeLatest(SNIP_TODO, snipTodo);
}

export {
  watchGetTodoList,
  watchDeleteTodo,
  watchUploadTodo,
  watchSnipTodo
};