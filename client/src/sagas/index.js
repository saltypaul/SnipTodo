/**
 * This module provides a generator function that starts all sagas.
 */

import {
  watchGetTodoList,
  watchDeleteTodo,
  watchUploadTodo,
  watchSnipTodo
} from './todolist';

export default function* rootSaga () {
  
  //start all sagas together
  yield [
    watchGetTodoList(),
    watchDeleteTodo(),
    watchUploadTodo(),
    watchSnipTodo()
  ];
}