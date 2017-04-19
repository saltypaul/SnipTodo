import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Layout extends PureComponent {
  return () {
    return (
      <div className="view">
        <nav className="navbar navbar-inverse">
          <Link className="navbar-brand" to="/">
            <img src='http://ooickqdin.bkt.clouddn.com/1492520004_946739.png' className='header-logo'/>
          </Link>
        </nav>
        {this.props.children}
        <footer className="text-center">
          <p>&copy; 2017 Ace Tseng</p>
        </footer>
      </div>
    );
  }
}