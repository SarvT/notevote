const mongoose = require('mongoose');
const dbURI = "mongodb://localhost:27017";

const connectDB= ()=> {
    try {
        console.log("connected!");
        mongoose.connect(dbURI);
    } catch (error) {
        console.log(`Error connecting to ${dbURI}:`, error);
    }
}
module.exports = connectDB  // export the function for use in other files
    // as well
    // as making it available through index file which exports this module and can be used by importing from there
    // as import it into this file using `require('./config/database')` statement at top of each js
    // module that needs access to database connection and functionality provided by Mongoose ORM
