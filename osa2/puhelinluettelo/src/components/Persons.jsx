import Person from "./Person"

const Persons = (props) => {
    const { persons, filter } = props
    const filteredPersons = filter
        ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        : persons

    return (
        <div>
            {filteredPersons.map(person => <Person key={person.name} person={person}></Person>)}
        </div>
    )

}

export default Persons