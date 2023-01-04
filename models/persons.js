let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const getAll = () => {
  return persons
}

const get = (id) => {
  return persons.find(p => p.id.toString() === id.toString())
}

const add = (person) => {
  person = { id :persons[persons.length-1].id + 1, ...person }
  persons.push(person)
  return person
}

const del = (id) => {
  const person = get(id)
  persons = persons.filter(p => p.id.toString() !== id.toString())
  return person
}

const count = () => {
  return persons.length
}

const isDuplicate = (person) => {
  person = persons.find(p => p.name.toString() === person.name.toString())
  console.log(person)
  return person ? true : false
}

module.exports = {
  getAll,
  get,
  add,
  del,
  count,
  isDuplicate
}