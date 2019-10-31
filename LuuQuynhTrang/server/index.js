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
// var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'secret'

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
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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
    var userData = new User({        
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    User.findOne({
      email: req.body.email
    }).then(user=>{
      if(!user){
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
          userData.password = hash
          userData.save().then((user) => {
            res.send(user);
          }, (e) => {
            res.status(400).send(e);
          });
        })      
        
      }else{
        res.json({error:'User already exists'})
      }
    }).catch(err=>{
      res.send('error: '+err)
    })
    
});
app.post('/login', (req,res)=>{
  User.findOne({
    email:req.body.email
  }).then(user=>{
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({token:token})
      }else{
        // res.send(false)
      }
    }else{
      // res.send(false)
    }
  }).catch(err=>{
    res.send('error: '+err);
  })
});
app.get('/profile', (req,res)=>{
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
  User.findOne({
    _id: decoded._id
  }).then(user=>{
    if(user){
      res.json(user)
    }else{
      res.send("User does not exists")
    }
  }).catch(err=>{
    res.send('error: '+err)
  })
})
// app.get('/search/:title',(req,res)=>{
//   var name = (req.params.title)
//   console.log(/'name'/);
//   Quiz.find({
//     title: //
//   }).then((quiz)=>{
//     res.send(quiz)
//   }, (e)=>{
//     res.status(400).send(e);
//   });
// })
app.get('/quizbyid/:_id',(req,res)=>{
  console.log(req.params._id);
  Quiz.find({
    tags: req.params._id
  }).then((quiz) => {
    res.send(quiz);
    console.log(req.params._id);
  }, (e) => {
    res.status(400).send(e);
  });
})
app.get('/quizbyuser/:_id',(req,res)=>{
  console.log(req.params._id);
  Quiz.find({
    postby: req.params._id
  }).then((quiz) => {
    res.send(quiz);
    console.log(req.params._id);
  }, (e) => {
    res.status(400).send(e);
  });
})
app.post('/makequiz', (req, res) => {
  var quiz = new Quiz({      
      title: req.body.title,
      tags: req.body.tags,
      questions: req.body.questions,
      num_of_ques: req.body.num_of_ques,
      postby: req.body.postby
  });
  // result = User.addUser(user);
  quiz.save().then((quiz) => {
    res.send(quiz);
  }, (e) => {
    res.status(400).send(e);
  });
});

