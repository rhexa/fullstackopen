const router = require('express').Router()
const persons = require('./persons')

router.use('/persons', persons)

module.exports = router