/**
 * This module defines route rules within the app.
 * 
 */

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, Archive } from './components';
import { TodoListContainer } from './containers';

// THE only store for the whole app.
const store = configureStore();

const routes = (
  /**
   * Pass store to Provider,
   * making store available to all wrapped components.
   *
   * The URL structure:
   *  /           ==>      Home/Welcome
   *  /todolist   ==>      Archive/TodosContainer
   */
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={Welcome} />
      </Route>
      <Route path="/todolist" component={Archive}>
        <IndexRoute component={TodoListContainer}/>
      </Route>
    </Router>
  </Provider>
);

export default routes;