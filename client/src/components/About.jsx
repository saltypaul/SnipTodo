import React, { PureComponent } from 'react';

export default class About extends PureComponent {
  render () {
    return (
      <div className="innercontainer">
        <h1 className="cover-heading">About SnipTodo</h1>
        <p className="lead">
        An app made with Node.js and React. @AceTseng
        </p>
      </div>
    );
  }
}