const router = require('express').Router()

const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes')
const dashboard = require(`./dashboardRoutes`)
const accountRoutes = require(`./accountRoutes`)

router.use('/', homeRoutes)
router.use('/api', apiRoutes)
router.use(`/dashboard`, dashboard)
router.use(`/account`, accountRoutes)

module.exports = router;
 