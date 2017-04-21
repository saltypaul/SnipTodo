/**
 * The container. Act as the parent of all other components under the route "/todolist"
 *
 * @module TodoListContainer
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import * as todoListActionCreators from '../actions/todolist';

import { Editor, TodoListManager, PopAlert } from '../components';
import { hashHistory } from 'react-router';


class TodosContainer extends Component {

  constructor (props) {
    // Call super, get context.
    super();
    this.popEdit = this.popEdit.bind(this);
    this.popAdd = this.popAdd.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.setAlertName = this.setAlertName.bind(this);

    this.setSelectedTodo = this.setSelectedTodo.bind(this);
    this.setEditedTodo = this.setEditedTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.uploadTodo = this.uploadTodo.bind(this);
    this.snipTodo   = this.snipTodo.bind(this);

    /**
     * A mapping from alert names to their confirm functions.
     * For example, if the alertName is 'delete', when the Confirm button on the
     * alert dialog is clicked, this.deleteTodo will be called.
     * 
     * @type {Object}
     */
    this.alertNameToConfirm = {
      "delete": this.deleteTodo,
      "snip": this.snipTodo,
      "quitEditor": this.closeEditor
    };

    /**
     * A mapping from alert names to their style names.
     * @type {Object}
     */
    this.alertNameToStyle = {
      "delete": "danger",
      "snip": "info",
      "quitEditor": "danger"
    };

    /**
     * A mapping from alert names to their hint texts.
     * @type {Object}
     */
    this.alertNameToPopText = {
      "delete": "Will remove this item for good.",
      "snip": "Will remove stopwords and break the item into sentences.",
      "quitEditor": "Quit without saving changes."
    };

  }

  /**
   * Lifecycle method, executed after first render.
   */
  componentDidMount () {
    this.getTodoList();
  }

  /**
   * Dispatch a GET_TODOLIST action, intercepted by saga watcher.
   */
  getTodoList () {
    this.props.todoListActions.getTodoList();
  }

  /**
   * Pop up the Editor view, set selectedTodo and editedTodo.
   * Here editedTodo is first copied from selected todo， which will be shown.
   * 
   * @param index {Number} the index where popEdit is invoked.
   */
  popEdit (index) {

    this.props.todoListActions.setEditedTodo(this.props.todolist[index]);
    this.props.todoListActions.setSelectedTodo(this.props.todolist[index]);
    // This call will set the state 'showEditor'
    this.props.todoListActions.setEditor(true);

  }

  /**
   * Pop up the Editor view to add a new todo.
   * Starting fresh, no selectedTodo provided.
   */
  popAdd () {
    this.props.todoListActions.setEditedTodo(Immutable.Map().toJS());
    this.props.todoListActions.setSelectedTodo(Immutable.Map().toJS());
    // This call will set the state 'showEditor'
    this.props.todoListActions.setEditor(true);
  }

  /**
   * Close the Editor view
   */
  closeEditor () {
    this.props.todoListActions.setEditedTodo(Immutable.Map().toJS());
    this.props.todoListActions.setSelectedTodo(Immutable.Map().toJS());
    this.props.todoListActions.setEditor(false);
  }

  /**
   * This will reset the alertName, which controls how to show the alert.
   * 
   * @param alertName {string} the alert name string. can be "delete", "snip", "quitEditor", '', null.
   */
  setAlertName ( alertName ) {
    this.props.todoListActions.setAlertName( alertName );
  }

  /**
   * Set editedTodo, tracking the element values from Editor.
   */
  setEditedTodo ( ) {
    const editedTodoText = document.getElementById('edit-todo-text').value;
    const editedTodoComplete = document.getElementById('edit-todo-complete').checked;

    const editedTodo = Object.assign({}, this.props.editedTodo, { text: editedTodoText, completed: editedTodoComplete});

    this.props.todoListActions.setEditedTodo(editedTodo);
  }

  /**
   * Set selectedTodo according the item on which it is called.
   * @param todoItem [Object] which todo item to set as selected. 
   */
  setSelectedTodo (todoItem) {
    this.props.todoListActions.setSelectedTodo(todoItem);
  }

  /**
   * Dispatch a DELETE_TODO action, intercepted by saga watcher.
   */
  deleteTodo ( ) {
    this.props.todoListActions.deleteTodo( );
    // Also, reset selectedTodo
    this.props.todoListActions.setSelectedTodo(Immutable.Map().toJS());
  }

  /**
   * Either to post a new todo, or to update an old one. 
   * These two operations are merged together for reusability.
   * No arguments are provided, the aimed item will be editedTodo.
   * That is, either to post the editedTodo as a new todo, or path it as old.
   */
  uploadTodo ( ) {
    /**
     * Dispatch a UPLOAD_TODO action, intercepted by saga watcher.
     */
    this.props.todoListActions.uploadTodo();
    // Reset selectedTodo
    this.props.todoListActions.setSelectedTodo(Immutable.Map().toJS());
    // Close the Editor view
    this.props.todoListActions.setEditor(false);
  }

  /**
   * For the selectedTodo, remove stopwords, and break paragraph into sentences.
   * Dispatch a SNIP_TODO action, intercepted by saga watcher.
   */
  snipTodo ( ) {
    this.props.todoListActions.snipTodo();
    // Reset selectedTodo
    this.props.todoListActions.setSelectedTodo(Immutable.Map().toJS());
  }

  render () {

    const todolist = this.props.todolist;
    const selectedTodo = this.props.selectedTodo;
    const editedTodo = this.props.editedTodo;
    const alertName = this.props.alertName;
    const showEditor = this.props.showEditor;

    return (
      <div>
        <PopAlert
          alertName={alertName}
          confirm={this.alertNameToConfirm[alertName]}
          popText={this.alertNameToPopText[alertName]}
          setAlertName={this.setAlertName}
          alertStyle={this.alertNameToStyle[alertName]}
        />
        <Editor
          selectedTodo={selectedTodo}
          editedTodo={editedTodo}
          showEditor={showEditor}
          closeEditor={this.closeEditor}
          setAlertName={this.setAlertName}
          setEditedTodo={this.setEditedTodo}
          uploadTodo={this.uploadTodo}
        />
        <TodoListManager
          todolist={todolist}
          popEdit={this.popEdit}
          popAdd={this.popAdd}
          setAlertName={this.setAlertName}
          setSelectedTodo={this.setSelectedTodo}
        />
      </div>
    );
  }
}

/**
 * Map states in store to props, making them accessible (readable).
 */
function mapStateToProps (state) {
  return {
    todolist: state.getIn(['todolist', 'list'], Immutable.List()).toJS(),
    editedTodo: state.getIn(['todolist', 'editedTodo'], Immutable.Map()).toJS(),
    selectedTodo: state.getIn(['todolist', 'selectedTodo'], Immutable.Map()).toJS(),
    alertName: state.getIn(['todolist', 'alertName'], ''),
    showEditor: state.getIn(['todolist', 'showEditor'], false),
  };
}

/**
 * Map action dispatching to props, making them invokable.
 * Dispatched actions will be handled by reducer and sagas.
 */
function mapDispatchToProps (dispatch) {
  return {
    todoListActions: bindActionCreators(todoListActionCreators, dispatch)
  };
}

//Export connected TodosContainer
export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);

