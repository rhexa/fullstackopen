import { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import {
  _logout,
  _setUser,
  loginUser,
  logoutUser,
} from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sort, setSort] = useState('none')
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

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

    dispatch(loginUser(username, password))

    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(logoutUser())
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
      dispatch(_setUser(user))
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
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
