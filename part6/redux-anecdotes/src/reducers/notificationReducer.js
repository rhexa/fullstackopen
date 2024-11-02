import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationText: (state, action) => action.payload,
    clearNotification: () => initialState
  }
})

export const { setNotificationText, clearNotification } = notificationSlice.actions

export const setNotification = (text, time = 5) => {
  return async dispatch => {
    dispatch(setNotificationText(text))
    setTimeout(() => dispatch(clearNotification()), time * 1000)
  }
}

export default notificationSlice.reducer
