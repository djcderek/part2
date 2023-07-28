import { useState } from 'react'
import { useEffect} from 'react'

import Filter from './components/Filter'
import Form from './components/Form'
import Display from './components/Display'
import Notification from './components/Notification'
import Error from './components/Error'

import axios from 'axios'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [addedNewPerson, setAddedNewPerson] = useState(null)
  const [error, setError] = useState(null)

  const hook = () => {
    personsService
      .getAll()
      .then(
        response => {
          console.log(response.data)
          setPersons(response.data)
          setFilteredPersons(response.data)
        }
    )
  }

  useEffect(hook, [])

  const addNumber = (personObject) => {
    personObject.number = newNumber
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    if (doesContain(persons, newName)) {
      if (!persons.some(a => a.number === newNumber)) {
        if (window.confirm(`${newName} is already added. Would you like to change the phone number?`)) {
          const tempPerson = persons.find(person => person.name === newName)
          addNumber(tempPerson)
          axios
            .put(`http://localhost:3001/persons/${tempPerson.id}`, tempPerson)
            .then(response => {
              setPersons(persons.map(person => person.name === newName ? response.data : person))
              setFilteredPersons(persons.map(person => person.name === newName ? response.data : person))
            })
            .catch(error => {
              setError(`Information of ${newName} has already been removed from server`)
              setTimeout(() => setError(null), 1500)
            })
          setAddedNewPerson(`Changed ${newName}'s number`)
          setTimeout(() => setAddedNewPerson(null), 1500)
        }
        return
      } else {
        //alert(`${newName} is already added to the phonebook`)
        setError(`${newName} is already added to the phonebook`)
        setTimeout(() => setError(null), 1500)
        return
      }
    }

    addNumber(personObject)

    personsService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setFilteredPersons(persons.concat(response.data))
      })

    setAddedNewPerson(`Added ${newName}`)
    setTimeout(() => setAddedNewPerson(null), 1500)
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

  const deletePerson = (id) => {
    personsService.deletePerson(id).then(response => {
      personsService.getAll().then(response => {
        console.log(response.data)
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
    })
    .catch(error => {
      console.log('error caught')
      const deletedPerson = persons.filter(person => person.id === id)
      setError(`Information of ${deletedPerson.name} has already been removed from server`)
      setTimeout(() => setError(null), 1500)
    })

    // axios
    //   .delete(`http://localhost:3001/persons/${id}`)
    //   .then(response => {
    //     personsService.getAll().then(response => {
    //       console.log(response.data)
    //       setPersons(response.data)
    //       setFilteredPersons(response.data)
    //     })
    //   })
    //   .catch(error => {
    //     console.log('error caught')
    //     const deletedPerson = persons.filter(person => person.id === id)
    //     setError(`Information of ${deletedPerson.name} has already been removed from server`)
    //     setTimeout(() => setError(null), 1500)
    //   })

      personsService
        .getAll()
        .then(response => {
          setFilteredPersons(response.data)
          setPersons(response.data)
        })
        
      // axios.get('http://localhost:3001/persons')
      // .then(response => {
      //   setFilteredPersons(response.data)
      //   setPersons(response.data)
      // })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedNewPerson}/>
      <Error message={error}/>
      <Filter newFilter={newFilter} search={search}/>
      <h2>add a new</h2>
      <Form addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Display filteredPersons = {filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App