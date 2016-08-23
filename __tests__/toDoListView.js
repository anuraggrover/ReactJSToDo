/**
 * Created by anurag on 19/08/16.
 */
jest.unmock('../src/toDoItemView');
jest.unmock('../src/toDoListView');
jest.unmock('../src/toDoInput');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ToDoListView from '../src/toDoListView';
import ToDoItemView from '../src/toDoItemView';
import ToDoInputView from '../src/toDoInput';

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
  let toDoListView, toDoListViewNode, toDoItemViews, toDoInputViews;

  beforeEach(() => {
    toDoListView = TestUtils.renderIntoDocument(
      <ToDoListView></ToDoListView>
    );

    toDoListView.setState({
      toDoItems: [{
        done: false,
        id: '1',
        text: 'Remind mom about the phone bill'
      }, {
        done: false,
        id: '2',
        text: 'Remind mom about the phone bill'
      }]
    });

    toDoListViewNode = ReactDOM.findDOMNode(toDoListView);

    toDoItemViews = TestUtils.scryRenderedComponentsWithType(
      toDoListView,
      ToDoItemView
    );

    toDoInputViews = TestUtils.scryRenderedComponentsWithType(
      toDoListView,
      ToDoInputView
    );
  });

  it('should render multiple todo items in a list', () => {
    expect(toDoListViewNode.classList.contains('todo-list')).toBe(true);
    expect(toDoListViewNode.querySelector('.todo-list-title').textContent).toBe('To Dos');
    expect(toDoListViewNode.classList.contains('empty')).toBe(false);
    expect(toDoListViewNode.querySelectorAll('.todo-items').length).toBe(1);
  });

  it('should render todoinput and todoitems subcomponents', () => {
    // Component tests
    expect(toDoItemViews.length).toBe(2);
    expect(toDoInputViews.length).toBe(1);
  });
});


/**
 * These are integration tests which have been done within each component via mocks. This is an attempt
 * to test user functionality as a whole without mocking.
 */
describe('List view integration tests', () => {
  let toDoListView, toDoListViewNode, toDoInputText;

  beforeEach(() => {
    toDoListView = TestUtils.renderIntoDocument(
      <ToDoListView></ToDoListView>
    );

    toDoListViewNode = ReactDOM.findDOMNode(toDoListView);

    toDoInputText = toDoListViewNode.querySelector('.todo-input input');
  });

  it('should add one todo', () => {
    let toDoItemViews = TestUtils.scryRenderedComponentsWithType(
      toDoListView,
      ToDoItemView
    );

    expect(toDoItemViews.length).toBe(0);
    toDoInputText.value = 'This one todo';

    TestUtils.Simulate.change(toDoInputText);
    TestUtils.Simulate.keyUp(toDoInputText, {key: "Enter", keyCode: 13, which: 13});

    toDoItemViews = TestUtils.scryRenderedComponentsWithType(
      toDoListView,
      ToDoItemView
    );

    expect(toDoItemViews.length).toBe(1);
  });

  it('should delete one todo', () => {
    toDoListView.setState({
      toDoItems: [{
        done: false,
        id: '1',
        text: 'Remind mom about the phone bill'
      }, {
        done: false,
        id: '2',
        text: 'Remind mom about the phone bill'
      }]
    });

    let toDoItemViews = TestUtils.scryRenderedComponentsWithType(
      toDoListView,
      ToDoItemView
    );

    expect(toDoItemViews.length).toBe(2);

    let deleteBtn = toDoListViewNode.querySelector('.todo-remove');
    TestUtils.Simulate.click(deleteBtn);

    toDoItemViews = TestUtils.scryRenderedComponentsWithType(
      toDoListView,
      ToDoItemView
    );

    expect(toDoItemViews.length).toBe(1);
  });
});