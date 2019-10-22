var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HashtagSchema = new Schema({
    title:{
        type: String,
        require: true
    }
});
module.exports = mongoose.model('Hashtag', HashtagSchema);