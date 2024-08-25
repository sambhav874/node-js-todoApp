const express = require("express");

const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const fs = require("fs");

let todos = [];

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render('home', { todos });
});

app.get('/create-todo' ,(req , res) => {
    res.render('create-todo');
})

app.post("/create-todo", (req, res) => {
    const newTodo = req.body.newTodo;
    if (newTodo) {
      todos.push(newTodo);
      
      const todoWithIndex = todos.map((todo , index) => ({index :index + 1  , todo}));
      const filePath = path.join(__dirname , 'todos.json');

      fs.writeFile(filePath ,JSON.stringify(todoWithIndex , null , 2),(err) => {
        if (err) {
            console.error(`Error writing to the file ${err}.`);
            res.status(500).send('Error updating todos');
        }
        res.redirect('/todos');
      })
    }
   
  });
  
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get('/todos', (req, res) => {
    res.render('todos', { todos });
});

const port = 3000;

const route = `localhost:${port}`;

app.listen(port, () => {
  console.log(`Server is running on ${route}`);
});
