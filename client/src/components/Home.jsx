/**
 * This module is the container of the home/welcome view, 
 * and it's a stateless pure component.
 * The usage of React.PureComponent gives a considerable increase in 
 * performance because it reduces the number of render operation in the application.
 * 
 * @module Home
 */

import React, { PureComponent } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

export default class Home extends PureComponent {
  
  render () {
    return (
      <div className="main">
        {/* The github link to the upright corner */}
        <a href="https://github.com/saltypaul/SnipTodo">
          <img id="githubribon"
            src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" 
            alt="Fork me on GitHub" 
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"
          />
        </a>
        {/* Using React-Bootstrap */}
        <Navbar inverse collapseOnSelect defaultExpanded>
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
              <LinkContainer to="/todolist">
                <NavItem>Go Snip</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }

}