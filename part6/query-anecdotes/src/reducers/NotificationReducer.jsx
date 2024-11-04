import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const useNotificationReducer = () => {
  const [state, dispatch] = useReducer(notificationReducer, '')

  return [state, dispatch]
}

export default useNotificationReducer