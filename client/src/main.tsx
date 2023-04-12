import 'modern-normalize';
import './css/App.scss';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import React from 'react';
import ReactDOM from 'react-dom';

import RouteSwitch from './components/RouteSwitch';

disableReactDevTools();

ReactDOM.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>,
  document.getElementById('root'),
);
