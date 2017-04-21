/**
 * This module provides an alert window.
 *
 * @module PopAlert
 */

import React, { PureComponent } from 'react';
import { Alert, ButtonToolbar, Button, Modal} from 'react-bootstrap';

export default class PopAlert extends PureComponent {

  render () {
    /**
     * @attribute alertName {string} the name of this alert window, "delete", "snip", "quitEditor", "".
     * @attribute confirm {Function} the function to call when clicking on "Confirm".
     * @attribute popText {string} the hint text.
     * @attribute setAlertName {Function} the function to call when leaving, will reset "alertName" state.
     * @attribute alertStyle {string} the string indicating the style of the react-bootstrap component, "danger" or "info".
     */
    const { alertName, confirm, popText, setAlertName, alertStyle } = this.props;

    // The alert is shown only when alertName is set.
    const display = alertName ? 'inline' : 'none';

    return (
      // Inline style setting used.
      <div id="popalert" style={ { display, } }>
        <Alert bsStyle={alertStyle}>
          <h4>Are you sure?</h4>
          <p>{ popText }</p>
          <p>
            <Button bsStyle={alertStyle} onClick={ 
              () => {
                setAlertName(null);
                confirm();
              } 
            }>
            Confirm 
            </Button>
            <span className="alert-span">or</span>
            <Button onClick={() => setAlertName(null) }>Back</Button>
          </p>
        </Alert>
      </div>
    );
  }
}