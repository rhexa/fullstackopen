const { Error:{ ValidationError } } = require('mongoose')

const validationError = (error,req,res,next) => {
  if (error instanceof ValidationError) {
    const validationErrors = {}
    for (const field in error.errors) {
      validationErrors[field] = error.errors[field].message
    }
    res.status(400).json({ validationErrors })
  } else {
    next(error)
  }
}

const duplicateError = (error,req,res,next) => {
  if (error.code === 11000) {
    res.status(400).json({ error: 'Duplicate key error. Person\'s name already exists' })
  } else {
    next(error)
  }
}

module.exports = {
  validationError,
  duplicateError
}