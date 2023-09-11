const router = require('express').Router()

router.use(require('./middlewares'))
router.use('/api', require('./api'))
router.use('/info', require('./info'))

module.exports = router