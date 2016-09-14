/**
 * Created by anurag on 09/06/16.
 */

import React from 'react';
import ToDoItemView from './toDoItemView';
import ToDoInput from './toDoInput';

import configureStore from './configureStore';
import toDoReducer from './reducers/todoReducer';

export default class ToDoListView extends React.Component {
  constructor(props) {
    super(props);
    
    let store = this.store = configureStore(toDoReducer, this._getToDos());

    this.state = {
      toDoItems: store.getState().toDoItems
    };

    this.addToDo = this.addToDo.bind(this);
    this.toggleToDoDone = this.toggleToDoDone.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  _getToDos() {
    let toDoItems;

    try {
      toDoItems = JSON.parse(localStorage.getItem('toDoItems') || []);
    } catch(e) {
      toDoItems = [];
    }

    let toDoId = localStorage.getItem('toDoId');
    toDoId = toDoId ? parseInt(toDoId, 10) : 0;

    return {
      toDoId, toDoItems
    };
  }

  _updateToDos() {
    this.setState({
      toDoItems: this.store.getState().toDoItems
    });
  }

  addToDo(toDoItemText) {
    this.store.dispatch({
      type: 'ADD_TODO',
      value: toDoItemText
    });
    
    this._updateToDos();
  }

  deleteToDo(itemId) {
    this.store.dispatch({
      type: 'DELETE_TODO',
      value: itemId
    });

    this._updateToDos();
  }

  toggleToDoDone(itemId) {
    this.store.dispatch({
      type: 'TOGGLE_TODO_DONE',
      value: itemId
    });

    this._updateToDos();
  }

  render() {
    return (
      <div className={'todo-list ' + (this.state.toDoItems.length === 0 ? 'empty' : '')}>
        <div className="todo-list-title">To Dos</div>
        <div className="empty-todo-info">Boo! No ToDo Items</div>
        <div className="todo-items">
          {
            this.state.toDoItems.map((toDoItem) => <ToDoItemView isDone={toDoItem.done} key={toDoItem.id} toDoId={toDoItem.id} toDoItem={toDoItem.text} toggleDone={this.toggleToDoDone} delete={this.deleteToDo}></ToDoItemView>)
          }
        </div>
        <ToDoInput addToDo={this.addToDo}></ToDoInput>
      </div>
    );
  }
}

