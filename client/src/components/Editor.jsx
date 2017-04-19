import React, { PureComponent } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Checkbox, Modal, Button, FormControl, Row } from 'react-bootstrap';

export default class Editor extends PureComponent {

  render() {
    const { editedTodo, showEditor, closeEditor, seteditedTodo, uploadTodo } = this.props;
    let ckbox;
    if (editedTodo && editedTodo.completed) {
      ckbox = (
        <Checkbox checked id="edit-todo-complete" onChange={ () => seteditedTodo()}>
        Completed
        </Checkbox>
      );
    } else {
      ckbox = (
        <Checkbox id="edit-todo-complete" onChange={ () => seteditedTodo()}>
        Completed
        </Checkbox>
      );
    }
    //const lbCkbox = (<label onClick={ () => seteditedTodo() }>ckbox</label>);

    const viewText = editedTodo ? editedTodo.text : '';

    return (
      <div className="static-modal">
      <Modal show={showEditor} >
          <Modal.Header>
            <div className="text-left">
              <Button onClick={ () => closeEditor() }>Back</Button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <FormControl
             id="edit-todo-text"
             componentClass="textarea"
             value={viewText}
             onChange={() => seteditedTodo()}
            />
          </Modal.Body>
          <Modal.Footer>
          
            {ckbox}
            <Button bsStyle="primary" onClick={ () => uploadTodo() }>Save</Button>
          
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}