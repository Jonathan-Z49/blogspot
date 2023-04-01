import 'modern-normalize';
import './css/App.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import RouteSwitch from './components/RouteSwitch';

ReactDOM.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>,
  document.getElementById('root'),
);
