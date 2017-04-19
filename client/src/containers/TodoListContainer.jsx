import React, { Component } from 'react';
import { Editor, TodoListManager, QuitAlert} from '../components';
import { hashHistory } from 'react-router';

export default class TodosContainer extends Component {
  constructor (props) {
    super(props);
    // initial state
    this.state = { 
      todolist: [], 
      editedTodo: null,
      selectedTodo: null,
      showEditor: false,
      addNew: false,
      showAlert: false
    };
    this.popEdit = this.popEdit.bind(this);
    this.popAdd = this.popAdd.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.seteditedTodo = this.seteditedTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.uploadTodo = this.uploadTodo.bind(this);
    this.snipTodo   = this.snipTodo.bind(this);

    this.closeAlert = this.closeAlert.bind(this);
    this.closeAlterAndEditor = this.closeAlterAndEditor.bind(this);

  }


  componentDidMount () {
    // once mounted
    this.getTodoList();
  }

  popEdit (index) {
    this.setState(
      {
        editedTodo: this.state.todolist[index], 
        selectedTodo: this.state.todolist[index],
        showEditor: true, 
        addNew: false 
      }
    );
  }

  popAdd () {
    this.setState(
      {editedTodo: null, showEditor: true, addNew: true }
    );
  }

  closeEditor () {
    let sltdTodo = this.state.selectedTodo;
    let edTodo = this.state.editedTodo;

    if ( (!sltdTodo) && edTodo && edTodo.text ) {  // break it for clarity
      // don't close, show alert
      this.setState({showAlert: true});
    } else if ( sltdTodo && (sltdTodo.text !== edTodo.text || sltdTodo.completed !== edTodo.completed) ) {
      // don't close, show alert
      this.setState({showAlert: true});
    } else {  // nothing to save, really close it.
      this.setState({ showEditor: false});
    }
  }

  closeAlert () {
    // back to editor
    this.setState({
      showAlert: false
    });
  }

  closeAlterAndEditor () {
    // quit without saving
    this.setState({
      editedTodo: null,    // give up editing
      selectedTodo: null,  // restore selected
      showEditor: false,   // hide editor
      showAlert: false     // close alert
    });
  }

  seteditedTodo () {
    const editedTodoText = document.getElementById('edit-todo-text').value;
    const editedTodoComplete = document.getElementById('edit-todo-complete').checked;
    this.setState({
      editedTodo: Object.assign(
        {}, 
        this.state.editedTodo, 
        {text: editedTodoText, completed: editedTodoComplete}) 
    });
  }

  getTodoList () {
    fetch('http://localhost:8080/todolist', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(data => this.setState({ todolist: data }));
  }

  deleteTodo (id) {
     fetch(`http://localhost:8080/todolist/${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(response => {
      // remove todo from state
      this.setState({ todolist: this.state.todolist.filter(todo => todo._id !== id) }); 
      console.log(response.message);
    });
  }

  // post a new todo or patch an old todo, thus the name uploadTodo
  uploadTodo ( ) {
    //editedTodo: { text, completed }
    //method: 'POST' or 'PATCH' 
    let newTodo = this.state.editedTodo;
    let method = this.state.addNew ? 'POST' : 'PATCH';
    let subfix = this.state.addNew ? '' : '/'+newTodo._id;

    fetch('http://localhost:8080/todolist' + subfix, {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: method,
      body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(data => {
      // go back to the view of todolist
      this.setState({ showEditor: false});
      if (this.state.addNew) {
        this.setState({
          showEditor: false, 
          todolist: [data, ...this.state.todolist]
        });
      } else {
        this.setState({
          showEditor: false,
          showAlert: false,
          todolist: [data, ...this.state.todolist.filter(todo => todo._id !== newTodo._id)]
        });
      }
    });
  }

  // remove stopwords, and break paragraph into sentences.
  snipTodo (id) {
     fetch(`http://localhost:8080/swr/${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      // remove original todo from state
      // and add new todos
      let newTodoList = this.state.todolist.filter(todo => todo._id !== id).concat( data );
      this.setState({ todolist: newTodoList}); 
    });
  }

  render () {

    const { todolist, editedTodo, showEditor, showAlert } = this.state;
    return (
      <div>
        <QuitAlert 
          showAlert={showAlert}
          closeAlert={this.closeAlert}
          closeAlterAndEditor={this.closeAlterAndEditor}
        />
        <Editor
          editedTodo={editedTodo}
          showEditor={showEditor}
          closeEditor={this.closeEditor}
          seteditedTodo={this.seteditedTodo}
          uploadTodo={this.uploadTodo}
        />
        <TodoListManager
          todolist={todolist}
          popEdit={this.popEdit}
          popAdd={this.popAdd}
          deleteTodo={this.deleteTodo}
          snipTodo={this.snipTodo}
        />
      </div>
    );
  }

}