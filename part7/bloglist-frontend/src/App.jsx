import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { _logout, _setUser, loginUser } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import Navigation from './components/Navigation'
import Users from './routes/Users'
import User from './routes/User'
import Blogs from './routes/Blogs'
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from '@mui/material'
import Login from './routes/Login'

const App = () => {
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
    return <Login />
  }

  // When user is logged in, render this component (User dashboard)
  return (
    <Container>
      <Navigation />
      <h1>Blogs</h1>

      <Notification />

      <Routes>
        <Route exact path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User userBlogs={userBlogs} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  )
}

export default App
