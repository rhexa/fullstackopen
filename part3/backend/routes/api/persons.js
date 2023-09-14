const express = require('express')
const router = express.Router()
const persons = require('../../controllers/persons');

router.get('/', async (req, res) => {
  res.json(await persons.getAll())
})

router.get('/:id', async (req, res) => {
  res.json(await persons.get(req.params.id))
})

router.post('/', async (req, res, next) => {
  const person = req.body

  try {
    const result = await persons.add(person)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const result = await persons.update(req.params.id, req.body)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const person = await persons.del(req.params.id)
    if (person) {
      res.status(200).json(person)
    } else {
      res.status(404).json({ error: 'ID not found'})
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router