const router = require("express").Router()

router.use('/api/blogs', require('./blog'))

module.exports = router