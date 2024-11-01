import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const handleAddAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(addAnecdote(content))
    dispatch(setNotification(`you added a new anecdote '${content}'`))
    event.target.anecdote.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm