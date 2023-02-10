const router = require('express').Router()

const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes')
const userRoutes = require(`./usersRoutes`)

router.use(`/`, homeRoutes)
router.use(`/api`, apiRoutes)
router.use(`/user`, userRoutes)

module.exports = router;
 