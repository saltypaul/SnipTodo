/**
 * This module is the view of a single Todo
 *
 * @module Todo
 */

import React, { PureComponent } from 'react';
import { Row, Col, ButtonToolbar, Button, Alert } from 'react-bootstrap';

export default class Todo extends PureComponent {

  render () {

    /**
     * @attribute todoItem {Object} the todo item to show.
     * @attribute idx {Number} the index of the todo item in the "list" state.
     * @attribute popEdit {Function} called to pop up the Editor window.
     * @attribute setSelectedTodo {Function} called to change selectedTodo.
     * @attribute setAlertName {Function} called to set the alertName.
     */
    const {
      todoItem,
      idx,
      popEdit,
      setSelectedTodo,
      setAlertName,
    } = this.props;

    // two possible alert names
    const alertNameDelete = "delete";
    const alertNameSnip = "snip";

    // The max length of string to show.
    const maxTextView = 80;
    return (
      <div>
      <Row className="show-grid">
        <Col xs={12} md={8}>
          <p className='todo-text'>
            {/* slice the string according to maxTextView */}  
            { todoItem.text.length < maxTextView ? todoItem.text : todoItem.text.slice(0, maxTextView) + '...' }
          </p>
        </Col>
        <Col xs={6} md={4} >
          <div className='todo-button-div'>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={() => popEdit( idx ) }>View</Button>
            
            <Button bsStyle="info" onClick={
              () => {
                setSelectedTodo(todoItem);
                setAlertName(alertNameSnip);
              }
            }>
            Snip
            </Button>

            <Button bsStyle="danger" 
              onClick={ 
                () => {
                  setSelectedTodo(todoItem); 
                  setAlertName(alertNameDelete)
                }
              }>
              Delete
            </Button>
          </ButtonToolbar>
          </div>
        </Col>
      </Row>
      </div>
    );
  }
}
