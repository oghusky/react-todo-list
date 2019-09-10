import React from 'react';
import './TodoItem.css';

export default function TodoItem(props) {
    return (
        <div className="row todo-item">
            {/* passing the entire todo object as a prop in the component gives access to the _id. otherwise it doesn't show */}
            <div className="col-sm-4">
                <input type="checkbox" checked={props.todo.isComplete} onChange={() => props.handleChange(props.todo._id)} />
            </div>
            <div className="col-sm-4">
                <span><strong>{props.todo.todotext}</strong></span>
                <small><p>{props.todo.created}</p></small>
                <small><p>{props.todo.details}</p></small>
            </div>
            <div className="col-sm-4">
                <span onClick={() => props.handleEdit(props.todo._id)}><i className="fas fa-edit"></i></span>
                <span onClick={() => props.handleDelete(props.todo._id)}><i className="fas fa-times"></i></span>
            </div>
            <hr />
        </div>
    )
}