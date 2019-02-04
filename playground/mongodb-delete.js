const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
  if(err){
    return console.log('error while connecting to sever');
  }

  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');
  db.collection('Todos').deleteMany({'text': 'Watch movie'}).then((result) => {
    console.log(result);
  });
//  client.close();
});
