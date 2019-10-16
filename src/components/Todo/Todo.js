import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../App.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.todoContent = props.todoContent;
    this.todoId = props.todoId;
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
  }

  handleRemoveTodo(id) {
    this.props.removeTodo(id);
  }

  render() {
    return (
      <div className="todo list-group-item d-flex justify-content-between align-items-center ">
        <p>{this.todoContent}</p>
        <span
          className="btn btn-danger btn-sm my-2"
          onClick={() => this.handleRemoveTodo(this.todoId)}
        >
          Delete
        </span>
      </div>
    );
  }
}

Todo.propTypes = {
  todoContent: PropTypes.string
};
export default Todo;
