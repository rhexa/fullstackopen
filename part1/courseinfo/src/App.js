import React from 'react'

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({data: {name, exercises}}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({parts}) => {
  const list = parts.map( i =>
    <Part data={i} />
  )
  return (
    <>
      {list}
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce( (sum, i) => {
    return sum + parseInt(i.exercises)
  }, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App