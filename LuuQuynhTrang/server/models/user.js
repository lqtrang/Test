const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../api/db');

var userSchema = new Schema({
    name: {
        type: String, 
        required: true 
        },
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
        default: 600
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('users', userSchema);

