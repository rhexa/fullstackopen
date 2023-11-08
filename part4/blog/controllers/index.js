const router = require("express").Router()

router.use('/api/blogs', require('./blog'))
router.use('/api/users', require('./user'))
router.use('/api/login', require('./login'))

module.exports = router