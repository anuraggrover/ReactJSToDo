/**
 * Created by anurag on 22/08/16.
 */

jest.unmock('../src/todoInput');
jest.unmock('sinon');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ToDoInputView from '../src/todoInput';

describe('ToDoInput tests', () => {
  let toDoInputView, toDoInputViewWithText, toDoInputViewNode, toDoInputViewWithTextNode,
    addToDo;

  beforeEach(() => {
    addToDo = jest.genMockFunction();

    toDoInputView = TestUtils.renderIntoDocument(
      <ToDoInputView></ToDoInputView>
    );

    toDoInputViewNode = ReactDOM.findDOMNode(toDoInputView);

    toDoInputViewWithText = TestUtils.renderIntoDocument(
      <ToDoInputView addToDo={addToDo}></ToDoInputView>
    );

    toDoInputViewWithText.setState({
      toDoText: 'Phone bill due'
    });

    toDoInputViewWithTextNode = ReactDOM.findDOMNode(toDoInputViewWithText);
  });

  it('should render todoinput view without text correctly', () => {
    expect(toDoInputViewNode.querySelector('input').value.length).toBe(0);
  });

  it('should render todoinput view with text correctly', () => {
    expect(toDoInputViewWithTextNode.querySelector('input').value).toBe('Phone bill due');
  });

  it('should add todo item', () => {
    const inputText = toDoInputViewWithTextNode.querySelector('input');
    inputText.value = 'Check';
    TestUtils.Simulate.change(inputText);
    TestUtils.Simulate.keyUp(inputText, {key: "Enter", keyCode: 13, which: 13});

    expect(addToDo.mock.calls.length).toBe(1);
    expect(inputText.value.length).toBe(0);
  });
});