var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');




var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

var router = express.Router();
router.get('/', (req, res, next)=>{
  res.render("aaa");
});
app.get('/api/v1/todos', (req, res) => {
	res.status(200).send({
		success: 'true',
		message: 'todos retrieved successfully',
		todos: {
			id: 1,
			title: "lunch",
			description: "Go for lunc by 2pm"
		}
	})
});

// app.use('/api/v1/users', users);

// module.exports = app;
// const routes = require('./routes/index');

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("nodedb");
//   console.log("1 document inserted");
//   db.close();
//   // dbo.createCollection("quiz", function(err, res) {
//   //   if (err) throw err;
//   //   console.log("Collection created!");
//   // });
//   // dbo.createCollection("question", function(err, res) {
//   //   if (err) throw err;
//   //   console.log("Collection created!");
//   // });
//   // dbo.createCollection("user", function(err, res) {
//   //   if (err) throw err;
//   //   console.log("Collection created!");
//   // });
//   // dbo.createCollection("answer", function(err, res) {
//   //   if (err) throw err;
//   //   console.log("Collection created!");
//   // });
//   // dbo.createCollection("quiz_user", function(err, res) {
//   //   if (err) throw err;
//   //   console.log("Collection created!");
//   // });
// //   var data = [
// //     { hashtag: "dongvat"},
// //     { hashtag: "toanhoc"},
// //     { hashtag: "kinhte"},
// // ];
// // dbo.collection("tag").insertMany(data, function(err, res) {
// //     if (err) throw err;
// //     console.log("1 document inserted");
// //     db.close();
// //   });
//   // var data_user = [
//   //   {name: "admin", email : "admin@gmail.com", password : "0123456"},
//   //   {name: "su", email : "lqtrang@gmail.com", password : "123456"},
//   //   {name: "Trang", email : "trang@gmail.com", password : "123456789"},
//   // ];
//   // dbo.collection("user").insertMany(data_user, function(err, res) {
//   //       if (err) throw err;
//   //       console.log(" document inserted");
//   //       db.close();
//   //     });
//   // var data_answer = [
//   //   {title: "Có một đuôi", key : 0},
//   //   {title: "Không có đuôi", key : 1},
//   //   {title: "Có hai đuôi", key : 0},
//   //   {title: "Có ba đuôi", key : 0},
//   //   {title: "màu xanh lá cây", key : 0},
//   //   {title: "màu vàng", key : 0},
//   //   {title: "màu đỏ", key : 1},
//   //   {title: "màu đen", key : 0},
//   // ]
//   // dbo.collection("answer").insertMany(data_answer, function(err, res) {
//   //   if (err) throw err;
//   //   console.log(" document inserted");
//   //   db.close();
//   // });
//   // var data_question = [
//   //   {title: "Giống chó Corgi có mấy đuôi?"},
//   //   {title: "Giấy quỳ tím sẽ chuyển sang màu gì khi gặp axit?"}
//   // ]
//   // dbo.collection("question").insertMany(data_question, function(err, res) {
//   //   if (err) throw err;
//   //   console.log(" document inserted");
//   //   db.close();
//   // });
//   // var data_quizz = [
//   //   {title: "Bạn hiểu về các loài chó bao nhiêu?", like: 0, postby: 1, hashtag: 1},
//   //   {title: "Các câu hỏi cơ bản về hóa học", like: 0, postby: 1, hashtag: 1}
//   // ];
//   // dbo.collection("quiz").insertMany(data_quizz, function(err, res) {
//   //   if (err) throw err;
//   //   console.log(" document inserted");
//   //   db.close();
//   // });
// });


