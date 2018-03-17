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
  return knex('users')
  .where({id: req.params.id})
  .update({goal: req.body.goal})
  .returning('goal')
  .then(data => {
    console.log(data);
    res.sendStatus(200)
  })
}

const upDateGroupGoal = (req, res, next) =>{
  return knex('groups')
  .where({id: req.params.id})
  .increment('current_hours', req.body.towardGoal)
  .then(data =>{
    console.log(data);
    res.sendStatus(200)
  })
}

const newExperience = (req, res, next) => {
    return knex('orgs')
    .where({name: req.body.org})
    .returning('id')
    .then( response => {
      return knex('experiences').insert({
      title: req.body.title,
      user_id: req.body.user_id,
      description: req.body.description,
      org_id: response[0].id,
      role: req.body.role,
      hours: parseInt(req.body.hours),
      minutes: parseInt(req.body.minutes),
      date: req.body.date})
      .returning(['title', 'description', 'org_id', 'role', 'date',])
      .then(data =>{
          res.status(200).send(data)
        })
    })
    .then(data => {
      return knex('users')
      .where({id: req.body.user_id})
      .increment('towardGoal', parseInt(req.body.towardGoal))
      .then((data) => {
          console.log(data)
      })
    })
}

const editExperience = (req, res, next) => {
  return 'testing'
}

const groupInfo =(req, res, next) => {
  console.log(req.params);
  knex('groups').where({id: req.params.id}).select("*")
  .then(data => res.status(200).send(data))
}

const orgInfo = (req, res, next) => {
  knex('orgs').where({id: req.params.id}).select('*')
  .then(data => res.status(200).send(data))
}

module.exports = {
  experiences,
  experience,
  userInfo,
  goal,
  newExperience,
  editExperience,
  groupInfo,
  orgInfo,
  upDateGroupGoal
}
