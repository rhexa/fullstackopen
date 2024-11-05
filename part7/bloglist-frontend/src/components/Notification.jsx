import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!notification) return
    console.log('notification: ', notification)
    const timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [notification])

  if (!notification) return null

  const classes = `notification ${notification.type}`

  return <div className={classes}>{notification.message}</div>
}

export default Notification
