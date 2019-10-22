const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../api/db');
var questionSchema = new Schema({
    title: {
        type: String, 
        required: true, 
        unique: true},
    answers:{
        type: Array
    },
    correct_ans:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('questions', questionSchema);