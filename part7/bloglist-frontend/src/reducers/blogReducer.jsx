import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import {
  setErrorNotification,
  setSuccessNotification,
} from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    _setBlogs(state, action) {
      return action.payload
    },

    _addBlog(state, action) {
      state.push(action.payload)
    },
    _likeBlog(state, action) {
      const id = action.payload
      const blog = state.find((b) => b.id === id)
      blog.likes++
    },
    _removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { _setBlogs, _addBlog, _likeBlog, _removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const Blogs = await blogService.getAll()
    dispatch(_setBlogs(Blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      const { name, username } = JSON.parse(
        window.localStorage.getItem('loggedBlogappUser')
      )
      const user = {
        id: newBlog.user,
        name,
        username,
      }
      newBlog.user = user
      dispatch(_addBlog(newBlog))
      dispatch(
        setSuccessNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        )
      )
    } catch (error) {
      dispatch(setErrorNotification(error.response.data.error || error.message))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      await blogService.update(likedBlog.id, likedBlog)
      dispatch(_likeBlog(blog.id))
      dispatch(setSuccessNotification(`${blog.title} liked`))
    } catch (error) {
      dispatch(setErrorNotification(error.response.data.error || error.message))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(_removeBlog(blog.id))
      dispatch(setSuccessNotification(`${blog.title} removed`))
    } catch (error) {
      dispatch(setErrorNotification(error.response.data.error || error.message))
    }
  }
}

export default blogSlice.reducer
