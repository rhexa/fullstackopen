import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  
  const personsToShow = persons.filter( p => p.name.toLowerCase().includes(filterName))

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const person = { name: newName, number: newNumber, id: persons[persons.length-1].id + 1 }

    !persons.find(p => p.name === newName || p.number === newNumber) ?
      setPersons(persons.concat(person)) :
      alert(`cannot add duplicate name or number to phonebook`)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  useEffect(() => {
    setNewName('')
    setNewNumber('')
    setFilterName('')
  }, [persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filterName} onChange={handleFilterNameChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={handleFormSubmit}
        name={newName}
        onChangeName={handleNameChange}
        number={newNumber}
        onChangeNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App