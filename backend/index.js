const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 3000;
let Todo = require('./Models/Todo');

const app = express();

app.use(cors());
app.use(bodyParser.json());


// mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true });
const mongoURI=  "mongodb+srv://admin-harsh:9977407734@cluster0.zwwxb.mongodb.net/Todo?retryWrites=true&w=majority";
 mongoose.connect(mongoURI, { useNewUrlParser: true });

const connection = mongoose.connection;

// Once the connection is established, callback
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//get all tasks
todoRoutes.route('/').get( (req,res) => {
    Todo.find((err, todos) => {
        if(err)
            console.log(err);
        else {
            res.json(todos);
        }
    });
});

//get task by id
todoRoutes.route('/:id').get((req,res) => {
    const id = req.params.id;
    Todo.findById(id, (err,todo) => {
        res.json(todo);
    });
});

//add new task
todoRoutes.post('/add',async (req, res) => {
    try {
  
      const { title, description,completed } = req.body;
  
      const todo = new Todo({
        title,
        description,
        completed
      });
      const savedTodo = await todo.save();
      res.json(savedTodo);
  
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server error');
    }
  });

//update an existing task
todoRoutes.route('/update/:id').post((req,res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(!todo)
            res.status(404).send('Data is not found');
        else {
            todo.title = req.body.title;
            todo.description = req.body.description;
            todo.completed=req.body.completed;
            todo.save().then( todo => {
                res.json('Todo updated');
            })
            .catch( err => {
                res.status(400).send("Update not possiblse",err);
            });
        }
    });
});

//delete a task
todoRoutes.delete('/delete/:id',async (req,res) => {
    let todo = await Todo.findById(req.params.id);

    //if todo with given id don't exists
    if (!todo) {
      return res.status(404).send("todo not found");
    }
  
    //if todo exists 
    todo = await Todo.findByIdAndDelete(req.params.id);
    res.send("deleted");
});

app.use('/todos', todoRoutes);

app.listen( PORT, () => {
    console.log("Server is running on port " + PORT);
});
