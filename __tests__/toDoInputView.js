/**
 * Created by anurag on 22/08/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ToDoInputView from '../src/toDoInput';

describe('ToDoInput tests', () => {
  let toDoInputView, toDoInputViewNode;

  toDoInputView = TestUtils.renderIntoDocument(
    <ToDoInputView></ToDoInputView>
  );

  toDoInputViewNode = ReactDOM.findDOMNode(toDoInputView);

  it('should render todoinput view without text correctly', () => {
    expect(toDoInputViewNode.querySelector('input').value.length).toBe(0);
  });
});

describe('ToDoInput tests with text', () => {
  let toDoInputViewWithText, toDoInputViewWithTextNode, addToDo;

  beforeEach(() => {
    addToDo = jest.genMockFunction();

    toDoInputViewWithText = TestUtils.renderIntoDocument(
      <ToDoInputView addToDo={addToDo}></ToDoInputView>
    );

    toDoInputViewWithText.setState({
      toDoText: 'Phone bill due'
    });

    toDoInputViewWithTextNode = ReactDOM.findDOMNode(toDoInputViewWithText);
  });

  it('should render todoinput view with text correctly', () => {
    expect(toDoInputViewWithTextNode.querySelector('input').value).toBe('Phone bill due');
  });

  it('should add todo item after pressing enter', () => {
    const inputText = toDoInputViewWithTextNode.querySelector('input');
    inputText.value = 'Check';
    TestUtils.Simulate.change(inputText);
    TestUtils.Simulate.keyUp(inputText, {key: "Enter", keyCode: 13, which: 13});

    expect(addToDo.mock.calls.length).toBe(1);
    expect(inputText.value.length).toBe(0);
  });

  it('should add todo item after clicking add button', () => {
    const inputText = toDoInputViewWithTextNode.querySelector('input'),
      addToDoBtn = toDoInputViewWithTextNode.querySelector('.add-todo-btn');

    TestUtils.Simulate.click(addToDoBtn);
    expect(addToDo.mock.calls.length).toBe(1);
    expect(inputText.value.length).toBe(0);
  });
});