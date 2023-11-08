const router = require("express").Router()
const Blog = require('../models/blog')
const User = require("../models/user")
const {getToken,decodeToken} = require('../utils/token_helper')
const {authenticateToken} = require('../utils/middleware')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

router.post('/', authenticateToken, async (request, response) => {
  const {title, author, url, likes} = request.body
  const decodedToken = decodeToken(getToken(request))
  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
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