const db = require('../connections/db')

const personSchema = new db.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (value) => {
        // First part are digits between 2-3 chars, followed by dash (-) then followed by digits one or more chars
        return /^(\d{2,3})-(\d+)$/.test(value)
      },
      message: props => `${props.value} is not a valid phone number. The format should be XXX-XXXXXXXX.`,
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

const Person = db.model('Person', personSchema)

module.exports = Person