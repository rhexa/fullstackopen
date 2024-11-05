const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setSuccessNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      type: 'success',
      message: message,
    },
  }
}

export const setErrorNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      type: 'error',
      message: message,
    },
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
