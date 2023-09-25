const mongoose = require('mongoose')
require('dotenv').config()
const password = encodeURIComponent(process.argv[2])
const name = null || process.argv[3]
const number = null || process.argv[4]

const url = process.env.DB_STRING.replace('<password>', password)

mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length<4) {
  Contact.find({}).then(result => {
    console.log('phonebook:')
    result.forEach((contact,i) => {
      console.log(`${i+1}. ${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
  return
}

const contact = new Contact({
  name: name,
  number: number,
})

contact.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook`)
  console.log(result)
  mongoose.connection.close()
})