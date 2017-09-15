/**
 * @Author: weijie
 * @Date:   2017-09-15T09:10:22+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-15T11:15:35+08:00
 */



import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './containers/App';


// Render the main component into the dom
ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>), document.getElementById('app'));

// ReactDOM.render(<Main/>, document.getElementById('app'));
