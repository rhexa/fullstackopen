const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
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

const initialUser = { 
  username: 'root', 
  name: 'whatever', 
  password: "sekret"
}
const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const beforeEach = async (api) => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash(initialUser.password, 10)
  const userToAdd = { ...initialUser, passwordHash}
  delete userToAdd.password

  const user = new User(userToAdd)
  await user.save()

  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    await api.post('/api/blogs').send(blog)
  }
}

module.exports = {
  initialBlogs,
  initialUser,
  nonExistingId,
  blogsInDb,
  usersInDb,
  beforeEach
}