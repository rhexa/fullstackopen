import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Blogs</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p>{user.name} logged in</p>
          <button
            style={{ margin: 'auto 1em', height: '2em' }}
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navigation
