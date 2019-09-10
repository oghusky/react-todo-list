import React from 'react';
import './AddTodo.css';

export default function AddTodoItem(props) {
    return (
        <div className="todo-form">
            <div className="input-group input-todo my-3">
                <input className="form-control todo-input" type="text" name="todotext" />
            </div>
            <div className="input-group input-todo my-3">
                <input className="form-control todo-id" type="text" style={{ opacity: 0, height: ".1rem" }} name="todo-id" />
            </div>
            <p className="text-center">
                <button className="btn btn-primary submit-btn mx-3" onClick={props.handleSubmit}>SUBMIT</button>
                <button className="btn btn-warning update-btn mx-3" onLoad={props.displayThis} onClick={props.handleUpdatedTodo}>UPDATE</button>
            </p>
        </div>
    )
}