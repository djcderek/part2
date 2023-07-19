import Part from './Part'

const Content = (props) => {
    const course = props.course
    //console.log(course)
    return (
        <div>
            {course.map(a => {
                return (
                    <Part key={a.id} name={a.name} exercises={a.exercises}/>
                )    
            })}
        </div>
    )
}

export default Content