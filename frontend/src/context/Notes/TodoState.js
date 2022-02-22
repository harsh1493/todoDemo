import { useState } from "react";
import TodoContext from "./TodoContext";
const TodoState = (props) => {
  const host = "http://localhost:3000";
  const todosInitial = []
  const [todos, setTodos] = useState(todosInitial);



  //Get all todos
  const getTodos = async () => {
    console.log("Fetching all todo");
    //API call
    const response = await fetch(`${host}/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json()
    console.log(json);
    setTodos(json)
  }

  //Add a todo
  const addTodo = async (title, description,completed) => {
    console.log("Adding a new Todo");
    //API call
    const response = await fetch(`${host}/todos/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description,completed})
    });

    const todo = await response.json()
    console.log(todo);
    setTodos(todos.concat(todo));
    console.log(todos);
  }

  //Delete a Todo
  const deleteTodo = async (id) => {
        const response = await fetch(`${host}/todos/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    const json = response.json();
    console.log(json); 
    const newtodos = todos.filter((todo) => { return todo._id !== id; });
    setTodos(newtodos);
  }

  //Edit a Todo
  const editTodo = async (id, title, description,completed) => {
    //API call
    const response = await fetch(`${host}/todos/update/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description,completed})
    });
    const json =await response.json();
    console.log("edit Todo called",json);

    //logic to edit on client side
    for (let index = 0; index < todos.length; index++) {
      const todo = todos[index];
      if (todo._id === id) {
        todo.title = title;
        todo.description = description;
        todo.completed=completed;
      }
      await getTodos();
    }
  }

  return (

    <TodoContext.Provider value={{ todos, setTodos, addTodo, deleteTodo, editTodo, getTodos }}>
      {props.children}
    </TodoContext.Provider>
  );
}

export default TodoState;
