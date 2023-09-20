import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: "044 24545625"
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")

  const handleNamechange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberchange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNamechange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberchange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name} | {person.number}</div>)}
      </div>
    </div>
  )

}

export default App