const assert = require('assert')
const request = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app.js')
const addDatabaseHooks = require('./utils')
const {suite, test} = require('mocha')
const routes = require('../server/routes.js')

suite('user test', addDatabaseHooks(() => {
  test('POST /users',
  function(done) {
    request(app).post('/users').set('Accept', 'application/json').send(
{  firstName: "Irma",
  lastName: "Patterson",
  email: 'irma2@gmail.com',
  password: 'dogs123',
  goal:16,
  group_id: 5})
  .expect(204, {}, done)
  });
}))
