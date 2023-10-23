const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper');
const _ = require('lodash')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of helper.initialBlogs) {
    await new Blog(blog).save();
  }
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs has property named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    
    for (const blog of blogs) {
      expect(blog).toHaveProperty('id')
    }
  })

  test('blogs has property named likes', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    
    for (const blog of blogs) {
      expect(blog).toHaveProperty('likes')
    }
  })
})

describe('addition of a new note', () => {
  const newBlog = {
    "title": "Frozen Operations e-services actuating",
    "author": "Lakin, Oberbrunner and Harvey",
    "url": "https://cayla.com",
    "likes": 452
  }
  
  test('should succeed with valid data', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const blog = _.find(blogs, newBlog)

    expect(blogs).toHaveLength(helper.initialBlogs.length+1)
    
    // beware of the types, using wrong type may result an error
    expect(blogs).toEqual(
      expect.arrayContaining([expect.objectContaining(newBlog)])
    )
    expect(blog).toMatchObject(newBlog)
  })

  test('should return status 400 when form is missing title', async () => {
    const blogNoTitle = {
      "author": "Lakin, Oberbrunner and Harvey",
      "url": "https://cayla.com",
      "likes": 452
    }
    const response = await api.post('/api/blogs').send(blogNoTitle)

    expect(response.statusCode).toEqual(400)
  })

  test('should return status 400 when form is missing url', async () => {
    const blogNoUrl = {
      "title": "Frozen Operations e-services actuating",
      "author": "Lakin, Oberbrunner and Harvey",
      "likes": 452
    }
    const response = await api.post('/api/blogs').send(blogNoUrl)

    expect(response.statusCode).toEqual(400)
  })
})

describe('deletion of a blog', () => {
  test('should return 204 when the blog is successfully deleted', async () => {
    const blogBefore = await helper.blogsInDb()
    const blogToDelete = blogBefore[0]
    await api.delete('/api/blogs/'+blogToDelete.id).expect(204)

    const blogAfter = await helper.blogsInDb()
    
    expect(blogAfter).toHaveLength(blogBefore.length-1)

    expect(blogAfter).not.toEqual(
      expect.arrayContaining([expect.objectContaining(blogToDelete)])
    )
  })
})

describe('modification of a blog', () => {
  test('should return 200 when blog is successfully modified', async () => {
    const blogBefore = await helper.blogsInDb()
    const blogToUpdate = {...blogBefore[0]} // sprading the object to avoid the original ones from being overridden
    blogToUpdate.likes = 300
    
    const response = await api.put('/api/blogs/'+blogToUpdate.id).send(blogToUpdate)
    expect(response.statusCode).toEqual(200)
    
    const blogAfter = await helper.blogsInDb()
    
    expect(blogAfter).toEqual(
      expect.arrayContaining([expect.objectContaining(blogToUpdate)])
    )
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})