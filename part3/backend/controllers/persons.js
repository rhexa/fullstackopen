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
    const person = await Person.find({_id: id})
    return person
  } catch (error) {
    throw error
  }
}

const add = async (person) => {
  const newPerson = new Person(person)
  const {name, number} = person

  try {
    await newPerson.save()
    console.log(`added ${name} number ${number} to phonebook`)
    console.log(newPerson)
    return person
  } catch (error) {
    console.error(error.message)
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
  del,
  count
}