import React from 'react';
import './CreateTodo.css'; // Ensure to import the CSS file

export function CreateTodo() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    return (
        <div className="todo-container">
            <input
                className="todo-input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br/><br/>
            <input
                className="todo-input"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br/><br/>
            <button
                className="todo-button"
                onClick={() => {
                    fetch("http://localhost:3000/todos", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            title: title,
                            description: description
                        })
                    })
                    .then(async (res) => {
                        const json = await res.json();
                        alert("Todo added");
                    })
                }}
            >
                Add todo to the database (Inspect and open the network tab)
            </button>
        </div>
    );
}
