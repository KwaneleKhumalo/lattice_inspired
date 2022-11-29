const express = require('express');
const storage = require('node-persist');
const cors = require('cors');
const PORT = 3000;
const app = express();
const dailyTasks = require('./routes/dailyTasks');
const connectDb = require('./db/Connection');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

// Get the Todo-Items from Local storage
app.use('/todo-items', dailyTasks);
app.use('/todo-items/:id', dailyTasks);

// Database connection function
const startDB = async () => { 
    try {
        await connectDb(process.env.MONGO_CONNECT);
        app.listen(PORT, () => console.log('Connected to the Database. App listening...'));

    } catch (error) {
       console.log(err); 
    }
 };

 startDB();




