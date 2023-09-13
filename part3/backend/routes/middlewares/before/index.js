const express = require('express')
const router = express.Router()

router.use(require('cors')())
router.use(express.json())
router.use(express.static('build'))
router.use(require('./morgan'))

module.exports = router