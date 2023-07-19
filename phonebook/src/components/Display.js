const Display = (props) => {
    return (
        <div>{props.filteredPersons.map(person => {
            return <div key={person.name}>{person.name} {person.number}</div>
        })}</div>
    ) 
}

export default Display