import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    return filter ? sortedAnecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())) : sortedAnecdotes
  })

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(vote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList