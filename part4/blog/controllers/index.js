const router = require("express").Router()
const {userExtractor} = require('../utils/middleware')

router.use('/api/blogs', userExtractor, require('./blog'))
// router.use('/api/blogs', require('./blog'))
router.use('/api/users', require('./user'))
router.use('/api/login', require('./login'))

module.exports = router