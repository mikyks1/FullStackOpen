const Notification = ({ notification, error }) => {
    if (notification === null) {
        return null
    }

    const color = error ? "red" : "blue"

    const style = {
        color: color,
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
        width: "max-content",
    }

    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification