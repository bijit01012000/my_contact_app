//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');

//acquire the connection if it is successful or not
const db = mongoose.connection;
//error handling
db.on('error', console.error.bind(console, 'connection error:'));

//when db successfully opens show the message
db.once('open', function() {
  console.log('successfully connected to mongoDB');
}); 