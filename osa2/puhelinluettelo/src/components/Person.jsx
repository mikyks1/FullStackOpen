const Person = (props) => {
    const { person, remove } = props
    return (
        <div>
            {person.name} | {person.number}
            <button onClick={() => remove(person.id, person.name)}>delete</button>
        </div>
    )
}

export default Person