const express = require('express');
const bodyParser = require('body-parser');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = new express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
 var todo = new Todo({
   text: req.body.text
 });

 todo.save().then((doc) => {
   res.send(doc);
 }, (e) => {
   res.status(400).send(e);
 });
});


app.post('/user', (req, res) => {
 var user = new User({
   name: req.body.name
 });

 user.save().then((doc) => {
   res.send(doc);
 }, (e) => {
   res.status(400).send(e);
 });
});





app.post('/todos', (req, res) => {
 var todo = new Todo({
   text: req.body.text
 });

 todo.save().then((doc) => {
   res.send(doc);
 }, (e) => {
   res.status(400).send(e);
 });
});




app.listen(3000, () => {
  console.log('Started listening on port 3000')
})
