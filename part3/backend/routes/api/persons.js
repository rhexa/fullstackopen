const express = require('express')
const router = express.Router()
const { Error:{ValidationError} } = require('mongoose')
const persons = require('../../controllers/persons');

router.get('/', async (req, res) => {
  res.json(await persons.getAll())
})

router.get('/:id', async (req, res) => {
  res.json(await persons.get(req.params.id))
})

router.post('/', async (req, res) => {
  const person = req.body

  try {
    const result = await persons.add(person)
    res.status(201).json(result)
  } catch (error) {
    if (error instanceof ValidationError) {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      res.status(400).json({ validationErrors })
    } else if (error.code === 11000) {
      res.status(400).json({ error: "Duplicate key error. Person's name already exists" })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const person = await persons.del(req.params.id)
    if (person) {
      res.status(200).json(person)
    } else {
      res.status(404).json({ error: 'ID not found'})
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router