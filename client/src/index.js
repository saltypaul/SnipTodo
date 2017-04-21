/**
 * Render Routes to the div in index.html with id=content.
 * 
 */

import '../dist/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

ReactDOM.render(
  Routes,
  document.getElementById('content')
);