import Header from "./Header"
import Content from "./Content"

const Courses = ({ Courses }) => {
    return (
        <>
            {Courses.map(course => (
                <div key={course.id}>
                    <Header Header={course.name}></Header>
                    <Content Parts={course.parts}></Content>
                </div>
            ))}
        </>
    )
}

export default Courses