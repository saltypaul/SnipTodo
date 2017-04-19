import React, { PureComponent } from 'react';
import { Alert, ButtonToolbar, Button, Modal} from 'react-bootstrap';

export default class QuitAlert extends PureComponent {
  render () {
    const { showAlert, closeAlert, closeAlterAndEditor } = this.props;
    return (
      <Modal show={showAlert}>
        <h4>Quit without saving changes? </h4>
        <p>
          <Button bsStyle="danger" onClick={() => closeAlterAndEditor() }>Quit</Button>
          <span> or </span>
          <Button onClick={() => closeAlert() }>Back to Editor</Button>
        </p>
      </Modal>
    );
  }
}