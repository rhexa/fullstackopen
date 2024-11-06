import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeButtonStyle = {
    backgroundColor: '#4567b7',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    padding: 10,
    cursor: 'pointer',
  }

  const handleLike = async (event, blog) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleBlogRemove = async (event, blog) => {
    event.preventDefault()
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (!confirm) return

    dispatch(removeBlog(blog))
    navigate('/')
  }

  if (!blog) return null

  return (
    <div style={blogStyle}>
      <div>
        <h2 className="blog-title">{blog.title}</h2>
        <h3 className="blog-author">By: {blog.author}</h3>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}
        <button onClick={(e) => handleLike(e, blog)}>like</button>
      </div>
      <div>added by {blog.user.username}</div>
      {blog.user.username ===
        JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
          .username && (
        <div>
          <button
            style={removeButtonStyle}
            onClick={(e) => handleBlogRemove(e, blog)}
          >
            remove
          </button>
        </div>
      )}

      <Comments data={blog} />
    </div>
  )
}

export default Blog
