const express = require('express');
const storage = require('node-persist');
const cors = require('cors');
const PORT = 3000;
const app = express();
const dailyTasks = require('./routes/dailyTasks');


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

// Get the Todo-Items from Local storage
app.use('/todo-items', dailyTasks)


app.put('/todo-items/:itemID', async ( req, res ) => {
    const { itemID } = req.params;
    
    await storage.init();
    let data = await storage.getItem('todo-item');
    const { todoTitle } = req.body;
    const { todoDesc } = req.body;
    const { dueDate} = req.body;

    const singleItem = data.find((item) => item.itemID === Number(itemID))

    if(singleItem) {
        singleItem.todoTitle = todoTitle; //updates to the new title
        singleItem.todoDesc = todoDesc;
        singleItem.dueDate = dueDate;

        await storage.setItem('todo-item', data);
        console.log('exist');
    } else {
        console.log('Record does not exist!');
    }

    
    res.json(singleItem);
    
});


app.listen(PORT, () => console.log('listening...'));


