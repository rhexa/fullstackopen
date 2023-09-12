const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DB_STRING

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4, serverSelectionTimeoutMS: 5000, maxPoolSize: 10 })
  .then((result) => {
    console.log("Connected")
  }).catch((err) => {
    console.log(err)
  })

module.exports = mongoose