const App = () => {
  const course = "Half Stack application development"
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10
  }
  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  }
  const part3 = {
    name: "State of a component",
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part={[part1.name, part2.name, part3.name]}
        exercises={[part1.exercises, part2.exercises, part3.exercises]} />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0]} exercises={props.exercises[0]} />
      <Part part={props.part[1]} exercises={props.exercises[1]} />
      <Part part={props.part[2]} exercises={props.exercises[2]} />
    </div>
  )
}

const Part = (props) => (
  <p>{props.part} {props.exercises}</p>
)

const Total = (props) => (
  <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
)

export default App;
