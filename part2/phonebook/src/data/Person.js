import axios from 'axios'
const url = 'http://localhost:3001/persons'

export const getPersons = async () => axios.get(url)

export const addPerson = async () => axios.post(url)