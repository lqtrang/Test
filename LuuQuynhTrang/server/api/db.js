var mongoose = require('mongoose');

const URI = 'mongodb://lqtrang:su17091997@ds137508.mlab.com:37508/my_quizz_app'
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




