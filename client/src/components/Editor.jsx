/**
 * This module offers the Editor view. It also works as the view window for an item.
 *
 * @module Editor
 */
import React, { PureComponent } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Checkbox, Modal, Button, FormControl, Row, Alert} from 'react-bootstrap';

export default class Editor extends PureComponent {

  render() {
    /**
     * @attribute selectedTodo {Object} the selected Todo corresponds to this Editor view, empty when adding new Todo
     * @attribute editedTodo {Object} the Todo being edited
     * @attribute showEditor {boolean} whether to show the Editor view, corresponds to the state "showEditor".
     * @attribute closeEditor {Function} called to close the Editor view.
     * @attribute setAlertName {Function} called to set the alertName.
     * @attribute setEditedTodo {Function} called when editing, to change the edited todo item.
     * @attribute uploadTodo {Function} call when clicking on Save button, to upload changes.
     */
    const {
      selectedTodo, 
      editedTodo, 
      showEditor, 
      closeEditor, 
      setAlertName, 
      setEditedTodo, 
      uploadTodo 
    } = this.props;

    /**
     * The status of this Checkbox indicates whether the corresponding item is completed.
     * So it's needed to resolve it before showing.
     * ckbox is a variable that resolves to a defaultly checked/unchecked checkbox.
     * ckbox is a react-bootstrap component, the prop checked decides its default status. 
     *
     *  @type {Checkbox}
     */
    let ckbox;
    // If editedTodo exists and it's completed, resolve to checked
    if (editedTodo && editedTodo.completed) {
      ckbox = (
        <Checkbox checked id="edit-todo-complete" onChange={ () => setEditedTodo()}>
        Completed
        </Checkbox>
      );
    } else {
      // otherwise, resolve to unchecked
      ckbox = (
        <Checkbox id="edit-todo-complete" onChange={ () => setEditedTodo()}>
        Completed
        </Checkbox>
      );
    }

    /**
     * The text to show in the textarea. It corresponds to editedTodo.text
     * 
     * @type {string}
     */
    const viewText = editedTodo ? editedTodo.text : '';

    /**
     * The alertName prop for a PopAlert. Alerts may be shown when trying to 
     * quit Editor without saving changes.
     * 
     * @type {String}
     */
    const alertName = "quitEditor";

    /**
     * Whether to show alert or close the Editor when clicking on Back.
     * When adding new Todo, or when the Todo is modified, show alert.
     * Otherwise, just close the Editor.
     */
    const showAlertOrCloseEditor = () => {

      // if adding new Todo
      if ( (!selectedTodo) && editedTodo && editedTodo.text.match(/\S/) ) {

        // don't close, show alert
        setAlertName(alertName);

        // else if modification made, either toggled completed or changed text.
      } else if ( selectedTodo && (selectedTodo.text !== editedTodo.text || selectedTodo.completed !== editedTodo.completed) ) {
        
        // don't close, show alert
        setAlertName(alertName);

        // else, nothing to save, just close it.
      } else {
        closeEditor();
      }
    };
    

    return (
      <div className="static-modal">
      {/* prop showEditor decides whether to show this view */}
      <Modal show={showEditor} >
          <Modal.Header>
            <div className="text-left">
              <Button onClick={ () => showAlertOrCloseEditor() }>Back</Button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <FormControl
             id="edit-todo-text"
             componentClass="textarea"
             value={viewText}
             onChange={() => setEditedTodo()}
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