const express = require('express')
const router = express.Router()
const knex = require('../knex');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const logins = require('./bcrypt')
//const bcrypt = require('bcrypt');

router.post('/users',  logins.store)
router.get('/users/:id')
router.


module.exports = router;
