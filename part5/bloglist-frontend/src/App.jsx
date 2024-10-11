import { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
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
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

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
      setMessage({type: 'error', value: 'Wrong credentials'})
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

  const handleNewBlogChange = (state, action) => {
    switch (action.type) {
      case 'changed_title':
        setNewBlog({
          ...state,
          title: action.value
        });
        break;
      case 'changed_author':
        setNewBlog({
          ...state,
          author: action.value
        });
        break;
      case 'changed_url':
        setNewBlog({
          ...state,
          url: action.value
        });
        break;
      case 'changed_likes':
        setNewBlog({
          ...state,
          likes: action.value
        });
        break;
      default:
        break;
    }
  }
  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsLoading(true)
      const response = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setIsLoading(false)
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
      setMessage({type: 'success', value: `a new blog ${response.title} by ${response.author} added`})
    } catch (error) {
      console.log(error)
      setMessage({type: 'error', value: error.response.data.error || error.message})
    }
  }

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

        {message &&
          <Notification type={message.type} timeout={5} hook={setMessage} message={message.value} />
        }

        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>

      {message &&
        <Notification type={message.type} timeout={5} hook={setMessage} message={message.value} />
      }
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <p>{user.name} logged in</p>
        <button style={{margin: 'auto 1em', height: '2em'}} onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleSubmit={handleBlogSubmit} handleNewBlogChange={handleNewBlogChange} newBlog={newBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App