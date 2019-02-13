
const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');


const _id = '5c61aa5edf96ef46c0194e351'
if(!ObjectID.isValid(_id)) {
  console.log('Id is not valid');
}

Todo.find({_id}).then((todos) => {
  console.log('Todos :' + todos );
});

Todo.findOne({_id}).then((todos) => {
  console.log('Todos find one :' + todos );
});

Todo.findById(_id).then((todos) => {
  if(todos) {
    return console.log('Id not found');
  }
  console.log('Todos find By ID :' + todos );
}).catch((e) => console.log(e));
