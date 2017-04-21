/**
 * This module is the container of the home/welcome view, 
 * and it's a stateless pure component.
 * The usage of React.PureComponent gives a considerable increase in 
 * performance because it reduces the number of render operation in the application.
 * 
 * @module Archive
 */

import React, { PureComponent } from 'react';

export default class Archive extends PureComponent {

  render () {
    
    return (
      <div className="view">
        {this.props.children}
      </div>
    );
  }

}