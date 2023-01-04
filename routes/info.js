const router = require('express').Router()
const persons = require('../models/persons');

router.get('/', (req,res) => {
  const template = `
  Phoneboook has info for ${persons.count()} people <br>
  <br>
  ${Date()}
  `
  res.send(template)
})

module.exports = router