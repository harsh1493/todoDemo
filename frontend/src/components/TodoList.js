import React, {useRef, useContext, useEffect, useState } from 'react'
import todoContext from "../context/Notes/TodoContext";
import TodoItem from './TodoItem';
const TodoList = () => {
    const context = useContext(todoContext);
    const { todos, getTodos, editTodo } = context;
    const [todo, setTodo] = useState({ id: "", title: "", description: "" ,completed:false});

    useEffect(() => {
        getTodos();
    }, [todo]);

    const handleClick = (event) => {
        //prevents reload of page on submit
        event.preventDefault();
        console.log(todo);
        editTodo(todo._id, todo.title, todo.description,todo.completed);
    }
    const onChange = (event) => {
        //spread the existing todo and add/overwrite the respective target.name to respective target.value
        setTodo({ ...todo, [event.target.name]: event.target.value });
    }
    const onToggle = (event) => {
        setTodo({
            _id:todo._id,
            title:todo.title,
            description:todo.description,
            completed:!todo.completed
        })
    }

    const ref = useRef(null);
    const updateTodo = (currentTodo) => {
        ref.current.click();
        setTodo(currentTodo);                              
      }

    const setcompleted=(completed)=>{
        setTodo({
            title:todo.title,
            description:todo.description,
            completed:completed
        })
        editTodo(todo._id, todo.title, todo.description,completed);
    }

    return (
        <div>       
            <button  style={{display:"none"}}type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">  
            <div className="relative container  shadow p-3  bg-white rounded" >
                    <form action=" ">

                        <div className="mb-3">
                            <input type="text" value={todo.title} id="title" name='title' placeholder="Title" minLength={5} required onChange={onChange}  style={{ border: "none", outlineWidth: "0", width: "100%", fontWeight: "500" }} />
                        </div>
                        <div className="mb-3">
                            <input type="text" id="description" value={todo.description} name='description'  placeholder='Add a todo..'  onChange={onChange} style={{ border: "none", outlineWidth: "0", width: "100%" }} required/>
                        </div>
                        <label htmlFor="completed" className='pr-5 pb-4'>Completed</label>
                        <input type="checkbox" name="completed" checked={todo.completed} id="completed" onChange={onToggle} />
                        <div>
                            <button className='btn btn-primary' data-bs-dismiss="modal" onClick={handleClick}>update</button>
                        </div>
                    </form>
                </div>
      
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>
        
        
        
         <div className='container w-96 '>
            <h1 className='text-xl font-bold px-32' >TodoList</h1>
            <div class="bg-slate-100 p-10 px-2  flex-col space-y-2">
                {

                    todos.map((todo) => {
                        return <TodoItem key={todo._id} setcompleted={setcompleted} todo={todo}  getTodos={getTodos} updateTodo={updateTodo} />
                    })
                }
            </div>
        </div>
        </div>
    )
}

export default TodoList