import React, { Component } from "react";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: ""
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeTodo = this.writeTodo.bind(this);
  }

  handleUserInput(e) {
    this.setState({
      newTodo: e.target.value
    });
  }

  writeTodo() {
    this.props.addTodo(this.state.newTodo);

    this.setState({
      newTodo: ""
    });
  }

  render() {
    return (
      <div className="input-group">
        <input
          className="form-control"
          placeholder="Add a new to do..."
          value={this.state.newTodo}
          onChange={this.handleUserInput}
        />
        <button
          className="btn btn-outline-secondary unsub-btn"
          onClick={this.writeTodo}
        >
          Add To Do
        </button>
      </div>
    );
  }
}

export default TodoForm;
