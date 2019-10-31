const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../api/db');
var questionSchema = new Schema({
    
    title_ques: {
        type: String, 
        required: true, 
        unique: true},
    answer:{
        type: Array
    },
    key:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('questions', questionSchema);