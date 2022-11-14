const express = require('express');
const storage = require('node-persist');
const cors = require('cors')
const PORT = 3000;
const app = express();
let todoArray = [];

app.use(express.static('public'));
app.use(express.static('src'))
app.use(express.urlencoded({extended: true}))
app.use(cors());

// Dashboard Route
app.get('/', (req, res) => {
    res.send();
})

// Post a new todo-Item
app.post('/todo-item', async (req, res) => {
    let todoList = '';

    // form Validation
    if(req.body.todoTitle === '' || req.body.todoDesc === '' || req.body.dueDate === '') {

        console.log('empty string');
        res.redirect('/todo-items');
        return false

    } else {

        todoList = todoArray.push(req.body)
    }

    // persist to local storage
    await storage.init();
    await storage.setItem('todo-item', todoArray );
    res.json(todoArray)
    
});


// Get the Todo-Items from Local storage
app.get('/todo-item', async(req, res) => {
    await storage.init();
    res.json(await storage.getItem('todo-item'))
});


// This route is for displaying todo-items in the front-end. 
app.get('/todo-items', async(req, res) => {
    await storage.init();
    console.log(await storage.getItem('todo-item'));
    res.sendFile(__dirname + '/src/todo.html')
});


// Goals Route
app.get('/goals', (req, res) => {
    res.sendFile(__dirname + '/src/goals.html')
});


app.listen(PORT, () => console.log('listening...'));

