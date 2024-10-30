const mongoose = require('mongoose');

const AdminSechema = mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Admin', AdminSechema);
