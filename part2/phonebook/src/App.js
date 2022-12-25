import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import { getPersons } from './data/Person';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  
  const personsToShow = persons.filter( p => p.name.toLowerCase().includes(filterName))

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    if (!newName || !newNumber) return alert("Please gill in all the fields")

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
  
  useEffect(() => {
    getPersons()
      .then(res => setPersons(res.data))
  }, [])
  

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