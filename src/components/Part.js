const Part = (props) => {
    console.log('entered')    
    return (
        <div>{props.name} {props.exercises}</div>
    )
}

export default Part