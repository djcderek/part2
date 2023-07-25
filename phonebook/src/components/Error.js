const Error = ({message}) => {
    const errorStyle = {
      color: 'red',
      fontSize: 20,
      backgroundColor: 'lightgrey',
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    if (message === null) {
      return null
    }
  
    return (
      <div className='notification' style={errorStyle}>
        {message}
      </div>
    )
}

export default Error