const mongoose = require('mongoose');
const connectionString = '';

const connectDb = (url) => { return mongoose.connect(url) }


module.exports = connectDb;
   

