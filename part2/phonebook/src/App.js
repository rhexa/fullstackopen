import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import { getPersons, addPerson, deletePerson, updatePerson } from './data/Person';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  
  const personsToShow = persons.filter(p => p.name?.toLowerCase().includes(filterName))
  
  const mGetPersons = async () => {
    const res = await getPersons()
    setPersons(res.data)
  }

  const mDeletePerson = async (person) => {
    const { name, id } = person
    if (!window.confirm(`Delete ${name}?`)) return
    const res = await deletePerson(id)
    if (res.status.toString() === '200') mGetPersons()
  }

  const mAddPerson = async (person) => {
    const res = await addPerson(person)
    if (res.status.toString() === '201') mGetPersons()
  }

  const mUpdatePerson = async (person) => {
    person.id = persons.find(p => p.name === person.name).id
    const confirm = `${newName} is already added to phonebook,` +
      `replace the old number with a new one?`
    if (!window.confirm(confirm)) return
    const res = await updatePerson(person)
    if (res.status.toString() === '200') mGetPersons()
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (!newName || !newNumber) return alert("Please fill all the fields")

    const person = { name: newName, number: newNumber }

    if (persons.find(p => p.name === newName)) return mUpdatePerson(person)

    mAddPerson(person)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonDeleteButton = async (person) => {
    mDeletePerson(person)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  useEffect(() => {
    setNewName('')
    setNewNumber('')
    setFilterName('')
  }, [persons])

  useEffect(() => {mGetPersons()}, [])


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
      <Persons persons={personsToShow} onClick={handlePersonDeleteButton} />
    </div>
  )
}

export default App