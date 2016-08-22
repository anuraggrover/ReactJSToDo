jest.unmock('../src/toDoItemView');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ToDoItemView from '../src/toDoItemView';

describe('ToDoItemTests', () => {
  let toDoItem, toDoItemNode, toDoDoneItem, toDoDoneItemNode;

  const deleteFn = jest.genMockFunction();
  const toggleDoneFn = jest.genMockFunction();

  beforeEach(() => {
    toDoItem = TestUtils.renderIntoDocument(
      <ToDoItemView isDone={false} toDoItem="Birthday" delete={deleteFn} toggleDone={toggleDoneFn}/>
    );

    toDoItemNode = ReactDOM.findDOMNode(toDoItem);

    toDoDoneItem = TestUtils.renderIntoDocument(
      <ToDoItemView isDone={true} toDoItem="Birthday" delete={deleteFn} toggleDone={toggleDoneFn}/>
    );

    toDoDoneItemNode = ReactDOM.findDOMNode(toDoDoneItem);
  });

  it('should render todo item with correct text', () => {
    // Verify that it's Off by default
    expect(toDoItemNode.classList.contains('todo-item')).toBe(true);
    expect(toDoItemNode.querySelector('.todo-text').textContent).toBe('Birthday');
  });

  it('shows todo item with NOT DONE state with action to mark it as done', () => {
    expect(toDoItemNode.querySelectorAll('.todo-mark-done.hide').length).toBe(0);
    expect(toDoItemNode.querySelectorAll('.todo-mark-undone.hide').length).toBe(1);
  });

  it('shows todo item WITH DONE state with action to mark it as done', () => {
    expect(toDoDoneItemNode.querySelectorAll('.todo-mark-done.hide').length).toBe(1);
    expect(toDoDoneItemNode.querySelectorAll('.todo-mark-undone.hide').length).toBe(0);
  });
  
  it('should mark todo as done on clicking mark as done', () => {
    TestUtils.Simulate.click(toDoItemNode.querySelectorAll('.todo-mark-done')[0]);

    // ToDo: This can only work when integration tests are written using ListView.
    /*expect(toDoItemNode.querySelectorAll('.todo-mark-done.hide').length).toBe(1);
    expect(toDoItemNode.querySelectorAll('.todo-mark-undone.hide').length).toBe(0);*/

    expect(toggleDoneFn.mock.calls.length).toBe(1);
  });

  it('should mark todo as not done on clicking mark as not done', () => {
    TestUtils.Simulate.click(toDoDoneItemNode.querySelectorAll('.todo-mark-undone')[0]);

    // ToDo: This can only work when integration tests are written using ListView.
    /*expect(toDoDoneItemNode.querySelectorAll('.todo-mark-done.hide').length).toBe(0);
    expect(toDoDoneItemNode.querySelectorAll('.todo-mark-undone.hide').length).toBe(1);*/

    expect(toggleDoneFn.mock.calls.length).toBe(2); // Not a very nice pattern. Tests should be independent and not mess with each other's setup environment.
  });

  it('should delete todo on clicking remove button', () => {
    TestUtils.Simulate.click(toDoItemNode.querySelector('.todo-remove'));
    expect(deleteFn.mock.calls.length).toBe(1);
  });
});
