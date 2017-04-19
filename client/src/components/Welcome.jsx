import React, { PureComponent } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Button, Jumbotron} from 'react-bootstrap';


// a pure, stateless component
export default class Welcome extends PureComponent {
  render () {
    return (
      <div className="innercontainer">
        <Jumbotron>
            <h1>Hello, Snip!</h1>
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
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