import React from 'react'

const Part = ({parts: {name, exercises}}) => {
  return (
    <p>
      {name} {exercises || 0}
    </p>
  )
}

const Content = ({parts}) => {
  const list = parts.map( i =>
    <Part key={i.id} parts={i} />
  )
  return (
    <>
      {list}
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce( (sum, i) => {
    return sum + parseInt(i.exercises || 0)
  }, 0)
  return (
    <b>Total of {total} exercises</b>
  )
}

const Course = ({course:{id,name,parts}}) => {
  return (
    <div>
      <h2>{name}</h2>
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const Courses = ({courses}) => {
  const course = courses.map( course => <Course key={course.id} course={course} /> )
  return (
    <div>
      {course}
    </div>
  )
}

export default Courses