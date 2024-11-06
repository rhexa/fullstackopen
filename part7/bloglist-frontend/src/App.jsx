import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
import Blogs from './routes/Blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      <Navigation />
      <h1>blogs</h1>

      <Notification />

      <Routes>
        <Route exact path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User userBlogs={userBlogs} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
