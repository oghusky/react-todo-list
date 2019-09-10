import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // shows data onload
  componentDidMount() {
    this.fetchTodos();
    this.displayThis();
  }
  componentDidUpdate() {
    this.fetchTodos();
  }

  // handles checkbox click
  handleChange(id) {
    this.setState(prevState => {
      const updatedComplete = prevState.data.map(todo => {
        if (todo._id === id) {
          axios.put(`https://blooming-temple-11362.herokuapp.com/api/${id}`, { isComplete: !todo.isComplete, todotext: todo.todotext })
            .then(response => response.data);
        }
        this.fetchTodos();
        return todo;
      })
      return {
        updatedComplete
      }
    })
  }
  handleEdit(id) {
    this.setState(prevState => {
      const updatedText = prevState.data.map(todo => {
        if (todo._id === id) {
          this.editTodoText(todo.todotext, todo._id);
        }
        this.fetchTodos();
        return todo;
      })
      return {
        updatedText
      }
    })
  }
  handleDelete(id) {
    this.setState(prevState => {
      const deleteTodo = prevState.data.filter(todo => {
        if (todo._id === id) {
          axios.delete(`https://blooming-temple-11362.herokuapp.com/api/${id}`)
        }
        this.fetchTodos();
        return !todo
      }); S
      return {
        deleteTodo
      }
    })
  }
  handleSubmit = (e) => {
    let todoValues = e.target.parentElement.parentElement.firstChild.childNodes[0].value;
    this.setState(prevState => {
      if (todoValues !== "") {
        axios.post("https://blooming-temple-11362.herokuapp.com/api", { todotext: todoValues })
          .then(response => response.data);
      }
    });
  }
  handleUpdatedTodo = (e) => {
    let todoId = e.target.parentElement.previousSibling.childNodes[0].value;
    let todoValue = e.target.parentElement.parentElement.firstChild.childNodes[0].value;
    this.setState(prevState => {
      const newTodoText = prevState.data.map(todo => {
        if (todo._id === todoId) {
          axios.put(`https://blooming-temple-11362.herokuapp.com/api/${todoId}`, { isComplete: todo.isComplete, todotext: todoValue })
            .then(response => response.data);
        }
        return todo;
      })
      this.reshowSubmit();
      return {
        newTodoText
      }
    })

  }
  displayThis() {
    let updateButton = document.querySelector(".update-btn");
    updateButton.style.display = "none";
  }
  // grabs all todos
  fetchTodos = () => {
    fetch("https://blooming-temple-11362.herokuapp.com/api")
      .then(data => data.json())
      .then(response => { this.setState({ data: response }) });
  }
  editTodoText = (text, id) => {
    let newValue = document.querySelector(".todo-input");
    let submitButton = document.querySelector(".submit-btn");
    let grabId = document.querySelector(".todo-id");
    newValue.value = text;
    grabId.value = id;
    submitButton.style.display = "none";
    let updateButton = document.querySelector(".update-btn");
    updateButton.setAttribute("onclick", this.handleUpdatedTodo);
    updateButton.style.display = "inline";
    console.log(newValue.value);
    console.log(grabId.value);
  }
  reshowSubmit = () => {
    let submitButton = document.querySelector(".submit-btn");
    submitButton.style.display = "inline";
    this.displayThis();
  }
  render() {
    // maps through state and grabs todos
    const todoItems = this.state.data.reverse().map((todo) => <TodoItem
      key={todo._id}
      todo={todo}
      handleChange={this.handleChange}
      handleEdit={this.handleEdit}
      handleDelete={this.handleDelete} />)
    return (
      <div className="container">
        <h1 className="text-center mt-3">Full Stack React CRUD APP</h1>
        <AddTodo
          handleSubmit={this.handleSubmit}
          displayThis={this.displayThis}
          handleUpdatedTodo={this.handleUpdatedTodo}
        />
        <h3 className="text-center">Todo List</h3>
        {todoItems}
      </div>
    );
  }
}

export default App;
