const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bodyParser = require('body-parser')



module.exports = {
  store,
  compare
}
