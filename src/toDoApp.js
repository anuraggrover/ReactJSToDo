/**
 * Created by anurag on 09/06/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {default as ToDoListView} from './toDoListView';

(function () {
  'use strict';

  ReactDOM.render(<ToDoListView></ToDoListView>, document.getElementById('main'));
})();

