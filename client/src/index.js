import '../dist/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

// render views to #content div 
ReactDOM.render(
  Routes,
  document.getElementById('content')
);