/**
 * This module initiates the server.
 * 
 * @module server
 * @author Xulong Zeng
 */

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { getTodolist, getTodo, postTodo, deleteTodo, patchTodo, getTodoSwr } from './app/routes/todo';
import { URL_DB } from './utils/constants/urls';

/**
 * The application runs on Express, initiate an Express instance here first.
 * @type Express
 */
const app = express();
// The port to listen on
const port = process.env.PORT || 8080;

// Database configuration
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};
mongoose.Promise = global.Promise;
mongoose.connect( URL_DB, options );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/**
 * bodyParser middleware for extracting the body of a request
 * morgan middleware as http request logger
 */
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// point to static asset
app.use(express.static(__dirname + '/client/dist'));

/**
 * A self-defined middleware
 * enabling http requests from webpack-dev-server
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
 * Define api routes here.
 * 
 * GET/todolist          get all todos
 * GET/todolist/:id      get a single todo by id
 * GET/swr/:id           get the stopword-removal result of a todo by id
 * POST/todolist         create a new todo
 * DELETE/todolist/:id    delete a todo by id
 * PATCH/todolist/:id     update a todo by id
 */
app.route('/todolist')
  .get(getTodolist)
  .post(postTodo);
app.route('/todolist/:id')
  .get(getTodo)
  .delete(deleteTodo)
  .patch(patchTodo);
app.route('/swr/:id')
  .get(getTodoSwr);
// handle all other request with homepage content
app.route('*').get((req, res) => {
  res.sendFile('client/dist/index.html', { root: __dirname });
});

// Start listening on port
app.listen(port);

console.log(`server listening on port ${port}`);


