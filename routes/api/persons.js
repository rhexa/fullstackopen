const express = require('express')
const router = express.Router()
const persons = require('../../models/persons');

router.get('/', (req, res) => {
  res.json(persons.getAll())
})

router.get('/:id', (req, res) => {
  res.json(persons.get(req.params.id))
})

router.post('/', (req, res) => {
  const person = req.body
  if (!person.number || !person.name) {
    res.status(400).json({ error: 'fill all the required fields' })
  } else if (persons.isDuplicate(person)) {
    res.status(400).json({ error: 'name must be unique' })
  } else {
    res.status(201).json(persons.add(person))
  }
})

router.delete('/:id', (req, res) => {
  res.status(200).json(persons.del(req.params.id))
})

module.exports = router