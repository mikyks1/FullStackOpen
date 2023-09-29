import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import axios from "axios"
import personService from "./services/persons"


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setNewFilter] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(personsServer => setPersons(personsServer))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPersonObject = {
      name: newName,
      number: newNumber
    }
    const currentPersonObject = persons.find(person => person.name === newName)

    if (currentPersonObject) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = currentPersonObject.id
        personService
          .update(id, newPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
      }
    }
    else {
      personService
        .add(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChange={handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <AddPerson onSubmit={addPerson} name={newName} nameChange={handleNameChange}
        number={newNumber} numberChange={handleNumberChange}></AddPerson>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} remove={removePerson}></Persons>
    </div>
  )

}

export default App