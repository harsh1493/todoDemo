import React, { useContext, useEffect, useRef, useState } from 'react'
import todoContext from "../context/Notes/TodoContext";
const AddTodo = () => {

    const context = useContext(todoContext);
    const { addTodo } = context;
    const [todo, setTodo] = useState({ title: "", description: "", completed: false });
    const handleClick = (event) => {
        //prevents reload of page on submit
        event.preventDefault();
        if (todo.title.length > 5 && todo.description.length > 0) {
            addTodo(todo.title, todo.description, todo.completed);
            setTodo({ title: "", description: "", completed: false });
        } else {
            alert("title must be atleast 6 characters");
        }
        // 
    }
    const onChange = (event) => {
        //spread the existing todo and add/overwrite the respective target.name to respective target.value
        setTodo({ ...todo, [event.target.name]: event.target.value });
    }

    return (
        <div className='container'>

            <div className='flex justify-center mt-32 mb-5 '>
                <form action="" className='bg-neutral-200 p-3'>
                    <h1 className='text-lg pb-3 font-bold px-20'>Add Todo</h1>
                    <div className="mb-3">
                        <input className='form form-control' type="text" value={todo.title} id="title" name='title' placeholder="Title" minLength={5} required onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <input className='form form-control' type="text" value={todo.description} id="description" name='description' placeholder="description" minLength={5} required onChange={onChange} />
                    </div>
                    {/* <input type="text" className='form-control w-64' value={todo.title} onChange={onchange} /> */}
                    <button className='btn btn-success text-sm p-1 ' onClick={handleClick} >Add item</button>
                </form>

            </div>
        </div>
    )
}

export default AddTodo