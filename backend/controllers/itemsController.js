const storage = require('node-persist');
let todoArray = [];


// Add Items
const newItem = (async (req, res) => {
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
        console.log('Anything');
        res.json('Data Saved')
    }
});

// Get all items. 
const getDailyItems = ( async (req, res) => {
    await storage.init();
    console.log(await storage.getItem('todo-item'));
    let todoItems = await storage.getItem('todo-item');
    res.json(todoItems);
});


module.exports = {
    newItem,
    getDailyItems,
}