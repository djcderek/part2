const Display = (props) => {

    const deletePerson = (id) => {
        props.deletePerson(id)
    }

    return (
        <div>{props.filteredPersons.map(person => {
            return (
                <div key={person.name}>{person.name} {person.number}
                <button onClick={() => deletePerson(person.id)}>Delete</button>
                </div>
            )
        })}</div>
    ) 
}

export default Display