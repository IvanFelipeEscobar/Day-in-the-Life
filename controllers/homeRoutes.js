const router = require('express').Router()
const sequelize = require('../config/connection')

router.get(`/`, (req, res) => res.render(`home`))

router.get(`/:id`)

router.get(`/signup`, (req, res)=> res.render(`signup`))

router.get(`/login`)

router.get(`logout`)


module.exports =  router