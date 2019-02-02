const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
  if(err){
    return console.log('error while connecting to sever');
  }

  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');
  db.collection('Todos').find({_id : new ObjectID('5c453002132c283128e18bb4')}).toArray().then((docs) => {
    console.log('Todos');

    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log('Unable to fetch details', err)
  });

//  client.close();
});
