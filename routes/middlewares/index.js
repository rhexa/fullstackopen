const express = require('express')
const router = express.Router()

router.use(require('cors')())
router.use(express.json())
router.use(require('./morgan'))

module.exports = router