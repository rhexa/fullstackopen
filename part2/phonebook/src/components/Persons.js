import React from 'react'

const Persons = ({persons}) => {
  return (
    <ul>
        {persons.map(p => <li key={p.id}>{p.name} {p.number}</li>)}
    </ul>
  )
}

export default Persons