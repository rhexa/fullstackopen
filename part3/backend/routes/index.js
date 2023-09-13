const router = require('express').Router()
const internalServerError = require('./middlewares/after/errorHandler/internalServer')
const {duplicateError, validationError} = require('./middlewares/after/errorHandler/validation')

router.use(require('./middlewares/before'))
router.use('/api', require('./api'))
router.use('/info', require('./info'))

// After middleware
router.use(duplicateError)
router.use(validationError)
router.use(internalServerError)

module.exports = router