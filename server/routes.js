const express = require('express')
const router = express.Router()
const knex = require('../knex');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const logins = require('./bcrypt')
const scripts = require('./scripts')

router.post('/users',  logins.store)
router.post('/user',  logins.compare)
router.get('/users', logins.compare)
router.get('/users/:id', scripts.userInfo)
router.get('/users/:id/experiences', scripts.experiences)
router.get('/users/:id/experiences/:id', scripts.experience)
router.get('/groups/:id', scripts.groupInfo)
router.patch('/users/:id', scripts.goal)
router.post('/experiences', scripts.newExperience)
router.patch('/experiences:id', scripts.editExperience)


module.exports = router;
