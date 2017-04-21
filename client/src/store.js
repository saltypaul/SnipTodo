/**
 * This module configures the store.
 * 
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import reducer from './reducers';

/**
 * Creating THE store of the app
 */
const configureStore = () => {

  // Using saga to handle async requests. 
  const sagaMiddleware = createSagaMiddleware();

  // create store with reducer and middleware.
  // const store = createStore(
  //   reducer,
  //   applyMiddleware(sagaMiddleware)
  // );

  /**
   * Use redux-devtools browser extension for dev
   * Remove comment to enable. Remember to comment out the above counterpart.
   */ 
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
 
  // Start all sagas together.
  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;