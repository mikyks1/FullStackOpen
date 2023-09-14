import Part from "./Part"

const Content = ({ Parts }) => {
    return (
        <div>
            {Parts.map(part =>
                <Part key={part.id} Name={part.name} Exercises={part.exercises} />
            )}
        </div>
    )
}

export default Content