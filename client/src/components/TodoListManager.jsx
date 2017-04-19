import React, { PureComponent } from 'react';
import Todo from './Todo';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


export default class TodoListManager extends PureComponent {
  render () {
    const {
      todolist,
      popEdit,
      popAdd,
      deleteTodo,
      snipTodo
    } = this.props;

    return (
      <div className="container">
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
                <NavItem eventKey={1} href="#" onClick={ () => popAdd() }>Add Todo</NavItem>
              </Nav>
            </Navbar.Collapse>
        </Navbar>

        <div className="innercontainer" >
        <ListGroup>
          {
            todolist.map( (todoItem, idx)=> {
              return (
                <div style={ {} }>
                <ListGroupItem key={todoItem._id} bsStyle={todoItem.completed ? "success": "warning"}>
                  <Todo
                    todoItem={todoItem}
                    key={todoItem._id}
                    idx={idx}
                    popEdit={popEdit}
                    deleteTodo={deleteTodo}
                    snipTodo={snipTodo}
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