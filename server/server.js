require('./config/config')
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb')
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = new express();
const port = process.env.PORT;

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

module.exports ={app}


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});



app.get('/todos/:id', (req, res) => {

 const _id = req.params.id;
console.log(_id);
 if(!ObjectID.isValid(_id)) {
    return res.status(404).send();
 }

 Todo.findById(_id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
 }).catch((e) => res.status(400).send(e));
});


app.delete('/todos/:id', (req,res) => {
  const _id = req.params.id;
 if( !ObjectID.isValid(_id)) {
    return res.status(404).send();
 }

 Todo.findByIdAndRemove(_id).then((todo) => {
   if(!todo) {
     return res.status(404).send();
   }
   res.send({todo})
 }).catch((e) => res.status(400).send())

});


app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
     res.send({todo});
  }).catch((e) => {
    return res.status(400).send();
  })

});





app.listen(port, () => {
  console.log(`Started listening on port ${port}`)
})
