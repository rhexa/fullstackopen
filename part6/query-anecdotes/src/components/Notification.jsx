import { useEffect, useRef } from 'react'
import { useNotificationValue, useNotificationDispatch } from '../contexts/notificationContext'

const Notification = () => {
  const timerRef = useRef(null)
  const notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [notification, notificationDispatch])
  
  if (notification){
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification
