import axios from 'axios'
const url = '/api/persons'

export const getPersons = async () => axios.get(url)

export const addPerson = async (person) => axios.post(url,person)

export const updatePerson = async (person) => axios.put(`${url}/${person.id}`,person)

export const deletePerson = async (id) => axios.delete(`${url}/${id}`)