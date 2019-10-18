var mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/nodedb'
const dbName = 'nodedb';

const con = mongoose.connect(URI, (error) => {
    if (error) {
        console.log("Error " + error);
    } else {
        console.log("Connected successfully to server")
    }
    // console.log(con);
});

mongoose.Promise = global.Promise

module.exports = con;




