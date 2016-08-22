/**
 * Created by anurag on 19/08/16.
 */
jest.unmock('../src/toDoItemView');
jest.unmock('../src/toDoListView');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ToDoListView from '../src/toDoListView';
import ToDoItemView from '../src/toDoItemView';

var mock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: mock });

describe('ToDoList render tests', () => {
  let toDoListView, toDoListViewNode;

  beforeEach(() => {
    toDoListView = TestUtils.renderIntoDocument(
      <ToDoListView></ToDoListView>
    );

    toDoListView.setState({
      toDoItems: [{
        done: false,
        id: '1',
        text: 'Remind mom about the phone bill'
      }]
    });

    toDoListViewNode = ReactDOM.findDOMNode(toDoListView);
  });

  it('should render multiple todo items in a list', () => {
    expect(toDoListViewNode.classList.contains('todo-list'));
    expect(toDoListViewNode.classList.contains('empty')).toBeFalsy();
    expect(toDoListViewNode.querySelectorAll('.todo-items').length).toBe(1);
    expect(toDoListViewNode.querySelectorAll('.todo-items')[0] instanceof ToDoItemView);
  });
});