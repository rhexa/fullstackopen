const router = require('express').Router()
const morgan = require('morgan')

// create a new token for logging the request body as json
morgan.token('body', req => {
  return req.method === 'POST' ? JSON.stringify(req.body) : null
})

// template based on tiny with body added
const template = ':method :url :status :res[content-length] - :response-time ms :body'

router.use(morgan(template))

module.exports = router