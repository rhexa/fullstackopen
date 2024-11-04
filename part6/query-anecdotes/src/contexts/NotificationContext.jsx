import { useContext } from 'react'
import AnecdoteContext from '../Context'

export const useNotificationValue = () => {
  const { useNotificationReducer } = useContext(AnecdoteContext)

  return useNotificationReducer[0]
}

export const useNotificationDispatch = () => {
  const { useNotificationReducer } = useContext(AnecdoteContext)

  return useNotificationReducer[1]
}
