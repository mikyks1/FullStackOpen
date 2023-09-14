import Part from "./Part"

const Content = ({ Parts }) => {
    console.log(Parts)
    const exercises = Parts.map(part => part.exercises)
    return (
        <div>
            {Parts.map(part =>
                <Part key={part.id} Name={part.name} Exercises={part.exercises} />
            )}
            <p>
                Number of exercises {exercises.reduce((acc, current) => acc + current, 0)}
            </p>
        </div>
    )
}

export default Content