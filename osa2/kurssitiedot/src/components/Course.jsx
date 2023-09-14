import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
    console.log(course)
    return (
        <>
            <Header Header={course.name}></Header>
            <Content Parts={course.parts}></Content>
            <Total Parts={course.parts}></Total>
        </>
    )
}

export default Course