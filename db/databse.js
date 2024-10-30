require('dotenv').config();
const mongoose = require('mongoose');

const URI=process.env.MONGODB;

const ConnectDb=()=>{
    mongoose.connect(URI).then(()=>console.log('Connected to MongoDB'));
}

module.exports=ConnectDb;