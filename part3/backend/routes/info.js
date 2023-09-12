const router = require('express').Router()
const persons = require('../models/persons');

router.get('/', async (req,res) => {
  const template = `
  Phoneboook has info for ${await persons.count()} people <br>
  <br>
  ${Date()}
  `
  res.send(template)
})

router.get('/db', (req, res) => {
  const db = require('../connections/db')
  console.log(db.connections)
})

router.get('/db/state', (req, res) => {
  const db = require('../connections/db')
  const map = {
    '0': 'disconnected',
    '1': 'connected',
    '2': 'connecting',
    '3': 'disconnecting'
  }
  console.log(db.connections.forEach((conn, i) => console.log(`Connection ${i+1}. State:`, map[conn.readyState])))
})

module.exports = router