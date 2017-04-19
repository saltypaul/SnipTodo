import Todo from '../models/todo';
import removeStopWord from '../../utils/nlp';

// get all the todo items, sorted by create_time
const getTodolist = (req, res) => {
  Todo.find(null, null, { sort: { create_time : 1 } }, (err, todolist) => {
    if (err) {
      return res.send(err);
    }
    // send json formated todolist
    res.json(todolist);
  });
};

// get a single todo by id
const getTodo = (req, res) => {
  const { id } = req.params;
  //db query for a todo
  Todo.findById(id, (err, todo) => {
    if (err) {
      return res.send(err);
    }
    // send json formated todo
    res.json(todo); 
  });
};

// create a new todo
const postTodo = (req, res) => {
  // the only legal args in req.body are text and completed
  let text = 'text' in req.body ? req.body.text : '';
  let completed = 'completed' in req.body ? req.body.completed : false;
  let todo = Object.assign(new Todo(), { text: text, completed: completed });
  // save to db
  todo.save((err, doc, numAffcted) => {
    if (err) {
      return res.send(err);
    }
    // inform client
    res.json(doc);
  });
};

// delete a todo by id
const deleteTodo = (req, res) => {
  // remove todo by id, and inform client
  Todo.remove(
    { _id: req.params.id },
    err => {
      if (err) {
        return res.send(err);
      }
      // inform client
      res.json({ message: 'done'});
    }
  );
};

// update a todo by id
const patchTodo = (req, res) => {
  // only legal params: completed and text

  // define the callback for findById
  const findAndUpdate = (err, old_todo) => {
    // early return if no corresponding todo found
    if (!old_todo) {
      return res.send(err);
    }

    let new_swr_flag;
    let new_text;
    let new_completed = 'completed' in req.body ? req.body.completed : old_todo.completed;

    // if body has text 
    if ('text' in req.body) {
      //new swr_flag is true only when old swr_flag is true and text is not modified
      new_swr_flag = old_todo.swr_flag && req.body.text === old_todo.text;
      new_text = req.body.text;
    } else {
      // else, keep original
      new_swr_flag = old_todo.swr_flag;
      new_text = old_todo.text;
    }

    //update db accordingly

    let newTodo = { 
      _id: req.params.id,
      swr_flag: new_swr_flag,
      text: new_text,
      completed: new_completed,
      create_time: old_todo.create_time, 
      last_modified: Date.now()
     };

    Todo.findOneAndUpdate(
      { _id: req.params.id },  //condition
      newTodo,  //doc
      {new: true}, //options
      (err, doc) => {  //callback
        if (err) {
          return res.send(err);
        }
        res.json(doc);
      }
    );
  };

  Todo.findById(req.params.id, findAndUpdate);
};

// get a todo item with stop-words removed
const getTodoSwr = (req, res) => {
  
  // define the callback for findById
  const swrAndUpdate = (err, todo) => {
    // early return if no corresponding todo found
    if ( (!todo) || err ) {
      return res.send(err);
    }

    // if already executed stopword removal and persisted to db:
    if ( todo.swr_flag ) {
      res.json(todo);
    } else {
      // else, execute stopword removal and update db
      // removeStopWord returns a promise, resolves to a list of text
      removeStopWord(todo.text).then( text_list => {
        let todo_list = text_list.slice(1, text_list.length).map( new_text => Object.assign( new Todo(), { completed: todo.completed, text: new_text , swr_flag : true }));
        if (text_list.length>0) {
          todo_list.push(Object.assign({}, todo._doc, { text: text_list[0], swr_flag: true, last_modified: Date.now() } ));
        }
        // will update if existed, otherwise will insert
        let bulk = Todo.collection.initializeOrderedBulkOp();
        for (let idx=0; idx<todo_list.length; idx++) {
          bulk.find( {_id: todo_list[idx]._id } ).upsert().update( { '$set': todo_list[idx] } );
        }
        // execute bulk update
        bulk.execute((err, result) => {
          if (err) {
            return res.send(err);
          }
          res.json(todo_list);
        });
      });
    }
  };

  Todo.findById(req.params.id, swrAndUpdate);

};


export { getTodolist, getTodo, postTodo, deleteTodo, patchTodo, getTodoSwr };








