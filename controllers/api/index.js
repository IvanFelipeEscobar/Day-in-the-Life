const router = require('express').Router()
const commentRoutes = require(`./commentRoutes`)
const journalEntryRoutes = require(`./journalEntryRoutes`)
const userRoutes = require(`./userRoutes`)

router.use(`/comments`, commentRoutes)
router.use(`/entries`, journalEntryRoutes)
router.use(`/users`, userRoutes)

module.exports =  router