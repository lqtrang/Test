const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../api/db');

var userSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        unique: true},
    email: {
        type: String, 
        required: true, 
        unique: true},
    
    password:{
        type: String, 
        required: true
    },
    role:{
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('users', userSchema);

