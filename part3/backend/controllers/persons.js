const Person = require('../models/persons');

const getAll = async () => {
  try {
    const persons = await Person.find({})
    return persons
  } catch (error) {
    throw error
  }
}

const get = async (id) => {
  try {
    const person = await Person.findById(id)
    return person
  } catch (error) {
    throw error
  }
}

const add = async (person) => {
  const newPerson = new Person(person)

  try {
    await newPerson.save()
    return person
  } catch (error) {
    throw error
  }
}

const update = async (id, person) => {
  try {
    const newPerson = await Person.findByIdAndUpdate(id, person, { new: true })
    return newPerson
  } catch (error) {
    throw error
  }
}

const del = async (id) => {
  try {
    const person = await Person.findByIdAndDelete(id)
    return person
  } catch (error) {
    throw error
  }
}

const count = async () => {
  return await Person.countDocuments({})
}

module.exports = {
  getAll,
  get,
  add,
  update,
  del,
  count
}