/**
 * Created by anurag on 09/06/16.
 */

import React from 'react';

export default class ToDoItemView extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDone = this.toggleDone.bind(this);
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.delete(this.props.toDoId);
  }

  toggleDone() {
    this.props.toggleDone(this.props.toDoId);
  }

  render() {
    return(
      <div className={'todo-item ' + (this.props.isDone ? 'done' : '')}>
        <span className="todo-text">{this.props.toDoItem}</span>
        <span className="todo-remove action" onClick={this.delete}>&times;</span>
        <span className={'todo-done action ' + (this.props.isDone ? 'hide' : '')} onClick={this.toggleDone}>&#10004;</span>
        <span className={'todo-done action ' + (this.props.isDone ? '' : 'hide')} onClick={this.toggleDone}>&#8224;</span>
        </div>
    )
  }
}