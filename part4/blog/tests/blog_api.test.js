const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const _ = require('lodash')

const initialBlog = [
  {
    "title": "withdrawal Human didactic mission-critical synthesize",
    "author": "Veum, Reichel and Batz",
    "url": "http://valentine.info",
    "likes": 942,
  },
  {
    "title": "Product Kids Myanmar RAM Computer",
    "author": "Conn, Kovacek and Berge",
    "url": "http://chanel.net",
    "likes": 526,
  },
  {
    "title": "Sports Franc Advanced intuitive",
    "author": "Legros - Gerlach",
    "url": "http://delpha.com",
    "likes": 595,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of initialBlog) {
    await new Blog(blog).save();
  }
})

describe('blog service get', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are returned in the correct amount', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlog.length)
  })

  test('blog has property named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    
    for (const blog of blogs) {
      expect(blog).toHaveProperty('id')
    }
  })

  test('blog should contain property likes', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    
    for (const blog of blogs) {
      expect(blog).toHaveProperty('likes')
    }
  })
})

describe('blog service post', () => {
  const newBlog = {
    "title": "Frozen Operations e-services actuating",
    "author": "Lakin, Oberbrunner and Harvey",
    "url": "https://cayla.com",
    "likes": 452
  }
  
  test('should be able to add a new blog', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const blog = _.find(blogs, newBlog)

    expect(blogs).toHaveLength(initialBlog.length+1)
    
    // beware of the types, using wrong type may result an error
    expect(blogs).toEqual(
      expect.arrayContaining([expect.objectContaining(newBlog)])
    )
    expect(blog).toMatchObject(newBlog)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})