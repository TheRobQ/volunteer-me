const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bodyParser = require('body-parser')

const userInfo = (req, res, next) => {
  knex('users').select('*').where({id: req.params.id})
  .then(data => {
    res.status(200).send(data)
  })
}
const experiences = (req, res, next) => {
  knex('experiences').select('*').where({user_id: req.params.id}).then(
    data =>{
      res.status(200).send(data)
    })
}

const experience = (req, res, next) => {
  return 'testing'
}

const goal = (req, res, next) => {
  return 'testing'
}

const newExperience = (req, res, next) =>{
  return 'testing'
}

const editExperience = (req, res, next) => {
  return 'testing'
}

const groupInfo =(req, res, next) => {
  console.log(req.params);
  knex('groups').where({id: req.params.id}).select("*")
  .then(data => res.status(200).send(data))
}


module.exports = {
  experiences,
  experience,
  userInfo,
  goal,
  newExperience,
  editExperience,
  groupInfo
}
