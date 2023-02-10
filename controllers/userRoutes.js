const router = require('express').Router()
const sequelize = require('../config/connection')
const { Entry, User, Comment } = require('../models')
//  /user routed
router.get(`/`, async (req, res) => {
    try {
        const userData = await Entry.findAll({
            where: {
                id: req.session.id
            },
            attributes: [`id`, `entry_title`, `entry_content`, `created_at`],
            include: [{
                model: Comment,
                attributes: [`id`, `comment_content`, `post_id`, `user_id`],
                include: {
                    model: User,
                    attributes: `name`
                }
            },
            {
                model: User,
                attributes: `name`
            }]
        })
        const userEntries = userData.map((entry)=> entry.get({plain:true}))
        res.render(`dashboard`, {userEntries, loggedIn: req.session.loggedIn})
    } catch (err) {
        res.status(500).json(err)       
    }
})
// /user/post/:id
router.get(`/post/:id`, async (req, res) => {
    try {
     const byIdData = Entry.findOne({
         where: {
             id: req.session.id
         },
         attributes: [`id`, `entry_title`, `entry_content`, `created_at`],
         include: [{
             model: Comment,
             attributes: [`id`, `comment_content`, `post_id`, `user_id`],
             include: {
                 model: User,
                 attributes: `name`
             }
         },
         {
             model: User,
             attributes: `name`
         }]
     })
     if(!byIdData){
         res.status(404).json({message: `no entries found`})
     }
     const singleEntry = byIdData.map((entry) => entry.get({plain:true}))
     res.render(`singlePost`, {singleEntry, loggedIn: req.session.loggedIn})
    } catch (err) {
     res.status(500).json(err)
    }
})

// user/create
router.get(`/create`, (req, res) => res.render(`new-entry`))
module.exports =  router