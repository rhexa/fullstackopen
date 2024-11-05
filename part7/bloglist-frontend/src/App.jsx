import { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [sort, setSort] = useState('none')
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => {
    switch (sort) {
      case 'likes':
        return [...blogs].sort((a, b) => b.likes - a.likes)
      default:
        return blogs
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorNotification('Wrong credentials'))
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

  const handleLike = async (event, blog) => {
    event.preventDefault()
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }

    try {
      const response = await blogService.update(likedBlog.id, likedBlog)
    } catch (error) {
      console.log(error)
      dispatch(setErrorNotification(error.response.data.error || error.message))
    }
  }

  const handleBlogRemove = async (event, blog) => {
    event.preventDefault()
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (!confirm) return

    try {
      const response = await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    } catch (error) {
      console.log(error)
      dispatch(setErrorNotification(error.response.data.error || error.message))
    }
  }

  const handleSortChange = (event) => {
    setSort(event.target.value)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

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
        <Notification />
        {loginForm()}
      </div>
    )
  }

  // When user is logged in, render this component (User dashboard)
  return (
    <div>
      <h1>blogs</h1>

      <Notification />

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <p>{user.name} logged in</p>
        <button
          style={{ margin: 'auto 1em', height: '2em' }}
          onClick={handleLogout}
        >
          logout
        </button>
      </div>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <div>
        <label htmlFor="sort-blogs">sort by:</label>
        <select name="sort-blogs" onChange={handleSortChange}>
          <option value="default">default</option>
          <option value="likes">likes</option>
        </select>
      </div>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleBlogRemove={handleBlogRemove}
        />
      ))}
    </div>
  )
}

export default App
