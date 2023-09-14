import Part from "./Part"

const Content = ({ Parts }) => {
    const exercises = Parts.map(part => part.exercises)
    return (
        <div>
            {Parts.map(part =>
                <Part key={part.id} Name={part.name} Exercises={part.exercises} />
            )}
            <b>
                Number of exercises {exercises.reduce((acc, current) => acc + current, 0)}
            </b>
        </div>
    )
}

export default Content