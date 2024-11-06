import { useDispatch } from 'react-redux'
import useInput from '../hooks/useInput'
import { addComment } from '../reducers/blogReducer'

const Comments = ({ data }) => {
  const { reset: resetComment, ...comment } = useInput('text')
  const dispatch = useDispatch()

  const { comments, ...blog } = data

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment.value))
    resetComment()
  }

  return (
    <>
      <h3>Comments</h3>

      <div>
        <form onSubmit={handleAddComment}>
          <input {...comment} />
          <button type="submit">add comment</button>
        </form>
      </div>

      {comments.length === 0 ? (
        <p>No comment found</p>
      ) : (
        <ul>
          {comments.map((c) => (
            <li key={Math.random()}>{c}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Comments
