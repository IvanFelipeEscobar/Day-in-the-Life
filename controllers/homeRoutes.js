const router = require('express').Router()
const sequelize = require('../config/connection')

const { Entry, User, Comment } = require('../models')

router.get(`/`, async (req, res) => {
    try {        
        const entryData = await Entry.findAll({
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
        const entries = entryData.map((entry) => entry.get({ plain:true }))
        res.render(`home`, { entries, loggedIn: req.sessions.loggedIn})
    } catch (err) {res.status(500).json(err)}
})
router.get(`/signup`, (req, res)=> [
    req.sessions.loggedIn?
    res.redirect(`/`):
    res.render.apply(`/signup`)
])

router.get(`/login`, (req, res) => {
    req.sessions.loggedIn?
        res.redirect.apply(`/`):
        res.render(`login`)
})




module.exports =  router