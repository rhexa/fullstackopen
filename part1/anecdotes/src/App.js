import { useState,useEffect } from 'react'

const Heading = ({value}) => {
  return (
    <h2>
      {value}
    </h2>
  )
}

const Anecdote = ({text, votes}) => {
  return (
    <>
      <div>
        {text}
      </div>
      <div>
        has {votes} votes
      </div>
    </>
  )
}

const Buttons = ({handlerVote, handlerNextAnecdote}) => {
  return (
    <div>
      <button onClick={handlerVote}>vote</button>
      <button onClick={handlerNextAnecdote}>next anecdote</button>
    </div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState()

  const calculate = () => {
    const count = Math.max(...votes)
    const index = votes.indexOf(count)
    setMostVotes(index)
  }

  const handlerNextAnecdote = () => {
    let random = 0
    while (random === selected) {
      random = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(random)
  }

  const handlerVote = () => {
    const update = [...votes]
    update[selected] += 1
    setVotes(update)
  }

  useEffect(() => {
    calculate()
  }, [votes])
  
  return (
    <div>
      <Heading value={"Anecdote of the day"} />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Buttons handlerVote={handlerVote} handlerNextAnecdote={handlerNextAnecdote} />
      <Heading value={"Anecdote with most votes"} />
      <Anecdote text={anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  )
}

export default App