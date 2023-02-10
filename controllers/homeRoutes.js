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
        res.render(`home`, { entries, loggedIn: req.session.loggedIn})
    } catch (err) {res.status(500).json(err)}
})
router.get(`/signup`, (req, res)=> [
    req.session.loggedIn?
    res.redirect(`/`):
    res.render.apply(`/signup`)
])

router.get(`/login`, (req, res) => {
    req.sessio.loggedIn?
        res.redirect.apply(`/`):
        res.render(`login`)
})

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
    const singleEntry = byIdData.map((entry) => entry.get({plain:true}))
    res.render(`singlePost`, {singleEntry, loggedIn: req.session.loggedIn})
   } catch (err) {
    res.status(500).json(err)
   }

})




module.exports =  router