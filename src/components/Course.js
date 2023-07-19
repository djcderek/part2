import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
    const course = props.course.parts
    return (
        <div>
            <Header name={props.course.name} />
            <Content course={course} />
            <Total course={course}/>
        </div>
    )
}

export default Course