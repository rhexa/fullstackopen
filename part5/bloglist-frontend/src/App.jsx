import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      setIsLoading(true)
      const response = await blogService.create(newBlog)
      setIsLoading(false)
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
    } catch (error) {
      console.log(error)
    }
  }

  const blogForm = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )

  useEffect(() => {
    if (!isLoading) {
      fetchBlogs()
    }
  }, [isLoading])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        {errorMessage &&
          <Notification type="error" timeout={5} hook={setErrorMessage} message={errorMessage} />
        }

        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>

      {errorMessage &&
        <Notification type="error" timeout={5} hook={setErrorMessage} message={errorMessage} />
      }
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <p>{user.name} logged in</p>
        <button style={{margin: 'auto 1em', height: '2em'}} onClick={handleLogout}>logout</button>
      </div>

      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App