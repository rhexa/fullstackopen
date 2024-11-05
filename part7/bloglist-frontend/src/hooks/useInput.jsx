import { useState } from 'react'

const useInput = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return {
    value,
    type,
    onChange,
    reset,
  }
}

export default useInput
