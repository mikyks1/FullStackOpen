import Header from "./Header"
import Content from "./Content"

const Course = ({ course }) => {
    console.log(course)
    return (
        <>
            <Header Header={course.name}></Header>
            <Content Parts={course.parts}></Content>
        </>
    )
}

export default Course