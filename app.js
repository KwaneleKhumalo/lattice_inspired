const express = require('express');
const storage = require('node-persist');
const cors = require('cors');
const PORT = 3000;
const app = express();
let todoArray = [];

app.use(express.static('public'));
app.use(express.json());
app.use(express.static('src'))
app.use(express.urlencoded({extended: true}))
app.use(cors());

// Dashboard/Home Route
app.get('/', (req, res) => {
    res.send();
})

// Post a new todo-Item
app.post('/todo-item', async (req, res) => {
    let todoList = {};
    let randomID = Math.floor(Math.random() * 105631);

    todoList.itemID = randomID; //appends random id to a new field "itemID
    todoList.todoTitle = req.body.todoTitle;
    todoList.todoDesc = req.body.todoDesc;
    todoList.dueDate = req.body.dueDate;
    
    await storage.init();

    // form Validation
    if(req.body.todoTitle === '' || req.body.todoDesc === '' || req.body.dueDate === '') {

        console.log('empty string');
        res.redirect('/todo-items');
        return false

    } else {

        todoList = todoArray.push(todoList);
         // persist to local storage
        await storage.setItem('todo-item', todoArray );
        res.redirect('/todo-items');
    }
});


// Get the Todo-Items from Local storage
app.get('/todo-item', async(req, res) => {
    await storage.init();
    res.json(await storage.getItem('todo-item'))
});


// This route is for displaying todo-items in the API and spits out the daily-items. 
app.get('/todo-items', async(req, res) => {
    await storage.init();
    console.log(await storage.getItem('todo-item'));
    res.sendFile(__dirname + '/src/todo.html')
});

// This route has some issues. I am able to get ID, but can't update the body
app.put('/todo-item/:itemID', async ( req, res ) => {
    const { itemID } = req.params;
    

    await storage.init();
    let data = await storage.getItem('todo-item');
    const { todoTitle } = req.body;
    const { todoDesc } = req.body;
    console.log(todoTitle);

    const singleItem = data.find((item) => item.itemID === Number(itemID))

    if(singleItem) {
        singleItem.todoTitle = todoTitle; //updates to the new title
        await storage.setItem('todo-item', data)
        console.log('exist');
    } else {
        console.log('Record does not exist!');
    }

    
    res.json(singleItem);
    
});




// Goals Route
app.get('/Goal-Management', (req, res) => {
    res.sendFile(__dirname + '/src/goals.html')
});


app.listen(PORT, () => console.log('listening...'));

