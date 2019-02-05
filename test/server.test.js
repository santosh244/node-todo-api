const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server/server');
const {Todo} = require('./../server/models/todo');


beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

describe('Testing post /todos',() => {

  it('should insert todo', (done) => {
    var msg = 'Testing here buddy';

    request(app)
      .post('/todos')
      .send({text: msg})
      .expect(200)
      .expect((res) => {
         expect(res.body.text).toBe(msg);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(msg);
          done();
        }).catch((e) => done(e));
      });
  });

 it('should not create todo with invalid data', (done) => {

   request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(0);
        done()
      }).catch((e) => done(e));
    });
  });
 });
