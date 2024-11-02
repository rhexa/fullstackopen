import { useSelector, useDispatch } from 'react-redux'
import { setAnecdote, vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import { useEffect } from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    return filter ? sortedAnecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())) : sortedAnecdotes
  })

  const handleVote = ({ id, content }) => {
    console.log('vote', id)
    dispatch(vote(id))
    dispatch(setNotification(`you voted '${content}'`))
  }

  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdotes => dispatch(setAnecdote(anecdotes)))
  }, [])
  
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