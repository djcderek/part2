import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Display from './components/Display'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', number: '12-43-234345', id: 3},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  ]) 
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addNumber = (personObject) => {
    personObject.number = newNumber
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    if (doesContain(persons, newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    addNumber(personObject)
    const tempPersons = [...persons]
    setPersons(tempPersons.concat(personObject))
    setFilteredPersons(tempPersons.concat(personObject))
  }

  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const doesContain = (persons, person) => {
    return persons.some(a => a.name === person)
  }

  const search = (event) => {
    const currValue = event.target.value
    setNewFilter(currValue)

    const tempPeople = [...persons]
    const filteredPeople = tempPeople.filter(person => {
      return person.name.toLowerCase().includes(currValue.toLowerCase())
    })
    setFilteredPersons(filteredPeople)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} search={search}/>
      <h2>add a new</h2>
      <Form addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Display filteredPersons = {filteredPersons}/>
    </div>
  )
}

export default App