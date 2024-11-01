import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => initialState
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
