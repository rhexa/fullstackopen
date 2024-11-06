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
import { Routes, Route, useMatch } from 'react-router-dom'
import Navigation from './components/Navigation'
import Users from './routes/Users'
import User from './routes/User'
import BlogList from './components/BlogList'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const blogs = useSelector(({ blogs }) => blogs)

  const users = useSelector((state) => state.users)

  const userMatch = useMatch('/users/:id')
  const userBlogs = userMatch
    ? users.filter((user) => user.id === userMatch.params.id)[0]
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.filter((blog) => blog.id === blogMatch.params.id)[0]
    : null

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

  const Home = () => (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <BlogList blogs={blogs} />
    </div>
  )

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
      <Navigation />

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <p>{user.name} logged in</p>
        <button
          style={{ margin: 'auto 1em', height: '2em' }}
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User userBlogs={userBlogs} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
