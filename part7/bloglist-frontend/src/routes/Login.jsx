import {
  FormControl,
  Input,
  InputLabel,
  Button,
  Container,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import Notification from '../components/Notification'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username, password))

    setUsername('')
    setPassword('')
  }

  return (
    <Container maxWidth="sm">
      <h2>Log in to use the application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <FormControl fullWidth>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </FormControl>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, display: 'flex', justifySelf: 'flex-end' }}
        >
          Login
        </Button>
      </form>
    </Container>
  )
}

export default Login
