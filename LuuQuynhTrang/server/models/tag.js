const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../api/db');

var hashtagSchema = new Schema({
    hashtag: {
        type: String, 
        required: true, 
        unique: true},
    title:{
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('tags', hashtagSchema);
