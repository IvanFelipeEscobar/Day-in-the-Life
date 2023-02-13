const router = require('express').Router()
const { Entry, User, Comment } = require('../models')
const withAuth = require(`../utils/auth`)
//  /user routed
router.get(`/`, withAuth, async (req, res) => {
    try {
        const userData = await Entry.findAll({
            where: {
                id: req.session.id
            },
            attributes: [`id`, `entry_title`, `entry_content`, `created_at`],
            include: [{
                model: Comment,
                attributes: [`id`, `comment_content`, `entry_id`, `user_id`],
                include: {
                    model: User,
                    attributes: [`name`]
                }
            },
            {
                model: User,
                attributes: [`name`]
            }]
        })
        const userEntries = userData.map((entry)=> entry.get({plain:true}))
        res.render(`dashboard`, {userEntries, loggedIn: req.session.loggedIn})
    } catch (err) {
        res.status(500).json(err)       
    }
})
// /user/post/:id
router.get(`/post/:id`, withAuth, async (req, res) => {
    try {
     const byIdData = Entry.findOne({
         where: {
             id: req.session.id
         },
         attributes: [`id`, `entry_title`, `entry_content`, `created_at`],
         include: [{
             model: Comment,
             attributes: [`id`, `comment_content`, `entry_id`, `user_id`],
             include: {
                 model: User,
                 attributes: [`name`]
             }
         },
         {
             model: User,
             attributes: [`name`]
         }]
     })
     if(!byIdData){
         res.status(404).json({message: `no entries found`})
     }
     const singleEntry = byIdData.get({plain:true})
     res.render(`singlePost`, {singleEntry, loggedIn: req.session.loggedIn})
    } catch (err) {
     res.status(500).json(err)
    }
})

// user/create
router.get(`/create`, withAuth, (req, res) => res.render(`new-entry`))
module.exports =  router