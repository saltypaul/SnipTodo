import React, { Component } from 'react';
import { Editor, TodoListManager } from '../components';
import { hashHistory } from 'react-router';

export default class TodosContainer extends Component {
  constructor (props) {
    super(props);
    // initial state
    this.state = { 
      todolist: [], 
      selectedTodo: null,
      showEditor: false,
      addNew: false
    };
    this.popEdit = this.popEdit.bind(this);
    this.popAdd = this.popAdd.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.setSelectedTodo = this.setSelectedTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.uploadTodo = this.uploadTodo.bind(this);
    this.snipTodo   = this.snipTodo.bind(this);
  }


  componentDidMount () {
    // once mounted
    this.getTodoList();
  }

  popEdit (index) {
    this.setState(
      {selectedTodo: this.state.todolist[index], showEditor: true, addNew: false }
    );
  }

  popAdd () {
    this.setState(
      {selectedTodo: null, showEditor: true, addNew: true }
    );
  }

  closeEditor () {
    this.setState({ showEditor: false});
  }

  setSelectedTodo () {
    const selectedTodoText = document.getElementById('edit-todo-text').value;
    const selectedTodoComplete = document.getElementById('edit-todo-complete').checked;
    this.setState({
      selectedTodo: Object.assign(
        {}, 
        this.state.selectedTodo, 
        {text: selectedTodoText, completed: selectedTodoComplete}) 
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
    let newTodo = this.state.selectedTodo;
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
      let newTodoList ;
      if (this.state.addNew) {
        this.setState({
          showEditor: false, 
          todolist: [data, ...this.state.todolist]
        });
      } else {
        this.setState({
          showEditor: false,
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

    const { todolist, selectedTodo, showEditor } = this.state;
    return (
      <div>
        <Editor
          selectedTodo={selectedTodo}
          showEditor={showEditor}
          closeEditor={this.closeEditor}
          setSelectedTodo={this.setSelectedTodo}
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