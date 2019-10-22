const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Tag = require('./models/tag');
const Quiz = require('./models/quiz');
const Question = require('./models/question');
const User = require('./models/user');
const db = require('./api/db');
const bcrypt = require('bcrypt');
var cors = require('cors');


const app = express();

// var originsWhitelist = [
//   'http://localhost:1234'
// ];
// var corsOptions = {
//   origin: function(origin, callback){
//         var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
//         callback(null, isWhitelisted);
//   },
//   credentials:true
// }

//app.use(cors(corsOptions));


// //app.use(cors());
// some middlewares
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
module.exports = app;
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', (req, res) => {
    Quiz.find().then((quiz) => {
        res.send(quiz);
        console.log(quiz);
    }, (e) => {
      res.status(400).send(e);
    });
})
app.get('/tag', (req, res) => {
    Tag.find().then((tag) => {
        res.send(tag);
        console.log(tag);
    }, (e) => {
      res.status(400).send(e);
    });
});
app.get('/quiz', (req, res) => {
    Quiz.find().then((quiz) => {
        res.send(quiz);
        console.log(quiz);
    }, (e) => {
      res.status(400).send(e);
    });
});
app.get('/quiz/:_id', (req, res) => {
    Quiz.findById(req.params._id, function (err, quiz) {
        if (err) return next(err);
        res.send(quiz);
    })
  });
app.get('/user/:_id', (req, res) => {
    User.findById(req.params._id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
});
app.post('/register', (req, res) => {
    // bcrypt.hash(req.body.password, 10, function (err, hash){
    //     if (err) {
    //       return next(err);
    //     }
    //     req.body.password = hash;
    //     next();
    // })

    const password = bcrypt.hashSync(req.body.password, 10);

    var user = new User({
        // _id: req.body.ID,
        
        name: req.body.name,
        email: req.body.email,
        password: password,
        role: req.body.role
    });
    // result = User.addUser(user);
    user.save().then((user) => {
      res.send(user);
    }, (e) => {
      res.status(400).send(e);
    });
});
app.post('/makequiz', (req, res) => {
  var quiz = new Quiz({      
      title: req.body.title,
      like: req.body.like,
      tags: req.body.tag,
      questions: req.body.questions,
      num_of_ques: req.body.num,
      postby: req.body.postby
  });
  // result = User.addUser(user);
  quiz.save().then((quiz) => {
    res.send(quiz);
  }, (e) => {
    res.status(400).send(e);
  });
});

