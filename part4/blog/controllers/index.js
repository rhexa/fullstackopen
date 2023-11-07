const router = require("express").Router()

router.use('/api/blogs', require('./blog'))
router.use('/api/users', require('./user'))

module.exports = router