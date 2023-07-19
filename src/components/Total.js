const Total = (props) => {
    const course = props.course
    console.log('from total', course)
    return (
        <h4>total of {course.reduce((a, b) => a + b.exercises, 0)} exercises</h4>
    )
}

export default Total