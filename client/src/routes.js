import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Archive } from './components';
import { TodoListContainer } from './containers';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={Welcome} />
      <Route path="/about" component={About} />
    </Route>
    <Route path="/todolist" component={Archive}>
      <IndexRoute component={TodoListContainer}/>
    </Route>
  </Router>
);

export default routes;