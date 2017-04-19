import React, { PureComponent } from 'react';
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

export default class Todo extends PureComponent {
  render () {
    const {
      todoItem,
      idx,
      popEdit,
      deleteTodo,
      snipTodo
    } = this.props;
    const itemStyle = { "padding-top" : "0em" };
    return (
      <div>
      <Row className="show-grid">
        <Col xs={12} md={8}>
          <p style={ { "text-align" : "left", "height": "2em", "line-height": "2em", "margin": "0 0 0px"} }>
            { todoItem.text.length < 27 ? todoItem.text : todoItem.text.slice(0, 27) + '...' }
          </p>
        </Col>
        <Col xs={6} md={4} >
          <div style={ {float: "right"} }>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={() => popEdit( idx ) }>Edit</Button>
            <Button bsStyle="info" onClick={() => snipTodo( todoItem._id ) }>Snip</Button>
            <Button bsStyle="danger" onClick={() => deleteTodo( todoItem._id )}>Delete</Button>
          </ButtonToolbar>
          </div>
        </Col>
      </Row>
      </div>
    );
  }
}
