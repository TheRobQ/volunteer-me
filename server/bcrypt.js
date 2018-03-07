const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')


const store = (req,res,sendit)=>{
  var salt = bcrypt.genSaltSync(4)
  var hash = bcrypt.hashSync(req.body.password, salt);
  knex('users').insert({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:hash,
    salt:salt,
    current_hours:req.body.current_hours,
    goal: req.body.goal,
    group_id: req.body.group_id,
  },'*')
  .then(user=>{
    console.log(user);
    res.status(204).send({id:user[0].id})
  })
}

const compare = (req,res,sendit)=>{
  knex('users').where({
  email: req.body.email
  }).first()
  .then(user=>{
    if(user ===  undefined){
      res.sendStatus(404)
    }
    console.log(user);
    bcrypt.compare(req.body.password, user.password, function(err, ver) {
        ver ? res.status(200).send({id:user.id}): res.sendStatus(401)
    })
  })
}
module.exports = {
  store,
  compare
}
