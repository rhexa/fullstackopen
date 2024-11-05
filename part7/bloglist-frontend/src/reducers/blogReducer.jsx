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
    setBlogs(state, action) {
      return action.payload
    },

    addBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, addBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const Blogs = await blogService.getAll()
    dispatch(setBlogs(Blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(addBlog(newBlog))
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

export default blogSlice.reducer
