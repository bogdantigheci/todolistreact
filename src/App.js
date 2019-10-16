import React, { Component } from "react";
import Todo from "./components/Todo/Todo";
import TodoForm from "./components/TodoForm/TodoForm";
import { DB_CONFIG } from "./Config/config";
import firebase from "firebase/app";
import "firebase/database";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("todos");

    // We're going to setup the React state of our component
    this.state = {
      todos: []
    };
  }

  UNSAFE_componentWillMount() {
    const previousTodos = this.state.todos;

    // DataSnapshot
    this.database.on("child_added", snap => {
      previousTodos.push({
        id: snap.key,
        todoContent: snap.val().todoContent
      });

      this.setState({
        todos: previousTodos
      });
    });

    this.database.on("child_removed", snap => {
      for (var i = 0; i < previousTodos.length; i++) {
        if (previousTodos[i].id === snap.key) {
          previousTodos.splice(i, 1);
        }
      }

      this.setState({
        todos: previousTodos
      });
    });
  }

  addTodo(note) {
    this.database.push().set({ todoContent: note });
  }

  removeTodo(todoId) {
    console.log("from the parent: " + todoId);
    this.database.child(todoId).remove();
  }

  render() {
    return (
      <div className="container my-5">
        <h2 className="text-center my-4 todo-title">To do List</h2>
        <div className="list-group todos mx-auto text-light">
          {this.state.todos.map(note => {
            return (
              <Todo
                todoContent={note.todoContent}
                todoId={note.id}
                key={note.id}
                removeTodo={this.removeTodo}
              />
            );
          })}
        </div>
        <TodoForm addTodo={this.addTodo} />
      </div>
    );
  }
}

export default App;
