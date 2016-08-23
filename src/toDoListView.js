/**
 * Created by anurag on 09/06/16.
 */

import React from 'react';
import ToDoItemView from './toDoItemView';
import ToDoInput from './toDoInput';

export default class ToDoListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoItems: this.getToDos()
    };

    this.addToDo = this.addToDo.bind(this);
    this.toggleToDoDone = this.toggleToDoDone.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);

    const toDoId = localStorage.getItem('toDoId');
    this.toDoId = toDoId ? parseInt(toDoId, 10) : 0;
    localStorage.setItem('toDoId', this.toDoId);
  }

  getToDos() {
    let toDoItems;

    try {
      toDoItems = JSON.parse(localStorage.getItem('toDoItems'));
    } catch(e) {
      toDoItems = [];
    }

    return toDoItems;
  }

  addToDo(toDoItemText) {
    const toDoItems = this.getToDos();

    toDoItems.push({
      id: 'item-' + ++this.toDoId,
      text: toDoItemText,
      done: false
    });

    localStorage.setItem('toDoId', this.toDoId);

    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));

    this.setState({
      toDoItems: toDoItems
    });
  }

  deleteToDo(itemId) {
    const toDoItems = this.getToDos();
    const toDoItemIndex = toDoItems.findIndex((item) => {return item.id === itemId});

    if (toDoItemIndex !== -1) {
      toDoItems.splice(toDoItemIndex, 1);
    }

    this.setState({
      toDoItems: toDoItems
    });

    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
  }

  toggleToDoDone(itemId) {
    const toDoItems = this.getToDos();
    const toDoItem = toDoItems.find((item) => {return item.id === itemId});

    toDoItem.done = !toDoItem.done;

    this.setState({
      toDoItems: toDoItems
    });

    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
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

