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

        // Does this need to go to dashboard instead?
        // add a conditional statement about the session or if user is logged in depends if it goes to the landing page or the dashboard view?
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
    req.session.loggedIn?
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
    if(!byIdData){
        res.status(404).json({message: `no entries found`})
    }
    const singleEntry = byIdData.map((entry) => entry.get({plain:true}))
    res.render(`singlePost`, {singleEntry, loggedIn: req.session.loggedIn})
   } catch (err) {
    res.status(500).json(err)
   }

})




module.exports =  router