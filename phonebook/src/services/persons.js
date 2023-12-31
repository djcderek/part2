import axios from 'axios'
//const baseUrl = 'http://localhost:3001/persons/'
const baseUrl = 'api/persons/'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (personObject) => {
    return axios.post(baseUrl, personObject)
}

const deletePerson = (id) => {
    return axios.delete(baseUrl + id)
}

const updatePerson = (id, person) => {
    return axios.put(baseUrl + id, person)
}

export default {
    getAll,
    create,
    deletePerson,
    updatePerson
}