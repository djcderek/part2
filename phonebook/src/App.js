import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNumber = (personObject) => {
    personObject.number = newNumber
    console.log(personObject)
    console.log('number added')
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

    setPersons(persons.concat(personObject))
    
    console.log(persons)
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const doesContain = (persons, person) => {
    return persons.some(a => a.name === person)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>
    </div>
  )
}

export default App