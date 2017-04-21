/**
 * This module describes all logics of service.
 */
import Todo from '../models/todo';
import removeStopWord from '../../utils/nlp/nlp';

/**
 * Get all the todo items, ascendingly sorted by create_time.
 */
const getTodolist = (req, res) => {
  Todo.find(null, null, { sort: { create_time : 1 } }, (err, todolist) => {
    if (err) {
      return res.send(err);
    }
    // Send JSON formated data
    res.json(todolist);
  });
};


/**
 * Get a single Todo item by id.
 */
const getTodo = (req, res) => {
  // Target item is specified by the id param of the request.
  const { id } = req.params;
  Todo.findById(id, (err, todo) => {
    if (err) {
      return res.send(err);
    }
    // Send JSON formated data
    res.json(todo); 
  });
};

/**
 * Create and post a new Todo item.
 */
const postTodo = (req, res) => {
  /**
   * The legitimate arguments shipped with req.body are text and completed.
   */
  let text = 'text' in req.body ? req.body.text : '';
  let completed = 'completed' in req.body ? req.body.completed : false;
  // Create a new item accordingly
  let todo = Object.assign(new Todo(), { text: text, completed: completed });
  /**
   * Save to new Todo to db.
   * The doc param inthe callback will be the item inserted
   */
  todo.save( (err, doc, numAffcted) => {
    if (err) {
      return res.send(err);
    }
    // Send the saved item back.
    res.json(doc);
  });
};

/**
 * Delete a Todo item by id
 */
const deleteTodo = (req, res) => {
  Todo.remove(
    // condition
    { _id: req.params.id },
    // callback
    err => {
      if (err) {
        return res.send(err);
      }
      // Inform client.
      res.json({ message: 'done'});
    }
  );
};


/**
 * Update a Todo item by id
 */
const patchTodo = (req, res) => {
  /**
   * The legitimate arguments shiped with req.body are text and completed,
   * since only they are allowed to be manually modified.
   */

  /**
   * The callback for findById. Predefine here for clarity.
   * Should find an item by id then update it.
   * How to use: Todo.findById(id, findAndUpdate);
   */
  const findAndUpdate = (err, todoOld) => {
    // Early return if no corresponding Todo is found.
    if (!todoOld) {
      return res.send(err);
    }

    // The new swr_flag, decided by old swr_flag new and old text.
    let swrFlagNew;
    // The new text. If offered by req.body, take it, otherwise keep the old.
    let textNew; 
    // The new completed. If offered by req.body, take it, otherwise follow the old.
    let completedNew = 'completed' in req.body ? req.body.completed : todoOld.completed;

    // If body has text 
    if ('text' in req.body) {
      /**
       * The new swr_flag is true only when old swr_flag is true and text is not modified.
       * That is, once the text is edited, reset swr_flag to indicate stopwords removal 
       * should be done again.
       */
      swrFlagNew = todoOld.swr_flag && req.body.text === todoOld.text;
      textNew = req.body.text;
    } else {
      // Else, keep original.
      swrFlagNew = todoOld.swr_flag;
      textNew = todoOld.text;
    }

    //Update db accordingly
    let newTodo = { 
      _id: req.params.id,
      swr_flag: swrFlagNew,
      text: textNew,
      completed: completedNew,
      create_time: todoOld.create_time, 
      last_modified: Date.now()
     };

    // This method yields the modified doc.
    Todo.findOneAndUpdate(
      // condition
      { _id: req.params.id },
      // doc
      newTodo,
      // options
      {new: true},
      // callback
      (err, doc) => {  
        if (err) {
          return res.send(err);
        }
        // Send back the modified doc.
        res.json(doc);
      }
    );
  };

  // Find the item by id and update it.
  Todo.findById(req.params.id, findAndUpdate);
};


/**
 * Get a todo item with stopwords removed.
 */
const getTodoSwr = (req, res) => {
  
  /**
   * The callback for findById. Predefine here for clarity.
   * Should find an item then remove stopwords from it.
   * How to use: Todo.findById(id, swrAndUpdate);
   */
  const swrAndUpdate = (err, todo) => {
    // Early return if no corresponding Todo found.
    if ( (!todo) || err ) {
      return res.send(err);
    }

    /**
     *  If already executed stopword removal, just return it.
     *  This helps ease the burden of the server.
     */
    if ( todo.swr_flag ) {
      // For a uniform format, return a list with a single Todo. 
      res.json( [ todo, ] );
    } else {
      /**
       * Else, execute stopword removal and update the database.
       * removeStopWord returns a promise that resolves to a list of strings,
       * where each string corresponds to a sentence in the original text,
       * with stopwords removed.
       */
        removeStopWord(todo.text).then( textList => {
        /**
         * This may be empty.
         * All the swr_flag conforms to that of the original Todo.
         * The create_time of each sentence indicates its order of appearance in the original text. 
         * But right now the time diff is sometimes too small. This may lead to problems with 
         * sorting by create_time.
         */
        let subTodoList = textList.map(
          textNew => Object.assign( new Todo(), { completed: todo.completed, text: textNew , swr_flag : true })
        );
        /**
         * Use bulk write to reduce interaction with db.
         * Insert all new Todos, and delete the original one.
         */
        let bulk = Todo.collection.initializeOrderedBulkOp();
        subTodoList.forEach( item => {
          bulk.insert( item );
        });
        // Find and remove.
        bulk.find({ _id: todo._id}).remove();
        bulk.execute((err, result) => {
          if (err) {
            return res.send(err);
          }
          // Send back the new Todos
          res.json(subTodoList);
        });
      });
    }
  };

  // Find the item by id and remove stopwords from it.
  Todo.findById(req.params.id, swrAndUpdate);

};


export { getTodolist, getTodo, postTodo, deleteTodo, patchTodo, getTodoSwr };








