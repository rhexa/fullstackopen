import { createContext } from 'react'
import useNotificationReducer from './reducers/NotificationReducer'

const AnecdoteContext = createContext()

export const ContextProvider = (props) => {
  return (
    <AnecdoteContext.Provider value={{ useNotificationReducer: useNotificationReducer() }}>
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext