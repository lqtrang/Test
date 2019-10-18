// 'use trict'
// const util = require('util');
// var MongoClient = require('mongodb').MongoClient;
// // const db = require('./../db')

// // console.log(db);
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
// var dbo;
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   dbo = db.db("nodedb");
//   console.log("connected");
//   var hashtag = dbo.collection('tag');
//         // console.log("aaaa");
//         // hashtag.findOne({}, function (err,res) {
//         //     //nếu có lỗi
//         //     if (err) throw err;
//         //     //nếu thành công
//         //     console.log(res);
//         // });
//         console.log(hashtag);
//   module.exports = hashtag;
//   // db.close();  
// });
// // module.exports = function(app, db) { app.get(‘/notes’, (req, res) => { // hashtag res.send() });};

// module.exports = {    
//     get: (req, res) => {
//         // console.log("aaaa");
//         // var hashtag = db.collection('tag');
//         // console.log("aaaa");
//         hashtag.findOne({}, function (err,res) {
//             //nếu có lỗi
//             if (err) throw err;
//             //nếu thành công
//             console.log("aaaa");
//         });
//     },
// }

