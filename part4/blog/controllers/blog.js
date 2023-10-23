const router = require("express").Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

router.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json(result)
})

router.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = router