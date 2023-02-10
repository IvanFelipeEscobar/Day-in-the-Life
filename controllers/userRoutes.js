const router = require('express').Router()
const sequelize = require('../config/connection')
const { Entry, User, Comment } = require('../models')

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

router.get()

module.exports =  router