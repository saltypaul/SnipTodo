import React, { PureComponent } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';


//a pure component, stateless
export default class Home extends PureComponent {
  active (path) {
    if (this.props.location.pathname == path) {
      return 'active';
    }
  }
  render () {
    return (
      <div className="main">
        <a href="https://github.com/saltypaul">
          <img 
            style={ {position: 'absolute', top: 0, right: 0, border: 0 } }
            src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" 
            alt="Fork me on GitHub" 
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
          />
        </a>

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
              <LinkContainer to="/about">
                <NavItem>About</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }

}