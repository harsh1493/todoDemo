import React,{ useContext,useState } from 'react'
import todoContext from "../context/Notes/TodoContext";
const TodoItem = (props) => {
    const { todo , updateTodo } = props;
    const context = useContext(todoContext);
    const { deleteTodo} = context;
    const handleDelete = async () => {
          await deleteTodo(todo._id);
    };


    
    return (
            <div className='p-1 row justify-items-center'>
              <div className={`col-md-6 float-left ${todo.completed? "line-through":""}`}>{todo.title}</div>
              <div className='col-md-2 flex space-x-2'>
                  <button className="btn btn-primary text-sm" onClick={()=>updateTodo(todo)}>Edit</button>
                  <button className="btn btn-danger text-sm" onClick={handleDelete}>Delete</button>       
              </div>
            </div>  
    )
}

export default TodoItem