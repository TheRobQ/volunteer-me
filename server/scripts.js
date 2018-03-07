const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bodyParser = require('body-parser')

const userInfo = (req, res, next) => {
  return 'testing'
}
const experiences = (req, res, next) => {
  return 'testing'
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
  return 'testing'
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
