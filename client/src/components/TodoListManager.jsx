/**
 * This module acts as the container of a list of Todo view.
 *
 * @module TodoListManager
 */

import React, { PureComponent } from 'react';
import Todo from './Todo';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


export default class TodoListManager extends PureComponent {

  render () {

    /**
     * @attribute todolist {Array} a list of Todo items
     * @attribute popEdit {Function} called to pop the Editor window to edit the item.
     * @attribute popAdd {Function} called to pop the Editor window to add a new item.
     * @attribute setSelectedTodo {Function} called to change selectedTodo.
     * @attribute setAlertName {Function} called to set the alertName.
     */
    const {
      todolist,
      popEdit,
      popAdd,
      setAlertName,
      setSelectedTodo,
    } = this.props;

    return (
      <div className="container">
        {/* a navigation bar fixed to the top, making it easier to access buttons on it. */}
        <Navbar inverse collapseOnSelect defaultExpanded fixedTop>
            <Navbar.Header>
              <LinkContainer to="/">
                <Navbar.Brand>
                  SnipTodo
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem eventKey={1} onClick={ () => popAdd() }>Add Todo</NavItem>
              </Nav>
            </Navbar.Collapse>
        </Navbar>

        <div className="innercontainer" >
        <ListGroup>
          { 
            /**
             * Map each item to a Todo component, making a todo list.
             * The color of a specific Todo is decided by whether it's completed.
             * Completed items are show in green while un-completed ones are light yellow.
             */
            todolist.map( (todoItem, idx)=> {
              return (
                <div key={todoItem._id}>
                <ListGroupItem key={todoItem._id} bsStyle={todoItem.completed ? "success": "warning"}>
                  <Todo
                    todoItem={todoItem}
                    key={todoItem._id}
                    idx={idx}
                    popEdit={popEdit}
                    setAlertName={setAlertName}
                    setSelectedTodo={setSelectedTodo}
                  />
                </ListGroupItem>
                </div>
              );
            })
          }
        </ListGroup>
        </div>
        <hr/>
      </div>
    );
  }
}