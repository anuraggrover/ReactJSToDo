/**
 * Created by anurag on 14/06/16.
 */

import React from 'react';

export default class ToDoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoText: ''
    };

    this.updateState = this.updateState.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  addToDo() {
    this.props.addToDo(this.refs.toDoInput.value);

    this.setState({
      toDoText: ''
    });
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.addToDo();
    }
  }

  updateState(event) {
    this.setState({
      toDoText: event.target.value
    });
  }

  render() {
    return (
      <div className="todo-input">
        <input type="text" ref="toDoInput" value={this.state.toDoText} onChange={this.updateState} onKeyUp={this.onKeyUp}/>
        <button onClick={this.addToDo}>Add</button>
      </div>
    )
  }
}