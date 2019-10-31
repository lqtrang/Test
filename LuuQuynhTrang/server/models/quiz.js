const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../api/db');

var quizSchema = new Schema({
    title: {
        type: String, 
        required: true, 
        unique: true},
    tags:{
        type: Array,
    },
    questions:{
        type: Array
    },
    num_of_ques:{
        type: Number,
    },
    postby:{
        type: Object,
    }
})
module.exports = mongoose.model('quizs', quizSchema);
