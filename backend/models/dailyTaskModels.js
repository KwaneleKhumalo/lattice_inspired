const mongoose = require('mongoose');

// Setup document data structures
const dailySchema = new mongoose.Schema({
    todoTitle: {
        type: String, 
        required: [true, 'That is not a valid input. Try again'],
        trim: true,
        maxlength: [20, 'Title cannot be more than 20 characters'],
    },
    todoDesc: {
        type: String,
        required: [true, 'That is not a valid input. Please try again'],
        trim: true
    },
    dueDate: String
});

// Export and catch the dailySchema function in controllers for the routes. 

module.exports = mongoose.model('dailyTasks', dailySchema)