/**
 * This module is the welcome view, and it's a stateless pure component.
 * 
 * @module Welcome
 */

import React, { PureComponent } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Button, Jumbotron} from 'react-bootstrap';

export default class Welcome extends PureComponent {
  
  render () {
    return (
      <div className="container">
        <Jumbotron>
            <h1>Hello, Snip!</h1>
            <p>
            This is SnipTodo, a Todo List app based on React and Stanford CoreNLP.
            </p>
            <p>
              <LinkContainer to='/todolist'>
                <Button bsStyle="primary">Go Snip</Button>
              </LinkContainer>
            </p>
        </Jumbotron>
      </div>
    );
  }
}

