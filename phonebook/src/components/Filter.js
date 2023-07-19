const Filter = (props) => {
    return (
        <div>filter shown with <input value={props.newFilter} onChange={props.search}></input></div>
    )
}

export default Filter