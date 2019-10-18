const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Tag = require('./models/tag');
const Quiz = require('./models/quiz');
const Question = require('./models/question');
const User = require('./models/user');
const db = require('./api/db');


const app = express();
module.exports = app;
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', (req, res) => {
    res.send(`Listening on ${ PORT }`);
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
    var user = new User({
        // _id: req.body.ID,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    // result = User.addUser(user);
    user.save().then((user) => {
      res.send(user);
    }, (e) => {
      res.status(400).send(e);
    });
});
