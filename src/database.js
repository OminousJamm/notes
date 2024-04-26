const mongoose = require('mongoose');

const {SERVER_DB, PASSWORD_DB, NAME_DB} =  process.env;
const MONGO_DB_URI = `mongodb+srv://${SERVER_DB}:${PASSWORD_DB}@cluster0.zbavwrj.mongodb.net/${NAME_DB}?retryWrites=true&w=majority`; 

mongoose.connect(MONGO_DB_URI)
.then(db => console.log('Database is conected.'))
.catch(err => console.log(err));