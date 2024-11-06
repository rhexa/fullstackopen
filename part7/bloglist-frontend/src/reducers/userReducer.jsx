import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setErrorNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    _setUser: (state, action) => {
      return action.payload
    },
    _logout: () => {
      return initialState
    },
  },
})

export const { _setUser, _logout } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(_setUser(user))
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    } catch (error) {
      dispatch(setErrorNotification(error.response.data.error || error.message))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(_logout())
  }
}

export default userSlice.reducer
