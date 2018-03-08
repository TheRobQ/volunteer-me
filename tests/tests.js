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
    request(app).post('/users').set('Accept', 'application/json').send({
      firstName: 'Rob',
      lastName: 'Quan',
      email: 'rob.qun@gmail.com',
      password: 'dogs1234',
      goal: 12,
      group_id: 1,
    }).expect(204, {}, done)
  });
}))
