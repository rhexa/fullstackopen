import React from 'react'

const Persons = ({persons,onClick}) => {
  return (
    <ul style={{padding: 0}}>
        {persons.map(p =>
          <li key={p.id} style={{listStyleType:'none'}}>
            {p.name} {p.number} <button onClick={()=>onClick(p)}>delete</button>
          </li>
        )}
    </ul>
  )
}

export default Persons