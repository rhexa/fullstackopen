import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    _setUsers(state, action) {
      return action.payload
    },
  },
})

export const { _setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(_setUsers(users))
  }
}

export default usersSlice.reducer
