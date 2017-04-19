import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { getTodolist, getTodo, postTodo, deleteTodo, patchTodo, getTodoSwr } from './app/routes/todo';

const app = express(); // express server instance
const port = process.env.PORT || 8080;

// db configuration
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/acedb', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// bodyParser for extracting the body of a request
// morgan as http request logger middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// point to static asset
app.use(express.static(__dirname + '/client/dist'));

// self-defined middleware
// enables making http requests from webpack-dev-server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// define api routes
app.route('/todolist')
  .get(getTodolist)  // get the whole todolist
  .post(postTodo);   // post a new todo item
app.route('/todolist/:id')
  .get(getTodo)      // get a todo item
  .delete(deleteTodo)// delete a todo item
  .patch(patchTodo); // update a todo item

app.route('/swr/:id')
  .get(getTodoSwr);  // get the stop-word-removal result of a todo

// handle other request with homepage content
app.route('*').get((req, res) => {
  res.sendFile('client/dist/index.html', { root: __dirname });
});

// listen on the port
app.listen(port);

console.log(`server listening on port ${port}`);


