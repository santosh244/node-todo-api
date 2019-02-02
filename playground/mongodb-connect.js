const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
  if(err){
    return console.log('error while connecting to sever');
  }

  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');
  db.collection('Users').insertOne({
    'name': 'Santosh',
    'age': 26,
    'Location': 'Kakinada'
  }, (err, result) => {
    if(err){
      return console.log('unable to insert todo', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops[0]._id.getTimestamp());
  });

  client.close();
});
